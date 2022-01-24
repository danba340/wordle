import { useEffect, useState, createRef, useRef } from 'react';
import { Input } from '@mui/material';

export default function Board() {
	const [cursorIndex, setCursorIndex] = useState(0);
	let refs = useRef([createRef(), createRef(), createRef(), createRef(), createRef()]);

	return (<div className='flex-1'>
		<div className="flex">
			{[0, 1, 2, 3, 4].map(index => {
				return (<div key={index} className='letter-input flex justify-center align-center'>
					<Input autoFocus={index === 0} ref={refs.current[index]} sx={{ maxWidth: "2ch", color: "#eee", textTransform: "uppercase" }} inputProps={{ maxLength: 1 }} />
				</div>)
			})}
		</div>
	</div>);
}
