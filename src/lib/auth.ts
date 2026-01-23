import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const ACCESS_PASSWORD = process.env.ACCESS_PASSWORD || 'tomas-learning-2024'

const ALLOWED_EMAILS = (process.env.ALLOWED_EMAILS || 'admin@learning.cz')
  .split(',')
  .map(email => email.trim().toLowerCase())
  .filter(Boolean)

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name: string
    }
  }
  interface User {
    id: string
    email: string
    name: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    email: string
    name: string
  }
}

async function getUserFromDatabase(email: string) {
  try {
    const { PrismaClient } = await import('@prisma/client')
    const prisma = new PrismaClient()
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    })
    await prisma.$disconnect()
    return user
  } catch (error) {
    console.error('Database error in auth:', error)
    return null
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Přihlášení',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'vas@email.cz'
        },
        password: {
          label: 'Heslo',
          type: 'password'
        }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const email = credentials.email.toLowerCase().trim()
        const password = credentials.password

        const dbUser = await getUserFromDatabase(email)

        if (dbUser) {
          // Zde by měla být kontrola hashe hesla (např. bcrypt), 
          // prozatím necháváme jednoduché porovnání dle původního kódu, 
          // ale v produkci doporučuji bcrypt.compare(password, dbUser.password)
          // Zde předpokládáme, že uživatelé v DB mají hesla (pokud je pole password v modelu).
          // Jelikož model User heslo nemá, ověřujeme jen existenci uživatele + ACCESS_PASSWORD (demo režim).
          
          if (password === ACCESS_PASSWORD) {
            return {
              id: dbUser.id,
              email: dbUser.email,
              name: dbUser.name || email.split('@')[0],
            }
          }
          return null
        }

        // Fallback pro admina, pokud není v DB
        if (ALLOWED_EMAILS.includes(email)) {
          if (password === ACCESS_PASSWORD) {
            return {
              id: '1',
              email: email,
              name: email.split('@')[0],
            }
          }
        }

        return null
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id
        session.user.email = token.email
        session.user.name = token.name
      }
      return session
    },
    async signIn({ user }) {
      return true
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) return `${baseUrl}${url}`
      if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  },
  events: {
    async signIn({ user }) {
      console.log('User signed in:', user.email)
    },
    async signOut({ token }) {
      console.log('User signed out')
    }
  }
}
