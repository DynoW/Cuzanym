import { serverSupabaseUser } from "#supabase/server";
import prisma from "~/prisma/client";

export default defineEventHandler(async (event) => {
    const user = await serverSupabaseUser(event);
    if (!user) {
        throw createError({ status: 401, message: "Unauthorized" });
    }
    try {
        const { title, content, tags, user } = await readBody(event);

        const createPost = await prisma.post.create({
            data: {
                title,
                content,
                author: {
                    connect: { id: user.id },
                },
                subreddit: {
                    connect: {
                        name: 'Diverse',
                    },
                },
                tags: {
                    connectOrCreate: tags.map((tag: string) => ({
                        where: { name: tag },
                        create: { name: tag },
                    })),
                },
            },
        });

        return createPost;
    } catch (error: any) {
        throw createError({ status: 500, message: error.message });
    }
});
