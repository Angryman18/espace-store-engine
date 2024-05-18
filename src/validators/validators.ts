import Joi from "joi";

export const Verify = Joi.object({
  token: Joi.string().required(),
});
