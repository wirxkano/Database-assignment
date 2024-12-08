import jwt from 'jsonwebtoken';
import { env } from '~/config/env';

export const generateAccessJWT = (id) => {
  let payload = {
    id: id
  };

  return jwt.sign(payload, env.SECRET_ACCESS_TOKEN, {
    expiresIn: '180m'
  });
};
