import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {
    query: { id },
  } = req;

  const result = await prisma.match.findUnique({
    where: { id: String(id) },
  });

  res.json(result);
}
