import { Button } from '@mui/material';
import React from 'react';
const keys = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "✓", "Z", "X", "C", "V", "B", "N", "M", "⌫"]

export default function Keyboard({ word, guesses, onKeyPress }: { word: string, guesses: string[], onKeyPress: (key: string) => void }) {
	return <div className='keyboard flex flex-wrap justify-center'>{
		keys.map(key => {
			const guessIndexes: number[] = []
			const wordIndexes: number[] = []
			for (let i = 0; i < 5; i++) {
				for (const guess of guesses) {
					if (guess[i] === key) {
						guessIndexes.push(i)
					}
				}
				if (word[i] === key.toLowerCase()) {
					wordIndexes.push(i)
				}
			}
			const isGreen = wordIndexes.some(wi => guessIndexes.includes(wi)) || key === "✓";
			const isBlack = guessIndexes.length > 0 && wordIndexes.length === 0;
			const isYellow = guessIndexes.length && wordIndexes.length;
			return (
				<Button
					onClick={() => {
						onKeyPress(key)
					}}
					variant="contained"
					color={isGreen ? "success" : isYellow ? "primary" : isBlack ? "secondary" : key === "⌫" ? "error" : "info"} sx={{ width: '✓⌫'.includes(key) ? "calc(15% - 12px)" : "calc(10% - 18px)", minWidth: 0, margin: "1px" }} key={key}>{key}
				</Button>
			)
		})
	}</div>;
}
