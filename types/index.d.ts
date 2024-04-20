export { };

declare global {
    interface Tag {
        name: string;
    }

    interface Post {
        concat(arg0: Post[]): Post;
        title: string;
        content: string | null;
        id: string;
        createdAt: string;
        updatedAt: string;
        author: { id: string; name: string; };
        subredditId: string;
        tags: Tag[];
    }

    interface Topic {
        id: string;
        name: string;
        count: number;
        last: date | undefined;
    }
}