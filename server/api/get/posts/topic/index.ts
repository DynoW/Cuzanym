import { serverSupabaseUser } from "#supabase/server";
import { capitalize } from "vue";
import prisma from "~/prisma/client";

export default defineEventHandler(async (event) => {
    const user = await serverSupabaseUser(event);
    if (!user) {
        throw createError({ status: 401, message: "Unauthorized" });
    }
    try {
        const { topic } = await readBody(event);
        const data = await prisma.post.findMany({
            where: {
                OR: [
                    {
                        topic: {
                            name: {
                                equals: topic,
                            },
                        },
                    },
                    {
                        topic: {
                            name: {
                                equals: capitalize(topic),
                            },
                        },
                    }
                ],
            },
            include: {
                tags: true,
                reactions: true,
                comments: {
                    include: {
                        author: {
                            select: {
                                username: true,
                            },
                        },
                    },
                },
                author: {
                    select: {
                        username: true,
                    },
                },
            },
            orderBy: {
                created_at: "desc",
            },
        });
        // let data;
        // const { topic, tag } = await readBody(event);
        // if (tag) {
        //     data = await prisma.post.findMany({
        //         where: {
        //             subreddit: {
        //                 name: {
        //                     equals: topic,
        //                 },
        //             },
        //             tags: {
        //                 some: {
        //                     name: {
        //                         equals: tag,
        //                     },
        //                 },
        //             },
        //         },
        //         include: {
        //             tags: true,
        //             votes: true,
        //             comments: true,
        //             author: {
        //                 select: {
        //                     username: true,
        //                 },
        //             },
        //         },
        //         orderBy: {
        //             updatedAt: "desc",
        //         },
        //     });
        // } else {
        //     data = await prisma.post.findMany({
        //         where: {
        //             subreddit: {
        //                 name: {
        //                     equals: topic,
        //                 },
        //             },
        //         },
        //         include: {
        //             tags: true,
        //             votes: true,
        //             comments: true,
        //             author: {
        //                 select: {
        //                     username: true,
        //                 },
        //             },
        //         },
        //         orderBy: {
        //             updatedAt: "desc",
        //         },
        //     });
        // }
        return data;
    } catch (error: any) {
        throw createError({ status: 500, message: error.message });
    }
});
