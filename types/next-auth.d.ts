import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
      jwt?: string;
      subscriptionLevel?: string;
    };
  }

  interface User {
    role?: string;
    jwt?: string;
    subscriptionLevel?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    jwt?: string;
    subscriptionLevel?: string;
  }
}
