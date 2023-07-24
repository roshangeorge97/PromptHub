import { getServerSession } from 'next-auth/next';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import prisma from '@/lib/prisma';
import { NextAuthOptions } from 'next-auth';
import { redirect } from 'next/navigation';


export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login'
  },

  providers: [
    // callbackUrl: `${process.env.NEXTAUTH_URL}/api/auth/callback/github`
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    }),
    // callbackUrl: `${process.env.NEXTAUTH_URL}/api/auth/callback/google`
    GoogleProvider({
      clientId: "514366748840-9aj347kq2l6361feoifhl51gcfodaq2s.apps.googleusercontent.com",
      clientSecret: "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",
    })
  ],
  adapter: PrismaAdapter(prisma),
    callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.picture;
      }
      return session;
    },
    async jwt({ token, user }) {
      const dbUser = await prisma.user.findFirst({
        where: {
          email: token.email
        }
      });

      if (!dbUser) {
        if (user) {
          token.id = user?.id;
        }
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image
      };
    }
    // async jwt({ token }) {
    //   token.userRole = "admin"
    //   return token
    // },
    
     
  }
};

export async function useRedirectIfNotLoggedIn() {
  const session = await getSession();
  if (!session) {
    return redirect('/login');
  }
  return session;
}

export const getSession = async () => {
  const session = await getServerSession(authOptions);
  return session;
};
