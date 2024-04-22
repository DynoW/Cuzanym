import { serverSupabaseUser } from "#supabase/server";
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
                subreddit: {
                    name: {
                        equals: topic,
                    },
                },
            },
            include: {
                tags: true,
                votes: true,
                comments: true,
                author: {
                    select: {
                        username: true,
                    },
                },
            },
            orderBy: {
                updatedAt: "desc",
            },
        });
        // for (let post of data) {
        //     const changedPost = post as unknown as {
        //         id: string;
        //         title: string;
        //         content: string;
        //         createdAt: Date;
        //         updatedAt: Date;
        //         authorId: string;
        //         author: { id: string, username: string };
        //         subredditId: string;
        //         tags: Tag[];
        //         votes: { up: number, down: number };
        //         comments: Comment[];
        //         // comm?: any[];
        //     };

        //     // changedPost.comm = await prisma.comment.findMany({
        //     //     where: {
        //     //         postId: post.id,
        //     //     }
        //     // });

        //     changedPost.votes = {
        //         up: await prisma.vote.count({
        //             where: {
        //                 postId: post.id,
        //                 type: "UP",
        //             }
        //         }),
        //         down: await prisma.vote.count({
        //             where: {
        //                 postId: post.id,
        //                 type: "DOWN",
        //             }
        //         })
        //     };
        //     post = changedPost;
        // }
        return data;
    } catch (error: any) {
        throw createError({ status: 500, message: error.message });
    }
});
