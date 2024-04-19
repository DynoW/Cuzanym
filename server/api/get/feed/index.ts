import { serverSupabaseUser } from "#supabase/server";
import prisma from "~/prisma/client";

export default defineEventHandler(async (event) => {
    const user = await serverSupabaseUser(event);
    if (!user) {
        throw createError({ status: 401, message: "Unauthorized" });
    }
    try {
        const data = await prisma.subreddit.findMany({
            include: {
                posts: {
                    select: {
                        id: true,
                        title: true,
                        content: true,
                    },
                },
            },
        });

        return data;
    } catch (error: any) {
        throw createError({ status: 500, message: error.message });
    }
});
