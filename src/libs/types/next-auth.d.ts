import NextAuth from "next-auth";
import { UserSession } from "@/interfaces";

interface UserWithToken extends UserSession {
  accessToken: string;
}

declare module "next-auth" {
  interface Session {
    user: UserWithToken;
  }
}
