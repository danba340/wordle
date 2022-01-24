import { Button } from '@mui/material';

export default function Header() {
	return (<div className='header flex justify-between'>
		<Button variant="outlined">❔</Button>
		<div className='flex align-center'><span className='wordle'>Wordle</span><span className='swords'>⚔️</span></div>
		<Button variant='outlined'>📊</Button>
	</div>);
}
