import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { roomId, playerId } = req.query;
  if (!roomId || !playerId) {
    res.send(400);
    return;
  }
  const room = await prisma.room.update({
    where: {
      id: String(roomId),
    },
    data: {
      players: {
        connect: { id: String(playerId) },
      },
    },
  });

  res.json(room);
}
