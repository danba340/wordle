import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { roomName, playerId, language } = req.body;
  if (!roomName || !playerId || !language) {
    res.send(400);
    return;
  }
  await prisma.room.create({
    data: {
      name: String(roomName),
      language,
      players: {
        connect: { id: String(playerId) },
      },
    },
  });

  res.send(200);
}
