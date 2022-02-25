import { useEffect, useState, createRef, useRef } from 'react';
import { Input } from '@mui/material';

export default function Guess({ guess, word }: { guess: string, word: string }) {
	return (<div className='flex-1'>
		<div className="flex">
			{guess.split('').map((letter, index) => {
				const isCorrect = word[index] === letter.toLowerCase();
				let letterCount = 0;
				let letterCountGuess = 0;
				let letterCountBeforeIndex = 0;
				let corrects = 0;
				for (let i = 0; i < 5; i++) {
					if (word[i] === letter.toLowerCase()) {
						letterCount++
					}
					if (guess[i] === letter) {
						letterCountGuess++
						if (i < index) {
							letterCountBeforeIndex++;
						}
					}
					if (word[i] === guess[i].toLowerCase() && guess[i] === letter) {
						corrects++;
					}
				}
				const shouldShowExists = letterCount > corrects && letterCountBeforeIndex < letterCount;

				return (<div key={index} className={`letter-input flex justify-center align-center ${isCorrect && "bg-green"} ${!isCorrect && shouldShowExists ? "bg-yellow c-black" : ""}`}>
					<Input readOnly disableUnderline={true} value={letter} sx={{ maxWidth: "3ch", color: "#eee", textTransform: "uppercase" }} inputProps={{ maxLength: 1 }} />
				</div>)
			})}
		</div>
	</div>);
}
