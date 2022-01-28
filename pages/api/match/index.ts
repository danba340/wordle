import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { getWord } from '../../../lib/words';
import { Language } from '../../../types';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {
    query: { roomId, playerId },
  } = req;
  if (!roomId || !playerId) {
    res.send(400);
    return;
  }

  const room = await prisma.room.findUnique({
    where: { id: String(roomId) },
  });

  const roomMatches = await prisma.match.findMany({
    where: { roomId: String(roomId) },
    include: { results: true },
    orderBy: [
      {
        createdAt: 'asc',
      },
    ],
  });

  const unplayedRoomMatches = roomMatches.filter((match) => {
    return match.results.every((result) => result.playerId !== playerId);
  });

  if (unplayedRoomMatches.length) {
    res.json(unplayedRoomMatches[0]);
    return;
  } else {
    const newMatch = await prisma.match.create({
      data: {
        roomId: String(roomId),
        word: getWord(Language[room?.language || 'EN']),
      },
    });
    res.json(newMatch);
    return;
  }
}
