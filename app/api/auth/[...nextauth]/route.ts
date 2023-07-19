import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import User from "@models/user";
import { connectToDB } from "@utils/database";
import { Profile ,Session } from "next-auth";

interface CustomProfile extends Profile {
    picture?: string;
}
interface CustomSessionUser {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
    id: string;
  }

const googleClientId = process.env.GOOGLE_CLIENT_ID ? process.env.GOOGLE_CLIENT_ID : '';
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET ? process.env.GOOGLE_CLIENT_SECRET : '';

if (!googleClientId || !googleClientSecret) {
  throw new Error('Missing environment variables for Google provider');
}



const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId: googleClientId,
            clientSecret:googleClientSecret,
        })
    ],

    callbacks:{
        async session({ session }: { session: Session }): Promise<Session> {
            const sessionUserVariable = session.user ? session.user : null;
            if (!sessionUserVariable) {
              throw new Error('Missing Session User for Google provider');
            }
            const sessionUser = await User.findOne({
              email: sessionUserVariable.email,
            });
            const customSessionUser: CustomSessionUser = {
              ...sessionUserVariable,
              id: sessionUser._id.toString(),
            };
            session.user = customSessionUser;
            return session;
        },
        async signIn({ profile }: { profile?: CustomProfile }): Promise<boolean> {
            try {
              await connectToDB();
              //
              // ______________________ User Already Exists ______________________//
              //
              const userExists = profile ? await User.findOne({ email: profile.email }) : undefined;
              //
              // ______________________ User Creation ______________________//
              //
              if (!userExists && profile && profile.name) {
                const username = profile.name.replace(/ /g, '').toLowerCase().replace(/\s*\([^)]*\)\s*/g, '');
                await User.create({
                  email: profile.email,
                  username: username,
                  image: profile.picture,
                });
              }
          
              return true;
            } catch (error) {
              console.log(error);
              return false;
            }
          }
    },
    
})

export {handler as GET, handler as POST};