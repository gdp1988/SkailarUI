const handler = (req: any, res: any) => {
  if (req.method === 'POST') {
    const data = req.body;
  }

  return res.status(400).json({ message: 'Bad request' });
};

export default handler;
