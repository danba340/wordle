import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { playerId } = req.query;
  if (!playerId) {
    res.send(400);
    return;
  }
  const player = await prisma.player.findUnique({
    where: {
      id: String(playerId),
    },
    include: { rooms: { include: { players: true } } },
  });

  res.json(player?.rooms);
}
