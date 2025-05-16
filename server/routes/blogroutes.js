const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');

router.post('/save-draft', async (req, res) => {
    const { id, title, content, tags } = req.body;
    try {
        const data = {
            title,
            content,
            tags,
            status: 'draft',
            updated_at: new Date(),
        };

        let blog;
        if (id) {
            blog = await Blog.findByIdAndUpdate(id, data, { new: true });
        } else {
            blog = new Blog({ ...data, created_at: new Date() });
            await blog.save();
        }

        res.json(blog);
    } catch (err) {
        res.status(500).json({ error: 'Error saving draft' });
    }
});

router.post('/publish', async (req, res) => {
    const { id, title, content, tags } = req.body;
    try {
        const data = {
            title,
            content,
            tags,
            status: 'published',
            updated_at: new Date(),
        };

        let blog;
        if (id) {
            blog = await Blog.findByIdAndUpdate(id, data, { new: true });
        } else {
            blog = new Blog({ ...data, created_at: new Date() });
            await blog.save();
        }

        res.json(blog);
    } catch (err) {
        res.status(500).json({ error: 'Error publishing blog' });
    }
});

router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ updated_at: -1 });
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching blogs' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ error: 'Not found' });
        res.json(blog);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching blog' });
    }
});
router.put('/:id', async (req, res) => {
    const { title, content, tags, status } = req.body;
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            {
                title,
                content,
                tags,
                status,
                updated_at: new Date(),
            },
            { new: true }
        );
        res.json(updatedBlog);
    } catch (err) {
        res.status(500).json({ error: 'Error updating blog' });
    }
});

module.exports = router;
