import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request: Request): Promise<Response> => {
    try {
        await connectToDB()

        const prompts = await Prompt.find({}).populate('creator')

        return new Response(JSON.stringify(prompts), {
            status: 200,
            // TO NOT CACHE POST RESPONSE IN VERCEL EDGE NETWORK CACHE
            headers: {
                  'cache' : 'no-store', 
               // 'Cache-Control': 'public, s-maxage=1',
               // 'CDN-Cache-Control': 'public, s-maxage=1',
                //'Vercel-CDN-Cache-Control': 'public, s-maxage=1',
            },
        })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
}
