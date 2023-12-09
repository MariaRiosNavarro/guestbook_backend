import Joi from "joi";

export const userSchema = Joi.object({
  firstname: Joi.string().alphanum().min(3).max(10).trim().required(),
  lastname: Joi.string().trim(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "de", "es", "it"] },
  }),
  text: Joi.string(),
  id: Joi.string(),
  // img: Joi.string(),
});
