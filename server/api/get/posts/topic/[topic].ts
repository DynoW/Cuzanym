import { serverSupabaseUser } from "#supabase/server";
import prisma from "~/prisma/client";

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
            include: {
                tags: true,
                author: {
                    select: {
                        id: true,
                        username: true,
                    },
                },
            },
            orderBy: {
                updatedAt: "desc",
            },
        });
        return data;
    } catch (error: any) {
        throw createError({ status: 500, message: error.message });
    }
});
