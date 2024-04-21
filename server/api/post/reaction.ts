import { serverSupabaseUser } from "#supabase/server";
import prisma from "~/prisma/client";

export default defineEventHandler(async (event) => {
    const user = await serverSupabaseUser(event);
    if (!user) {
        throw createError({ status: 401, message: "Unauthorized" });
    }
    try {
        const { postId, type } = await readBody(event);

        const existingReaction = await prisma.vote.findUnique({
            where: {
                userId_postId: {
                    userId: user.id,
                    postId,
                },
            },
        });

        if(existingReaction && existingReaction.type === type) {
            const reaction = await prisma.vote.delete({
                where: {
                    userId_postId: {
                        userId: user.id,
                        postId,
                    },
                },
            });
            return { reaction, action: "deleted" };
        } else if (existingReaction && existingReaction.type !== type) {
            const reaction = await prisma.vote.update({
                where: {
                    userId_postId: {
                        userId: user.id,
                        postId,
                    },
                },
                data: {
                    type,
                },
            });
            return { reaction, action: "updated" };
        } else {
            const reaction = await prisma.vote.create({
                data: {
                    type,
                    userId: user.id,
                    postId,
                },
            });
            return { reaction, action: "created" };
        }
    } catch (error: any) {
        throw createError({ status: 500, message: error.message });
    }
});
