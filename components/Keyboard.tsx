import { Button } from '@mui/material';
import React from 'react';
const keys = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "✓ ", "Z", "X", "C", "V", "B", "N", "M", "⌫ "]

export default function Keyboard() {
	return <div className='keyboard flex flex-wrap justify-center'>{
		keys.map(key => {
			return (<Button variant="contained" color={key === "✓ " ? "success" : key === "⌫ " ? "error" : "primary"} sx={{ width: key.length > 1 ? "calc(15% - 12px)" : "calc(10% - 18px)", minWidth: 0, margin: "1px" }} key={key}>{key}</Button>)
		})
	}</div>;
}
