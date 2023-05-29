import PostModel from '../models/post.js';

export const createPost = async (req, res) => {
    try {
        const { title, text, tags, imageUrl } = req.body;
        const doc = new PostModel({
            title,
            text,
            imageUrl,
            tags,
            user: req.userId,
        });

        const post = await doc.save();
        res.json(post);
    } catch (err) {
        res.status(500).json({
            message: 'Не удалось создать статью',
        });
    }
};

export const getAllPosts = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec();

        res.json(posts);
    } catch (err) {
        res.status(500).json({
            message: 'Не удалось получить статьи',
        });
    }
};

export const getPost = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await PostModel.findOneAndUpdate(
            {
                _id: id,
            },
            {
                $inc: { viewCount: 1 },
            },
            {
                returnDocument: 'after',
                returnNewDocument: true,
            }
        ).exec();

        if (!post) {
            res.status(404).json({
                message: 'Не удалось получить статью',
            });
        }

        res.json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить статью',
        });
    }
};

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await PostModel.findOneAndDelete({
            _id: id,
        });

        if (!post) {
            res.status(404).json({
                message: 'Статья не найдена',
            });
        }

        res.json({
            success: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить статью',
        });
    }
};

export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, text, tags, imageUrl } = req.body;

        const post = await PostModel.findOneAndUpdate(
            {
                _id: id,
            },
            {
                title,
                text,
                imageUrl,
                tags,
                user: req.userId,
            },
            {
                returnDocument: 'after',
                returnNewDocument: true,
            }
        ).exec();

        if (!post) {
            res.status(404).json({
                message: 'Не удалось обновить статью',
            });
        }

        res.json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось обновить статью',
        });
    }
};
