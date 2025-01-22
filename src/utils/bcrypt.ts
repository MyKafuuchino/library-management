import bcrypt from "bcryptjs";

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(
  hashedPassword: string,
  password: string
): Promise<boolean> {
  return bcrypt.compare(hashedPassword, password);
}
