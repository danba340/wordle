import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {
    query: { roomIds: roomIdsQuery, playerId },
  } = req;
  if (!roomIdsQuery || !playerId) {
    res.send(400);
    return;
  }
  const roomIds = (roomIdsQuery as string).split(',');

  const roomMatches = await prisma.match.findMany({
    where: { roomId: { in: roomIds } },
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

  res.json(unplayedRoomMatches);
}
