const bcrypt = require("bcryptjs");

export const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
};

export const comparePassword = (raw: string, hash: string) => {
  return bcrypt.compareSync(raw, hash);
};
