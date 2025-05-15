import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function BlogEditor() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');

    const handleSaveDraft = () => {
        console.log('Saving draft...', { title, content, tags });
    };

    const handlePublish = () => {
        console.log('Publishing...', { title, content, tags });
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
                <button onClick={handleSaveDraft}>Save Draft</button>
                <button onClick={handlePublish} style={{ marginLeft: '10px' }}>Publish</button>
            </div>
        </div>
    );
}

export default BlogEditor;
