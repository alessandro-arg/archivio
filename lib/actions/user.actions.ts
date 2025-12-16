"use server";

import { createAdminClient, createSessionClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { ID, Query } from "node-appwrite";
import { parseStringify } from "../utils";
import { cookies } from "next/headers";
import { avatarPlaceholderUrl } from "@/components/constants";
import { redirect } from "next/navigation";

const getUserByEmail = async (email: string) => {
  const { tables } = await createAdminClient();

  const result = await tables.listRows({
    databaseId: appwriteConfig.databaseId,
    tableId: appwriteConfig.usersId,
    queries: [Query.equal("email", [email])],
  });

  return result.total > 0 ? result.rows[0] : null;
};

const handleError = (error: unknown, message: string) => {
  console.log(error, message);
  throw error;
};

export const sendEmailOTP = async ({ email }: { email: string }) => {
  const { account } = await createAdminClient();

  try {
    const session = await account.createEmailToken({
      userId: ID.unique(),
      email: email,
    });

    return session.userId;
  } catch (error) {
    handleError(error, "Failed to send email OTP");
  }
};

export const createAccount = async ({
  fullName,
  email,
}: {
  fullName: string;
  email: string;
}) => {
  const user = await getUserByEmail(email);

  const accountId = await sendEmailOTP({ email });
  if (!accountId) throw new Error("Failed to send email OTP");

  if (!user) {
    const { tables } = await createAdminClient();

    await tables.createRow({
      databaseId: appwriteConfig.databaseId,
      tableId: appwriteConfig.usersId,
      rowId: ID.unique(),
      data: {
        fullName,
        email,
        avatar: avatarPlaceholderUrl,
        accountId,
      },
    });
  }

  return parseStringify({ accountId });
};

export const verifySecret = async ({
  accountId,
  password,
}: {
  accountId: string;
  password: string;
}) => {
  try {
    const { account } = await createAdminClient();

    const session = await account.createSession({
      userId: accountId,
      secret: password,
    });

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify({ sessionId: session.$id });
  } catch (error) {
    handleError(error, "Failed to verify OTP");
  }
};

export const getCurrentUser = async () => {
  const { tables, account } = await createSessionClient();

  const result = await account.get();
  const user = await tables.listRows({
    databaseId: appwriteConfig.databaseId,
    tableId: appwriteConfig.usersId,
    queries: [Query.equal("accountId", result.$id)],
  });

  if (user.total <= 0) return null;

  if (!result) {
    redirect("/sign-in");
  }

  return parseStringify(user.rows[0]);
};

export const signOut = async () => {
  const { account } = await createSessionClient();

  (await cookies()).delete("appwrite-session");
  await account.deleteSession({ sessionId: "current" });

  redirect("/sign-in");
};

export const signIn = async ({ email }: { email: string }) => {
  try {
    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      return parseStringify({ accountId: null, error: "User not found" });
    }

    await sendEmailOTP({ email });
    return parseStringify({ accountId: existingUser.accountId, error: null });
  } catch (error) {
    handleError(error, "Failed to sign in");
  }
};
