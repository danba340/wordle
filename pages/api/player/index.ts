import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id, name } = req.body;
  if (!name) {
    res.send(400);
    return;
  }

  // Has player profile
  if (id && name) {
    const existing = await prisma.player.findUnique({
      where: {
        id,
      },
    });
    if (existing?.name !== name) {
      const changed = await prisma.player.update({
        where: {
          id,
        },
        data: {
          name,
        },
      });
      res.json(changed);
      return;
    } else {
      res.json(existing);
      return;
    }
  } else {
    // No player profile
    const result = await prisma.player.create({
      data: {
        name,
      },
    });
    res.json(result);
    return;
  }
  res.send(500);
}
