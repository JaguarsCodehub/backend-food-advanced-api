import bcrypt from 'bcrypt';

export const generateSalt = async () => {
  return await bcrypt.genSalt();
};

export const generatedPassword = async (password: string, salt: string) => {
  return await bcrypt.hash(password, salt);
};

export const validatedPassword = async (
  enteredPassword: string,
  savedPassword: string,
  salt: string
) => {
  return (await generatedPassword(enteredPassword, salt)) === savedPassword;
};
