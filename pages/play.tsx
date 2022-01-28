import { useEffect, useState, useCallback } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';
import toast from 'react-hot-toast';
import Header from '../components/Header';
import Guess from '../components/Guess';
import GuessInput from '../components/GuessInput';
import Keyboard from '../components/Keyboard';
import useLocalStorage from '../lib/useLocalstorage';
import { exists } from '../lib/words';

import { Match, Room, Player, Language } from '../types';
import InviteLink from '../components/InviteLink';

const Play: NextPage = () => {
  const { push } = useRouter()
  const [player, setPlayer] = useLocalStorage<Player | null>('player', null);
  const [room] = useLocalStorage<Room | null>('room', null);
  const [match, setMatch] = useState<Match | null>(null);
  const [guesses, setGuesses] = useLocalStorage<string[]>('guesses', []);
  const [guess, setGuess] = useState("")

  const saveResult = useCallback(() => {
    axios.post("/api/result/create", {
      matchId: match?.id,
      guesses,
      playerId: player?.id
    }).then(() => {
      setTimeout(() => {
        setGuesses([])
        push(`/stats`)
      }, 3000)
    }).catch(() => {
      toast.error("Error saving result")
    })
  }, [match, player, guesses, push, setGuesses]);

  useEffect(() => {
    if (room && player && !match) {
      try {
        axios.get(`/api/match?roomId=${room.id}&playerId=${player.id}`).then(res => {
          setMatch(res.data)
        })
      } catch (e) {
        toast.error("Error fetching match")
      }
    } else if (!room) {
      toast("Choose or create a room")
      push("/name");
    }
  }, [room, player, match, setMatch, push])

  useEffect(() => {
    if (!match || !player) {
      return
    }
    const answer = match?.word;
    const isLoss = guesses.length === 6 && guesses[5] !== answer;
    const isWin = guesses.some(guess => guess.toLowerCase() === answer)
    if (isWin) {
      toast.success("You got it! 🎉")
    }
    if (isLoss) {
      toast(`Better luck next time. The word was ${answer}`)
    }
    if ((isWin || isLoss)) {
      // Send result to server
      saveResult()
    }
  }, [player, match, guesses, push, saveResult])



  return (
    <>
      <Header />
      <InviteLink inviterName={player?.name || "Someone"} roomId={room?.id || ''} btnText="Invite opponent" />
      {match?.word && (
        <div className='flex-1'>
          {match && guesses.map((guess, index) => {
            return (<Guess key={index} guess={guess} word={match.word} />)
          })}
          {(guesses.length === 6 || (guesses.length && guesses[guesses.length - 1].toLowerCase() === match.word)) ? null : <GuessInput guess={guess} setGuess={setGuess} />}
        </div>
      )}
      <Keyboard word={match?.word || ""} guesses={guesses} onKeyPress={(key) => {
        if (key === "✓") {

          if (guess.length !== 5) {
            toast.error("All 5 letters required to guess")
            return;
          }
          else if (!exists(guess, room?.language || 'EN')) {
            toast.error("Not in word list")
            return;
          }
          else if (guesses.length < 6) {
            setGuesses((prev) => {
              return [...prev, guess]
            })
            setGuess('')
          }


        }
        else if (key === "⌫") {
          setGuess((prev: string) => {
            return prev.slice(0, prev.length - 1);
          })
          return;
        } else if (guess.length < 5) {
          setGuess((prev: string) => {
            return prev + key;
          })
        }
      }} />
    </>
  )
}

export default Play
