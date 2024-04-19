import { capitalize } from "vue";
import { serverSupabaseUser } from "#supabase/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const user = await serverSupabaseUser(event);
    if (!user) {
        throw createError({ status: 401, message: "Unauthorized" });
    }
    try {
        const query = getQuery(event).q;
        const data = await prisma.post.findMany({
            where: {
                OR: [
                    {
                        title: {
                            //@ts-ignore
                            contains: query,
                        },
                    },
                    {
                        title: {
                            //@ts-ignore
                            contains: query.toLowerCase(),
                        },
                    },
                    {
                        title: {
                            //@ts-ignore
                            contains: query.toUpperCase(),
                        },
                    },
                    {
                        title: {
                            //@ts-ignore
                            contains: capitalize(query),
                        },
                    },
                    {
                        content: {
                            //@ts-ignore
                            contains: query,
                        },
                    },
                    {
                        content: {
                            //@ts-ignore
                            contains: query.toLowerCase(),
                        },
                    },
                    {
                        content: {
                            //@ts-ignore
                            contains: query.toUpperCase(),
                        },
                    },
                    {
                        content: {
                            //@ts-ignore
                            contains: capitalize(query),
                        },
                    },
                ],
            },
            include: {
                tags: true,
                comments: true,
            },
            orderBy: {
                updatedAt: "desc",
            },
        });
        for (let post of data) {
            const changedPost = post as {
                id: string;
                title: string;
                content: string;
                createdAt: Date;
                updatedAt: Date;
                authorId: string;
                subredditId: string;
                tags: any;
                votes?: any;
                comments: any;
                // comm?: any[];
            };

            // changedPost.comm = await prisma.comment.findMany({
            //     where: {
            //         postId: post.id,
            //     }
            // });

            changedPost.votes = {
                up: await prisma.vote.count({
                    where: {
                        postId: post.id,
                        type: "UP",
                    }
                }),
                down: await prisma.vote.count({
                    where: {
                        postId: post.id,
                        type: "DOWN",
                    }
                })
            };
            post = changedPost;
        }
        if (data.length === 0) {
            throw createError({ status: 404, message: "No data found" });
        } else return data;
    } catch (error: any) {
        throw createError({ status: 500, message: error.message });
    }
});
