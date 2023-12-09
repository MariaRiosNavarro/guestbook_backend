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
  img: Joi.string().custom((value, helpers) => {
    //  Check file extension
    const allowedExtensions = ["jpg", "jpeg", "png"];
    const fileExtension = value.split(".").pop().toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      return helpers.error("any.invalid");
    }

    // If the extension is valid, return the value
    return value;
  }, "Custom validation for image extension"),
});
