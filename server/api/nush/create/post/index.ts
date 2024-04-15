import { prisma } from '~/prisma2/db';

// https://nuxt.com/docs/guide/directory-structure/server
export default defineEventHandler(async (event) => {
    // https://nuxt.com/docs/guide/directory-structure/server#handling-requests-with-body
    const { title, content, user, subreddit } = await readBody(event);

    const createPost = await prisma.post.create({
        data: {
            title,
            content,
            subreddit: {
                connect: {
                    id: subreddit.id
                }
            },
            author: {
                connect: {
                    id: user.id
                }
            }
        }
    })
        .catch((error) => {
            console.error(error);
        });

    return createPost;
});