import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { saveDraft, publishBlog } from '../api';
import './blogeditor.css';
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

        <div className="editor-container">
            <h2>Write your Blog</h2>
            <div className="input-group">
                <label>Title</label>
                <input type="text" placeholder="Enter title" />
            </div>

            <div className="input-group">
                <label>Tags (comma separated)</label>
                <input type="text" placeholder="e.g. tech, programming" />
            </div>
            <ReactQuill value={content} onChange={setContent} />

            <div className="button-group">
                <button>Save Draft</button>
                <button>Publish</button>
            </div>
        </div>
    );
}

export default BlogEditor;
