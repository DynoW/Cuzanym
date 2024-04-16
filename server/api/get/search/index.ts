import { serverSupabaseUser } from "#supabase/server";
import { PrismaClient } from "@prisma/client";
import { capitalize } from "vue";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const user = await serverSupabaseUser(event);
    if (!user) {
        throw createError({ status: 401, message: "Unauthorized" });
    }
    try {
        const query = getQuery(event).q;
        const data = await prisma.post.findMany({
            where: {
                OR: [
                    {
                        title: {
                            //@ts-ignore
                            contains: query,
                        },
                    },
                    {
                        title: {
                            //@ts-ignore
                            contains: query.toLowerCase(),
                        },
                    },
                    {
                        title: {
                            //@ts-ignore
                            contains: query.toUpperCase(),
                        },
                    },
                    {
                        title: {
                            //@ts-ignore
                            contains: capitalize(query),
                        },
                    },
                    {
                        content: {
                            //@ts-ignore
                            contains: query,
                        },
                    },
                    {
                        content: {
                            //@ts-ignore
                            contains: query.toLowerCase(),
                        },
                    },
                    {
                        content: {
                            //@ts-ignore
                            contains: query.toUpperCase(),
                        },
                    },
                    {
                        content: {
                            //@ts-ignore
                            contains: capitalize(query),
                        },
                    },
                ],
            },
        });
        return data;
    } catch (error: any) {
        throw createError({ status: 500, message: error.message });
    }
});
