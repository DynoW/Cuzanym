import { serverSupabaseUser } from "#supabase/server";
import { prisma } from "~/prisma/client";

export default defineEventHandler(async (event) => {
    const user = await serverSupabaseUser(event);
    try {
        const data = await prisma.post.findMany({
            include: {
                tags: true,
                comments: true,
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
        return data;
    } catch (error: any) {
        throw createError({ status: 500, message: error.message });
    }
});
