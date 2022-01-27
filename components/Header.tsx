import { Button } from '@mui/material';
import { useRouter } from 'next/router';

export default function Header() {
	const { push, pathname, query: { room } } = useRouter()
	const isHome = pathname === '/'
	const roomQuery = room && room.length ? `?room =${room}` : '';

	return (<div className='header flex justify-between align-center'>
		<Button className='pointer'
			onClick={() => {
				push(isHome ? `/rules${roomQuery}` : `/${roomQuery}`)
			}}
			variant="text">{isHome ? '📒 Rules' : '👈   Back'}</Button>
		{isHome ? (
			<div className='flex align-center'>
				<span className='header-title'>W<span className='nut'>⏣</span>RDLE</span>
			</div>
		) : (
			<div className='header-title'>{pathname.slice(1).toUpperCase()}</div>
		)}
		<Button className='pointer'
			onClick={() => {
				push(`/stats${roomQuery}`)
			}}
			variant='text'>score 📜</Button>
	</div>);
}