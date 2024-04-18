import { serverSupabaseUser } from "#supabase/server";
import { prisma } from "~/prisma/client";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const user = await serverSupabaseUser(event);
    if (!user) {
        throw createError({ status: 401, message: "Unauthorized" });
    }
    try {
        const data = await prisma.user.findFirst({
            where: {
                id: user.id,
            },
        });

        return data;
    } catch (error: any) {
        throw createError({ status: 500, message: error.message });
    }
});
