import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";


export const POST = async (request: Request): Promise<Response> => {
    const { queryString } = await request.json();

    try {
        connectToDB();
        if (queryString) {
            // If a search query is provided, perform a search
            const regex = new RegExp(queryString, 'i');
            const searchQuery = {
                $or: [
                    { prompt: { $regex: regex } },
                    { tag: { $regex: regex } },
                ],
            };
            const prompts = await Prompt.find(searchQuery).populate('creator');
            return new Response(JSON.stringify(prompts), {
                status: 200,
                // TO NOT CACHE POST RESPONSE IN VERCEL EDGE NETWORK CACHE
                headers: {
                    'Cache-Control': 'public, s-maxage=1',
                    'CDN-Cache-Control': 'public, s-maxage=1',
                    'Vercel-CDN-Cache-Control': 'public, s-maxage=1',
                },
            });
        }
        else {
            // If no search query is provided, fetch all prompts
            const prompts = await Prompt.find({}).populate('creator');
            return new Response(JSON.stringify(prompts), {
                status: 200,
                // TO NOT CACHE POST RESPONSE IN VERCEL EDGE NETWORK CACHE
                headers: {
                    'Cache-Control': 'public, s-maxage=1',
                    'CDN-Cache-Control': 'public, s-maxage=1',
                    'Vercel-CDN-Cache-Control': 'public, s-maxage=1',
                },
            });
        }
    } catch (error) {
        return new Response("Failed to fetch prompts", { status: 500 });
    }

}