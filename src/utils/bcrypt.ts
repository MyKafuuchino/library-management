import bcrypt from "bcryptjs";

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(hashedPassword: string): Promise<boolean> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.compare(hashedPassword, salt);
}
