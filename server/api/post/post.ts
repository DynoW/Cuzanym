import { serverSupabaseUser } from "#supabase/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const user = await serverSupabaseUser(event);
    if (!user) {
        throw createError({ status: 401, message: "Unauthorized" });
    }
    try {
        const { title, content, tags } = await readBody(event);

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
                    create: [
                        ...tags.map((tag: string) => ({
                            name: tag,
                        })),
                    ],
                },
            },
        });

        return createPost;
    } catch (error: any) {
        throw createError({ status: 500, message: error.message });
    }
});