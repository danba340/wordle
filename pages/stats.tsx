import { useState, useEffect, useCallback } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import axios from "axios"
import toast from 'react-hot-toast';

import useLocalStorage from '../lib/useLocalstorage';

import Header from '../components/Header';

import { Player, Room, Match } from "../types";

const Stats: NextPage = () => {
	const { push } = useRouter()
	const [room, setRoom] = useLocalStorage<Room | null>('room', null);
	const [roomRes, setRoomRes] = useState<Room | null>(null);

	const fetchRoom = useCallback(async (roomId) => {
		// Fetch room
		try {
			const res = await axios.get(`/api/results?roomId=${roomId}`)
			setRoom(res.data);
			setRoomRes(res.data);
		} catch (e) {
			toast.error("Error fetching leaderboard")
		}
	}, [setRoom])

	useEffect(() => {
		if (!roomRes && room) {
			fetchRoom(room.id)
		}
	}, [room, roomRes, fetchRoom])

	const scoredPlayers = roomRes ? (roomRes.players).map(player => {
		const results = (roomRes.matches).flatMap(match => {
			return match.results
		}).filter(result => result.playerId === player.id)

		const totalGuesses = results.reduce((total, result) => {
			return total + result.guesses.length
		}, 0);
		const averageGuesses = totalGuesses / results.length;
		const byLowestGuessAmount = results.sort((a, b) => {
			return a.guesses.length - b.guesses.length
		})
		const lowestGuessAmount = byLowestGuessAmount.length ? byLowestGuessAmount[0].guesses.length : 0;
		return { ...player, results, averageGuesses, lowestGuessAmount }
	}) : []
	const playersByLowestAverage = [...scoredPlayers].sort((a, b) => {
		return a.averageGuesses - b.averageGuesses
	})
	const playersByLowestGuessAmount = [...scoredPlayers].sort((a, b) => {
		return a.lowestGuessAmount - b.lowestGuessAmount
	})
	return (
		<>
			<Header />
			<div>
				<h1>{room?.name || ""} stats</h1>
				<h2>Best average</h2>
				<table>
					<tbody>
						<tr>
							<th></th>
							<th>Player</th>
							<th>Lowest average</th>
						</tr>
						{playersByLowestAverage.map((player, index) => {
							return (
								<tr key={player.id}>
									<td>{index === 0 && "🏆 "}</td>
									<td>{player.name}</td>
									<td>{player.averageGuesses.toFixed(2)}</td>
								</tr>
							)
						})}
					</tbody>
				</table>
				<h2>Best single round</h2>
				<table>
					<tbody>
						<tr>
							<th></th>
							<th>Player</th>
							<th>Lowest guess count</th>
						</tr>
						{playersByLowestGuessAmount.map((player, index) => {
							return (
								<tr key={player.id}>
									<td>{index === 0 && "🏆 "}</td>
									<td>{player.name}</td>
									<td>{player.lowestGuessAmount}</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>

		</>
	)
};

export default Stats;
