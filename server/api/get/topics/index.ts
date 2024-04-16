import { serverSupabaseUser } from "#supabase/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
        });
        console.log(data);
        for (let topic of data) {
            const topicWithCount = topic as { id: string; name: string; count?: number; last?: Date };
            topicWithCount.count = await prisma.post.count({
                where: {
                    subredditId: topic.id
                }
            });
            topicWithCount.last = (await prisma.post.findFirst({
                where: {
                    subredditId: topic.id
                },
                orderBy: { createdAt: "desc" },
                select: {
                    createdAt: true
                },
            }))?.createdAt ?? undefined;
            topic = topicWithCount;
        }
        return data;
    } catch (error: any) {
        throw createError({ status: 500, message: error.message });
    }
});

// export default async function handler(req, res) {
//   if (req.method === "GET") {
//     const { data: topics, error } = await prisma.topic.findMany({
//       include: {
//         posts: {
//           select: {
//             id: true,
//             title: true,
//             content: true,
//             user: {
//               select: {
//                 id: true,
//                 name: true,
//               },
//             },
//           },
//         },
//       },
//     });
//     if (error) {
//       return res.status(500).json({ error: error.message });
//     }
//     return res.status(200).json({ topics });
//   }
//   return res.status(405).json({ error: "Method not allowed" });
// }