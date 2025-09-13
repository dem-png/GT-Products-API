let posts = [
    {id: 1, Title: "First Post", Content: "This is the first post."},
    {id: 2, Title: "Second Post", Content: "This is the second post."},
];
let nextID = 3;

export const getAllPosts = () => [];

export const getPostById = (id) => {
    return posts.find(p => p.id === id);
};

export const createPost = (postData) => {
    const newPost = { id : nextID++, ...postData };
    posts.push(newPost);
    return newPost;  
};

export const updatePost = (id, postData) => {
    const postIndex = posts.findIndex(p => p.id === id);
    if (postIndex === -1) {
        return null;
    }
    posts[postIndex] = { ...posts[postIndex], title: postData.title, content: postData.content };
    return posts[postsIndex];
};

export const partiallyUpdatePost = (id, updates) => {
    const postIndex = posts.findIndex(p => p.id === id);
    if (postIndex === -1) {
        return null;
    }
    const updatePost = {...posts[postIndex], ...updates };
    posts[postIndex] = updatePost;
    return updatePost
};

export const deletePost = (id) => {
    const postIndex = posts.findIndex(p => p.id === id);
    if (postIndex === -1) {
        return false;
    }
    posts.splice(postIndex, 1);
    return true;
};
