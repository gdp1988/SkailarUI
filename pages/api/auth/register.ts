import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/lib/prisma';
import { hash } from 'bcrypt';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return res.status(200).json(newUser);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
