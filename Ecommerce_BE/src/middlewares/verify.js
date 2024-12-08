import jwt from 'jsonwebtoken';
import { env } from '~/config/env';

export const authentication = async (req, res, next) => {
  try {
    const authCookie = req.cookies.SessionID;

    if (!authCookie) return res.status(401).json({ message: 'You must login first' });

    jwt.verify(authCookie, env.SECRET_ACCESS_TOKEN, async (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ message: 'This session has expired. Please login' });
      }

      const { id } = decoded;

      req.userId = id;

      next();
    });
  } catch (err) {
    res.status(500).json({
      data: [],
      message: err
    });
  }
};