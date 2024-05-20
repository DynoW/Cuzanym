import { serverSupabaseUser } from "#supabase/server";
import prisma from "~/prisma/client";

export default defineEventHandler(async (event) => {
    const user = await serverSupabaseUser(event);
    if (!user) {
        throw createError({ status: 401, message: "Unauthorized" });
    }
    try {
        const { comment_id } = await readBody(event);

        const deleteComment = await prisma.comment.delete({
            where: {
                id: comment_id
            }
        });

        return deleteComment;
    } catch (error: any) {
        throw createError({ status: 500, message: error.message });
    }
});