import { useEffect, useState, useCallback } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import axios from "axios"
import { Button, Input } from '@mui/material';
import toast from 'react-hot-toast';

import useLocalStorage from '../lib/useLocalstorage';
import Header from '../components/Header';

import { Player, Room, Match } from "../types";
import InviteLink from '../components/InviteLink';

const Home: NextPage = () => {
  const { push, query: { room: roomId } } = useRouter()
  const [, setRoom] = useLocalStorage<Room | null>('room', null);
  const [player, setPlayer] = useLocalStorage<Player | null>('player', null);
  const [rooms, setRooms] = useState<Room[]>([])
  const [unplayed, setUnplayed] = useState<Match[] | null>(null)
  const [roomInvite, setRoomInvite] = useState<Room | null>(null)
  const [newRoomName, setNewRoomName] = useState("");

  const fetchRoom = useCallback(async (roomId) => {
    try {
      const res = await axios.get(`/api/room?roomId=${roomId}`);
      setRoomInvite(res.data)
    } catch (e) {
      toast.error('There was fetching the rooms')
    }
  }, [setRoomInvite])

  const fetchRooms = useCallback(async (playerId) => {
    try {
      const res = await axios.get(`/api/rooms?playerId=${playerId}`);
      setRooms(res.data)
    } catch (e) {
      toast.error('There was fetching the rooms')
    }
  }, [])

  const fetchUnplayed = useCallback(async (playerId, roomIds) => {
    try {
      const res = await axios.get(`/api/match/unplayed?playerId=${playerId}&roomIds=${roomIds.join(",")}`);
      setUnplayed(res.data)
    } catch (e) {
      toast.error('There was fetching the rooms')
    }
  }, [setUnplayed])

  useEffect(() => {
    if (!player) {
      push(`/name${roomId ? `?room=${roomId}` : ''}`)
    } else {
      fetchRooms(player?.id);
      if (roomId) {
        fetchRoom(roomId)
      }
    }
  }, [player, push, roomId, fetchRooms, fetchRoom])

  useEffect(() => {
    if (rooms.length && !unplayed && player?.id) {
      fetchUnplayed(player?.id, rooms.map(r => r.id))
    }
  }, [player, rooms, unplayed, fetchUnplayed])

  const createRoom = useCallback(async (roomName) => {
    try {
      const res = await axios.post(`/api/room/create`, { roomName, playerId: player?.id });
      fetchRooms(player?.id)
      toast.success(`You have created room ${roomName}`)
    } catch (e) {
      toast.error('Server error creating room')
    }
  }, [fetchRooms, player])

  const joinRoom = useCallback(async (roomId) => {
    try {
      const res = await axios.get(`/api/room/join?roomId=${roomId}&playerId=${player?.id}`);
      toast.success(`You have joined room ${res.data.name}`)
      fetchRooms(player?.id)
    } catch (e) {
      toast.error('There was joining the room')
    }
  }, [fetchRooms, player])

  return (
    <>
      <Header />
      <div>
        <div className="flex flex-column align-center">
          {/* From invitation */}
          {(roomId && roomInvite && player) && (
            <Button
              onClick={() => {
                joinRoom(roomId)
              }}
              className="my05"
              variant='outlined'
            >
              Join {roomInvite.name}
            </Button>
          )}
          <h2>Your rooms</h2>
          {!rooms.length ? (<div>No rooms yet</div>) : rooms.map(room => {
            const unplayedInRoom = unplayed ? unplayed.filter(match => match.roomId === room.id).length : []
            return (<div key={room.id}>
              <h3>{room.name}</h3>
              {unplayedInRoom ? (
                <p className='px2 text-center'>📣 You have {unplayedInRoom} unplayed matches in this room</p>
              ) : null}
              <h4>Players</h4>
              <ul>
                {room.players.map(player => {
                  return (
                    <li key={player.id}>{player.name}</li>
                  )
                })}
              </ul>
              <Button
                onClick={() => {
                  if (player?.name) {
                    setRoom(room)
                    push(`/play`)
                  }
                }}
                className="my05"
                variant='outlined'
              >
                Play
              </Button>
              <InviteLink inviterName={player?.name || "Someone"} roomId={room.id} btnText="Invite another player" />
            </div>)
          })}
          <h2>Create room</h2>
          <Input
            className='text-field'
            placeholder='Choose a room name'
            value={newRoomName}
            onChange={(e) => {
              setNewRoomName(e.target.value)
            }}
          />
          <Button
            onClick={() => {
              if (newRoomName.length) {
                createRoom(newRoomName)
              }
            }}
            className="my05"
            variant='outlined'
          >
            Create Room
          </Button>
        </div>
      </div>
    </>
  )
}

export default Home
