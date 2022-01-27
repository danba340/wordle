import { useEffect, useState, useCallback } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import axios from "axios"
import { Button, Input } from '@mui/material';
import toast from 'react-hot-toast';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import useLocalStorage from '../lib/useLocalstorage';
import Header from '../components/Header';

import { Player } from "../types"

const Home: NextPage = () => {
  const { push, query: { room } } = useRouter()
  const [player, setPlayer] = useLocalStorage<Player | null>('player', null);

  const saveName = useCallback(async (player) => {
    try {
      const res = await axios.post(`/api/player`, player)
      setPlayer(res.data as Player)
      push(`/${room ? `?room=${room}` : ''}`)
    } catch (e) {
      toast.error("Server error saving name")
    }
  }, [setPlayer, push, room])

  useEffect(() => {
    if (!player) {
      toast("First set a name")
    }
  }, [player])

  return (
    <>
      <Header />
      <div>
        <div className="flex flex-column align-center">
          <Input
            className='text-field'
            placeholder='Choose a name'
            value={player ? player.name : ""}
            onChange={(e) => {
              setPlayer(prev => {
                if (!prev) return ({ name: e.target.value })
                return ({ ...prev, name: e.target.value })
              })
            }}
          />
          <Button
            onClick={() => {
              if (player) {
                saveName(player)
              }
            }}
            className="my05"
            variant='outlined'
          >
            Confirm
          </Button>
        </div>
      </div>
    </>
  )
}

export default Home
