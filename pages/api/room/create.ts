import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { roomName, playerId } = req.body;
  if (!roomName || !playerId) {
    res.send(400);
    return;
  }
  await prisma.room.create({
    data: {
      name: String(roomName),
      players: {
        connect: { id: String(playerId) },
      },
    },
  });

  res.send(200);
}
