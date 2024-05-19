export { };

declare global {

    interface tag {
        name: string;
    }

    interface reaction {
        type: reaction_type;
        user_id: string;
        post_id: string;
    }

    interface comment {
        id: string;
        content: string;
        created_at: string;
        author_id: string;
        post_id: string;
        comment_id: string;
    }

    interface post {
        id: string;
        title: string;
        content: string | null;
        created_at: string;
        updated_at: string;
        topic_id: string;
        tags: tag[];
        reactions: reaction[];
        comments: comment[];
        author: { name: string; };
        is_hidden: boolean;
    }

    interface topic {
        id: string;
        name: string;
        description: string;
        topics: topic[];
        posts: post[];
    }

    enum reaction_type {
        UP,
        DOWN,
    }
}