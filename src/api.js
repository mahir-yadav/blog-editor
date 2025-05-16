
const API_BASE = 'https://blog-editor-sw8v.onrender.com/api/blogs';

export const saveDraft = async (blog) => {
    const response = await fetch(`${API_BASE}/save-draft`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blog),
    });
    return response.json();
};

export const publishBlog = async (blog) => {
    const response = await fetch(`${API_BASE}/publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blog),
    });
    return response.json();
};
export const getBlogById = async (id) => {
    const res = await fetch(`https://blog-editor-sw8v.onrender.com/api/blogs/${id}`);
    return await res.json();
};

export const updateBlog = async (id, blog) => {
    const res = await fetch(`https://blog-editor-sw8v.onrender.com/api/blogs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blog),
    });
    return await res.json();
};

