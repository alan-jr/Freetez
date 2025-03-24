import express from 'express';
import { Request, Response } from 'express';
import User from '../models/User'; // Adjust the path as necessary
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/user', async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] || '';
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as { userId: string };
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.status(200).json({
      name: user.name,
      about: user.about,
      ratings: user.ratings,
    });
  } catch (error) {
    console.error('Fetch Profile Error:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

router.get('/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({
      name: user.name,
      about: user.about,
      ratings: user.ratings,
    });
  } catch (error) {
    console.error('Fetch Profile Error:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

export default router;