import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json({ message: 'Test API route works!' });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}