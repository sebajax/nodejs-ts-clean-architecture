// module import
import Joi from 'joi';

export const addUserSchema = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).max(100).required(),
}).required();
