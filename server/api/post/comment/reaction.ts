import { serverSupabaseUser } from "#supabase/server";
import prisma from "~/prisma/client";

export default defineEventHandler(async (event) => {
    const user = await serverSupabaseUser(event);
    if (!user) {
        throw createError({ status: 401, message: "Unauthorized" });
    }
    try {
        const { comment_id, type } = await readBody(event);
        
        const existingReaction = await prisma.comment_reaction.findUnique({
            where: {
                user_id_comment_id: {
                    user_id: user.id,
                    comment_id,
                },
            },
        });

        if (existingReaction && existingReaction.type === type) {
            const reaction = await prisma.comment_reaction.delete({
                where: {
                    user_id_comment_id: {
                        user_id: user.id,
                        comment_id,
                    },
                },
            });
            return { reaction, action: "deleted" };
        } else if (existingReaction && existingReaction.type !== type) {
            const reaction = await prisma.comment_reaction.update({
                where: {
                    user_id_comment_id: {
                        user_id: user.id,
                        comment_id,
                    },
                },
                data: {
                    type,
                },
            });
            return { reaction, action: "updated" };
        } else {
            const reaction = await prisma.comment_reaction.create({
                data: {
                    type,
                    user_id: user.id,
                    comment_id,
                },
            });
            return { reaction, action: "created" };
        }
    } catch (error: any) {
        throw createError({ status: 500, message: error.message });
    }
});
