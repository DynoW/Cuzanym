import { serverSupabaseUser } from "#supabase/server";
import prisma from "~/prisma/client";

export default defineEventHandler(async (event) => {
    const user = await serverSupabaseUser(event);
    if (!user) {
        throw createError({ status: 401, message: "Unauthorized" });
    }
    try {
        const { post_id, is_hidden } = await readBody(event);

        const createPost = await prisma.post.update({
            where: {
                id: post_id
            },
            data: {
                is_hidden
            }
        });

        return createPost;
    } catch (error: any) {
        throw createError({ status: 500, message: error.message });
    }
});
