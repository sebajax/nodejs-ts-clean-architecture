// Module import
import Joi from 'joi';
// Interface import
import { IAddUserRequest } from './user.interface';

const addUserSchema = Joi.object<IAddUserRequest>({
  name: Joi.string().min(1).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).max(100).required(),
}).required();

export { addUserSchema };
