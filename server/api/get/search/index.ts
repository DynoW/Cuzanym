import { serverSupabaseUser } from "#supabase/server";
import { PrismaClient } from "@prisma/client";
import { capitalize } from "vue";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const user = serverSupabaseUser(event);
    if (!user) {
        throw createError({ status: 401, message: "Unauthorized" });
    }
    try {
        const { searchString } = getQuery(event);
        const data = await prisma.post.findMany({
            where: {
                OR: [
                    {
                        title: {
                            //@ts-ignore
                            contains: searchString,
                        },
                    },
                    {
                        title: {
                            //@ts-ignore
                            contains: searchString.toLowerCase(),
                        },
                    },
                    {
                        title: {
                            //@ts-ignore
                            contains: searchString.toUpperCase(),
                        },
                    },
                    {
                        title: {
                            //@ts-ignore
                            contains: capitalize(searchString),
                        },
                    },
                    {
                        content: {
                            //@ts-ignore
                            contains: searchString,
                        },
                    },
                    {
                        content: {
                            //@ts-ignore
                            contains: searchString.toLowerCase(),
                        },
                    },
                    {
                        content: {
                            //@ts-ignore
                            contains: searchString.toUpperCase(),
                        },
                    },
                    {
                        content: {
                            //@ts-ignore
                            contains: capitalize(searchString),
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
