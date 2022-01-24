import type { NextPage } from 'next';
import useSWR from 'swr';
import { Button } from "@mui/material";
import Header from '../components/Header';
import Guess from '../components/Guess';
import Board from '../components/Board';
import Keyboard from '../components/Keyboard';


const Home: NextPage = () => {
  const { data, error } = useSWR('/api/match/test')

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <>
      <Header />
      <div className='flex-1'>
        <Guess guess="FAKED" />
        <Board />
      </div>
      <Keyboard />
    </>
  )
}

export default Home
