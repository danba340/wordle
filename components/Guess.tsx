import { useEffect, useState, createRef, useRef } from 'react';
import { Input } from '@mui/material';

const isCorrect = false;
const word = 'FEKAD';

export default function Board({ guess }: { guess: string }) {
	return (<div className='flex-1'>
		<div className="flex">
			{guess.split('').map((letter, index) => {
				console.log(letter)
				return (<div key={index} className={`letter-input flex justify-center align-center ${isCorrect && "bg-green"} ${!isCorrect && word.includes(letter) ? "bg-yellow c-black" : ""}`}>
					<Input readOnly disableUnderline={true} value={letter} sx={{ maxWidth: "3ch", color: "#eee", textTransform: "uppercase" }} inputProps={{ maxLength: 1 }} />
				</div>)
			})}
		</div>
	</div>);
}
