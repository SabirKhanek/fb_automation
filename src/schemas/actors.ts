import Joi from "joi";

const sortCookie = (cookie: string) => {
  // Split the cookie string by ';'
  const cookies = cookie.split(";");
  // Sort the cookies alphabetically
  const sortedCookies = cookies.map((cookie) => cookie.trim()).sort();
  // Join the sorted cookies back into a string separated by ';'
  return sortedCookies.join(";");
};

const actorSchema = Joi.string().required().custom(sortCookie);

export const actorsSchema = Joi.object<{ cookies: string[] }>({
  cookies: Joi.array().items(actorSchema).required(),
});
