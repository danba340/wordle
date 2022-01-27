import toast from 'react-hot-toast';
import { Button } from '@mui/material';

export default function InviteLink({ inviterName, roomId, btnText }: { inviterName: string, roomId: string, btnText: string }) {
	return (
		<Button
			onClick={() => {
				if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
					navigator.clipboard.writeText(`${inviterName} invited you to a wordle battle ${process.env.NEXT_PUBLIC_URL}?room=${roomId}`)
					toast.success('Link copied to clipboard 📋')
				} else {
					toast.error('Could not copy link to clipboard. Copy link from navbar instead.')
				}
			}}
			sx={{ marginTop: "4px", marginBottom: "4px" }}
			variant='outlined'
		>
			{btnText}
		</Button>
	)
}
