import { serverSupabaseUser } from "#supabase/server";
import prisma from "~/prisma/client";

export default defineEventHandler(async (event) => {
    const user = await serverSupabaseUser(event);
    if (!user) {
        throw createError({ status: 401, message: "Unauthorized" });
    }
    try {
        const data = await prisma.subreddit.findMany({
            select: {
                id: true,
                name: true,
            },
        }) as { id: string, name: string, count: number, last?: any }[];
        for (let topic of data) {
            const changedTopic = topic;
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
        for (let i = 0; i < data.length - 1; i++) {
            for (let j = i + 1; j < data.length; j++) {
                const dateI = new Date(data[i].last);
                const dateJ = new Date(data[j].last);
                if (isNaN(dateI.getTime())) {
                    const temp = data[i];
                    data[i] = data[j];
                    data[j] = temp;
                } else if (isNaN(dateJ.getTime())) {
                    continue;
                }
                if (dateI.getTime() < dateJ.getTime()) {
                    const temp = data[i];
                    data[i] = data[j];
                    data[j] = temp;
                }
            }
        }
        return data;
    } catch (error: any) {
        throw createError({ status: 500, message: error.message });
    }
});
