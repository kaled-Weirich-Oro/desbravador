import { verify, sign } from 'jsonwebtoken';
import { promisify } from 'util';

import { PRIVATE } from './jwt';

export default code => promisify(verify)(code, PRIVATE);
export const encode = (val, opt = {}) => promisify(sign)(val, PRIVATE, opt);
