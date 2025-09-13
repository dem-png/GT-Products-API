let posts = [
    {id: 1, Text: "First Post", postId: 1},
    {id: 2, Text: "Second Post", postId: 1},
    {id: 3, Text: "Third Post", postId: 2}
];
let nextID = 4;

import { getPostById } from "./post.service.js";

export const getAllComments = () => {
    return comments;
};

export const getCommentById = (postId) => {
    return comments.filter(c => c.postID === postId);
};

export const createComment = (postId, commentData) => {
    const post = getPostById(postId);
    if (!post) {
        return null;
    }
    const newComment = { id : nextId++, postId: postId, ...commentData };
    comments.push(newComment);
    return newComment;
};