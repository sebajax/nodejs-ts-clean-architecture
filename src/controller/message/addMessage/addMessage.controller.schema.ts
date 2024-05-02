// module import
import Joi from 'joi';

export const addMessageSchema = Joi.object({
  text: Joi.string().min(1).required(),
  sender: Joi.string().email({ minDomainSegments: 2 }).max(100).required(),
  room: Joi.string().min(1).required(),
  messageTimestamp: Joi.date().required(),
  topScore: Joi.object({
    token: Joi.string().min(1).required(),
    riskId: Joi.number().integer().strict().required().min(1),
  }).required(),
  details: Joi.array()
    .items(
      Joi.object({
        token: Joi.string().min(1).required(),
        riskId: Joi.number().integer().strict().required().min(1),
      })
    )
    .min(1)
    .required(),
}).required();
