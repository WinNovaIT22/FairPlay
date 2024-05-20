import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function POST(req, res) {
    const { start, end } = req.body;

    try {
      const dateRange = await prisma.dateRange.create({
        data: {
          start: new Date(start),
          end: new Date(end),
        },
      });
      res.status(200).json(dateRange);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to save date range' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }

