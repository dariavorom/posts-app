import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import { registerValidation } from './validations/auth.js';
import { loginValidation } from './validations/login.js';
import { checkAuth, handleValidationErrors } from './utils/index.js';
import { postCreateValidation } from './validations/posts.js';
import { UserController, PostController } from './controllers/index.js';

mongoose
    .connect(
        'mongodb+srv://dariavorom:cappuccio@cluster0.uhf01ob.mongodb.net/blog?retryWrites=true&w=majority'
    )
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err));

const app = express();

const storage = multer.diskStorage({
    destination: (_, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static('uploads'));

//Авторизация
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.get('/auth/me', checkAuth, UserController.getMe);

//CRUD-операции со статьями
app.get('/posts', PostController.getAllPosts);
app.get('/posts/:id', PostController.getPost);
app.post(
    '/posts',
    checkAuth,
    postCreateValidation,
    handleValidationErrors,
    PostController.createPost
);
app.delete('/posts/:id', checkAuth, PostController.deletePost);
app.patch(
    '/posts/:id',
    checkAuth,
    postCreateValidation,
    handleValidationErrors,
    PostController.updatePost
);

//Загрузка картинок
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});

app.listen(4444, (err) => {
    if (err) {
        console.log('Server error', err);
    }

    console.log('server OK');
});
