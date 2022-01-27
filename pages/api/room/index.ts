import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { roomId } = req.query;
  if (!roomId) {
    res.send(400);
    return;
  }
  const room = await prisma.room.findUnique({
    where: {
      id: String(roomId),
    },
    include: { players: true },
  });

  res.json(room);
}
