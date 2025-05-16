import React, { useEffect, useState } from 'react';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:4000/api/blogs')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch blogs');
                }
                return res.json();
            })
            .then(data => {
                setBlogs(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading blogs...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div style={{ padding: '20px' }}>
            <h2>All Blogs</h2>
            {blogs.length === 0 && <p>No blogs found.</p>}
            <ul>
                {blogs.map(blog => (
                    <li key={blog._id}>
                        <h3>{blog.title}</h3>
                        <p>Status: {blog.status}</p>
                        <p>{blog.content.substring(0, 100)}...</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BlogList;
