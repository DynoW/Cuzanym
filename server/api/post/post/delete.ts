import { serverSupabaseUser } from "#supabase/server";
import prisma from "~/prisma/client";

export default defineEventHandler(async (event) => {
    const user = await serverSupabaseUser(event);
    if (!user) {
        throw createError({ status: 401, message: "Unauthorized" });
    }
    if ((await prisma.user.findFirst({ where: { id: user.id } }))?.is_admin != true) {
        throw createError({ status: 403, message: "Forbidden" });
    }
    try {
        const { post_id } = await readBody(event);

        const deletePost = await prisma.post.delete({
            where: {
                id: post_id
            }
        });
        
        return deletePost;
    } catch (error: any) {
        throw createError({ status: 500, message: error.message });
    }
});
