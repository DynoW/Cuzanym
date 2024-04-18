import { serverSupabaseUser } from "#supabase/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    // const user = await serverSupabaseUser(event);
    // if (!user) {
    //     throw createError({ status: 401, message: "Unauthorized" });
    // }
    try {
        const data = await prisma.subreddit.findMany({
            select: {
                id: true,
                name: true,
            },
        });
        console.log(data);
        for (let topic of data) {
            const changedTopic = topic as { id: string; name: string; count?: number; last?: Date };
            changedTopic.count = await prisma.post.count({
                where: {
                    subredditId: topic.id
                }
            });
            changedTopic.last = (await prisma.post.findFirst({
                where: {
                    subredditId: topic.id
                },
                orderBy: { createdAt: "desc" },
                select: {
                    createdAt: true
                },
            }))?.createdAt ?? undefined;
            topic = changedTopic;
        }
        return data;
    } catch (error: any) {
        throw createError({ status: 500, message: error.message });
    }
});
