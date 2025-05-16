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
