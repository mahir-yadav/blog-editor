import React, { useEffect, useState } from 'react';
import './bloglist.css';
import { Link } from 'react-router-dom';


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
        <div className="blog-list-container">
            <h2>All Blogs</h2>
            {blogs.length === 0 && <p>No blogs available.</p>}
            {blogs.map((blog) => (
                <div key={blog._id} className="blog-item">
                    <div className="blog-title">{blog.title}</div>
                    <div className="blog-meta">
                        Status: {blog.status} | Updated: {new Date(blog.updated_at).toLocaleDateString()}
                    </div>
                    <div className="blog-content">{blog.content}</div>

                    <Link to={`/edit/${blog._id}`}>
                        <button className='editbutton'>Edit</button>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default BlogList;
