import { useEffect, useState, createRef, useRef, Dispatch, SetStateAction } from 'react';
import { Input } from '@mui/material';

export default function GuessInput({ guess, setGuess }: { guess: string, setGuess: Dispatch<SetStateAction<string>> }) {
	const [cursorIndex, setCursorIndex] = useState<number>(0);
	let refs = useRef([createRef(), createRef(), createRef(), createRef(), createRef()]);

	useEffect(() => {
		if (refs?.current[cursorIndex]?.current) {
			// @ts-ignore
			refs.current[cursorIndex].current.children[0].focus()
		}
	}, [refs, cursorIndex])

	return (<div className='flex-1'>
		<div className="flex">
			{[0, 1, 2, 3, 4].map(index => {
				return (<div key={index} className='letter-input flex justify-center align-center'>
					<Input
						value={guess[index] || ""}
						autoFocus={index === cursorIndex}
						ref={refs.current[index]}
						sx={{ maxHeight: '5ch', maxWidth: "3ch", color: "#eee", textTransform: "uppercase" }}
						inputProps={{ maxLength: 1 }}
						onFocus={(e) => {
							e.target.select()
						}}
						onChange={(e) => {
							setGuess((prev: string) => {
								const copy = prev.split('');
								copy[index] = e.target.value.toUpperCase();
								return copy.join('');
							})
							if (e.target.value.length) {
								setCursorIndex(Math.min(index + 1, 4))
							}
						}}
					/>
				</div>)
			})}
		</div>
	</div>);
}
