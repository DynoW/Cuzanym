import { serverSupabaseUser } from "#supabase/server";
import prisma from "~/prisma/client";

export default defineEventHandler(async (event) => {
    const user = await serverSupabaseUser(event);
    if (!user) {
        throw createError({ status: 401, message: "Unauthorized" });
    }
    try {
        const tag = getRouterParam(event, "tag");
        const data = await prisma.post.findMany({
            where: {
                tags: {
                    some: {
                        name: {
                            equals: tag,
                        },
                    },
                },
            },
            include: {
                tags: true,
                votes: true,
                comments: true,
                author: {
                    select: {
                        username: true,
                    },
                },
            },
            orderBy: {
                updatedAt: "desc",
            },
        });
        return data;
    } catch (error: any) {
        throw createError({ status: 500, message: error.message });
    }
});
