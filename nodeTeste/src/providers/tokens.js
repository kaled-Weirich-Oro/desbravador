import jwt from 'jsonwebtoken';
import {PRIVATE} from '../config/jwt_password';

export const userToken = (usuario, id) => { 
  const tokenJwt = jwt.sign({usuario: usuario, id: id}, PRIVATE, { expiresIn: '10h' });
  return tokenJwt;
};
export const decriptToken = (token) => {
  return new Promise((resolve, reject) => {

    jwt.verify(token, PRIVATE, function(err, decode) {
      if (err)
        return reject(err);

      resolve(decode);
    });
  });
};

export const ValidaToken = (token) => {
  return jwt.verify(token, PRIVATE, function(err, decode) {
    if (err)
      return false;

    return true;
  });
}