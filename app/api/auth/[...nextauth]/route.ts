import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import User from "@models/user";
import { connectToDB } from "@utils/database";


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
    async session({session}){
        const sessionUser = await User.findOne({
            email:session.user.email,
        })
        session.user.id = sessionUser._id.toString();
    },
    async signIn({profile}) {
        try {
            await connectToDB();
            //
            // ______________________ User Already Exists ______________________//
            //
            const userExists = await User.findOne({email:profile.email})
            //
            // ______________________ User Creation ______________________//
            //
            if(!userExists){
                await User.create({
                    email:profile.email,
                    username: profile.name.replace(" ","").toLowerCase(),
                    image: profile.picture,

                })
            }

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
})

export {handler as GET, handler as POST};