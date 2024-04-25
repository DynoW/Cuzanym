export { };

declare global {

    interface Tag {
        name: string;
    }

    interface Reaction {
        type: ReactionType;
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
        topicId: string;
        tags: Tag[];
        votes: Vote[];
        comments: Comment[];
        author: { name: string; };
        
    }

    interface Topicu {
        id: string;
        name: string;
        count: number;
        last: date | undefined;
    }

    interface Topic {
        id: string;
        name: string;
        description: string;
        topics: Topic[];
        posts: Post[];
    }

    // interface Event {
    //     _path: string;
    //     titlu: string;
    //     descriere: string;
    //     data: string;
    //     ora: string;
    //     locatie: string;
    //     organizatori: [ { nume: string }];
    //     imagine: string;
    // }
}