import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { saveDraft, publishBlog } from '../api';

function BlogEditor() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [saving, setSaving] = useState(false);
    const [publishing, setPublishing] = useState(false);

    const handleSaveDraft = async () => {
        setSaving(true);
        try {
            const blog = {
                title,
                content,
                tags: tags.split(',').map(t => t.trim()),
                status: 'draft',
            };
            const saved = await saveDraft(blog);
            alert('Draft saved!');
            // You can also update state if you want saved blog ID
        } catch (error) {
            alert('Failed to save draft');
            console.error(error);
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
            const published = await publishBlog(blog);
            alert('Blog published!');
            // Clear form or do something else
        } catch (error) {
            alert('Failed to publish blog');
            console.error(error);
        }
        setPublishing(false);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Write Your Blog</h2>
            <input
                type="text"
                placeholder="Blog Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ width: '100%', marginBottom: '10px' }}
            />
            <input
                type="text"
                placeholder="Tags (comma-separated)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                style={{ width: '100%', marginBottom: '10px' }}
            />
            <ReactQuill value={content} onChange={setContent} />
            <div style={{ marginTop: '10px' }}>
                <button onClick={handleSaveDraft} disabled={saving}>
                    {saving ? 'Saving...' : 'Save Draft'}
                </button>
                <button onClick={handlePublish} disabled={publishing} style={{ marginLeft: '10px' }}>
                    {publishing ? 'Publishing...' : 'Publish'}
                </button>
            </div>
        </div>
    );
}

export default BlogEditor;
