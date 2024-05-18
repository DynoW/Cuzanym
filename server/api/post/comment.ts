import { serverSupabaseUser } from "#supabase/server";
import prisma from "~/prisma/client";

export default defineEventHandler(async (event) => {
    const user = await serverSupabaseUser(event);
    if (!user) {
        throw createError({ status: 401, message: "Unauthorized" });
    }
    try {
        const { post_id, content } = await readBody(event);

        const createComment = await prisma.comment.create({
            data: {
                post: { connect: { id: post_id } },
                content,
                author: {
                    connect: { id: user.id },
                },
            },
        });

        return createComment;
    } catch (error: any) {
        throw createError({ status: 500, message: error.message });
    }
});
