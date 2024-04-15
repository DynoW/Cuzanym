import { serverSupabaseUser } from "#supabase/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const user = serverSupabaseUser(event);
    if (!user) {
        throw createError({ status: 401, message: "Unauthorized" });
    }
    try {
        const data = await prisma.subreddit.findMany({
            include: {
                posts: {
                    select: {
                        id: true,
                        title: true,
                        content: true,
                    },
                },
            },
        });

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