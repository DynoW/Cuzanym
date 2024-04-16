import { serverSupabaseUser } from "#supabase/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const user = await serverSupabaseUser(event);
    if (!user) {
        throw createError({ status: 401, message: "Unauthorized" });
    }
    try {
        const topic = getRouterParam(event, "topic");
        const data = await prisma.post.findMany({
            where: {
                subreddit: {
                    name: {
                        equals: topic,
                    },
                },
            },
        });

        return data;
    } catch (error: any) {
        throw createError({ status: 500, message: error.message });
    }
});
