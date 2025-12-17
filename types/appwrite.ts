import type { Models } from "node-appwrite";

export type UserRow = Models.Row & {
  fullName: string;
  email: string;
  avatar: string | null;
  accountId: string;
};

export type FileRow = Models.Row & {
  name: string;
  url: string;
  type: "document" | "image" | "video" | "audio" | "other";
  bucketFileId: string;
  accountId: string;
  extension: string;
  size: number;
  users: string[] | null;

  // relationship: can be id OR expanded object depending on query
  owner: string | UserRow | null;
};
