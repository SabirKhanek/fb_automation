import Joi from "joi";

export const authRequestSchema = Joi.object<{
  username: string;
  password: string;
}>({
  username: Joi.string().required(),
  password: Joi.string().required(),
});
