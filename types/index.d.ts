export { };

declare global {

    interface Tag {
        name: string;
    }

    interface Vote {
        type: VoteType;
        userId: string;
        postId: string;
    }

    interface Comment {
        id: string;
        content: string;
        createdAt: string;
        authorId: string;
        postId: string;
        commentId: string;
    }

    interface Post {
        id: string;
        title: string;
        content: string | null;
        createdAt: string;
        updatedAt: string;
        subredditId: string;
        tags: Tag[];
        votes: Vote[];
        comments: Comment[];
        author: { name: string; };
        
    }

    interface Topic {
        id: string;
        name: string;
        count: number;
        last: date | undefined;
    }
}