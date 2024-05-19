// import { serverSupabaseUser } from "#supabase/server";
import prisma from "~/prisma/client";

export default defineEventHandler(async (event) => {
//    const user = await serverSupabaseUser(event);
//     if (!user) {
//         throw createError({ status: 401, message: "Unauthorized" });
//     }
    try {
        const data = await prisma.topic.findMany({
            select: {
                id: true,
                name: true,
            },
        }) as { id: string, name: string, count?: number, last?: Date }[];
        for (let topic of data) {
            const changedTopic = topic;
            changedTopic.count = await prisma.post.count({
                where: {
                    topic_id: topic.id,
                    is_hidden: false
                }
            });
            changedTopic.last = (await prisma.post.findFirst({
                where: {
                    topic_id: topic.id
                },
                orderBy: { created_at: "desc" },
                select: {
                    created_at: true
                },
            }))?.created_at ?? undefined;
            topic = changedTopic;
        }
        for (let i = 0; i < data.length - 1; i++) {
            for (let j = i + 1; j < data.length; j++) {
                const dateI = new Date(data[i].last as Date);
                const dateJ = new Date(data[j].last as Date);
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
