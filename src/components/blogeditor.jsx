import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { saveDraft, publishBlog } from '../api';
import { useParams, useNavigate } from 'react-router-dom';
import './blogeditor.css';


function BlogEditor() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [saving, setSaving] = useState(false);
    const [publishing, setPublishing] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await fetch(`http://localhost:4000/api/blogs/${id}`);
                const data = await res.json();
                setTitle(data.title);
                setContent(data.content);
                setTags(data.tags.join(', '));
            } catch (err) {
                console.error("Failed to fetch blog for editing", err);
            }
        };

        if (id) {
            fetchBlog();
        }
    }, [id]);

    const handleSaveDraft = async () => {
        setSaving(true);
        try {
            const blog = {
                title,
                content,
                tags: tags.split(',').map(t => t.trim()),
                status: 'draft',
            };

            let response;
            if (id) {
                response = await fetch(`http://localhost:4000/api/blogs/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(blog),
                });
            } else {
                response = await fetch(`http://localhost:4000/api/blogs/draft`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(blog),
                });
            }

            if (response.ok) {
                alert(id ? 'Draft updated!' : 'Draft saved!');
                navigate('/blogs');
            } else {
                alert('Failed to save draft');
            }
        } catch (error) {
            console.error(error);
            alert('Error saving draft');
        }
        setSaving(false);
    };
    const handlePublish = async () => {
        setPublishing(true);
        try {
            const blog = {
                title,
                content,
                tags: tags.split(',').map(t => t.trim()),
                status: 'published',
            };

            let response;
            if (id) {
                response = await fetch(`http://localhost:4000/api/blogs/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(blog),
                });
            } else {
                response = await fetch(`http://localhost:4000/api/blogs/publish`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(blog),
                });
            }

            if (response.ok) {
                alert(id ? 'Blog updated!' : 'Blog published!');
                navigate('/blogs');
            } else {
                alert('Failed to publish');
            }
        } catch (error) {
            console.error(error);
            alert('Error publishing blog');
        }
        setPublishing(false);
    };

    return (

        <div className="editor-container">
            <h2>Write your Blog</h2>

            <div className="input-group">
                <label>Title</label>
                <input
                    type="text"
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div className="input-group">
                <label>Tags (comma separated)</label>
                <input
                    type="text"
                    placeholder="e.g. tech, programming"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                />
            </div>

            <ReactQuill value={content} onChange={setContent} />

            <div className="button-group">
                <button
                    type="button"
                    onClick={() => handleSaveDraft({ title, tags, content })}
                >
                    Save Draft
                </button>
                <button
                    type="button"
                    onClick={() => handlePublish({ title, tags, content })}
                >
                    Publish
                </button>
            </div>
        </div>
    );
}

export default BlogEditor;
