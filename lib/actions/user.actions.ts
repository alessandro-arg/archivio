"use server";

import { createAdminClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { ID, Query } from "node-appwrite";
import { parseStringify } from "../utils";

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

const sendEmailOTP = async ({ email }: { email: string }) => {
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
        avatar: "https://cdn-icons-png.flaticon.com/512/3675/3675805.png",
        accountId,
      },
    });
  }

  return parseStringify({ accountId });
};
