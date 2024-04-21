import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/utils";

async function createUser(data: User) {
  try {
    let hashedPassword = null;
    if (data.password) {
      hashedPassword = await hashPassword(data.password);
    }

    const user = await prisma.user.create({
      data: {
        email: data.email,
        firstName: data.firstName || null,
        middleName: data.middleName || null,
        lastName: data.lastName || null,
        password: hashedPassword,
        location: data.location || null,
        provider: data.provider,
        providerId: data.providerId,
      },
    });
    return user;
  } catch (error) {
    throw new Error(error as string);
  }
}

async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        middleName: true,
        lastName: true,
        password: true,
        location: true,
      },
    });

    if (!user) return null;

    return user;
  } catch (error) {
    return null;
  }
}

export { createUser, getUserByEmail };
