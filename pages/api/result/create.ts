import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { getWord } from '../../../lib/words';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { matchId, playerId, guesses } = req.body;
  if (!matchId || !playerId || !guesses) {
    res.send(400);
    return;
  }
  const existingResult = await prisma.result.findFirst({
    where: {
      matchId,
      playerId,
    },
  });
  if (existingResult) {
    res.json({ existingResult });
    return;
  }
  const result = await prisma.result.create({
    data: {
      matchId,
      playerId,
      guesses,
    },
  });
  if (result) {
    res.json(result);
    return;
  }
  res.send(500);
}
