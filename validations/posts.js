import { body } from 'express-validator';

export const postCreateValidation = [
    body('title', 'Введите заголовок статьи').isLength({ min: 3 }).isString(),
    body('text', 'Введите текст статьи').isLength({ min: 10 }).isString(),
    body('tags', 'Неверный формат тэгов (укажите массив)').optional().isArray(),
    body('imageUrl', 'Неверная ссылка на массив').optional().isString(),
];

export const postUpdateValidation = [
    body('title', 'Введите заголовок статьи').isLength({ min: 3 }).optional().isString(),
    body('text', 'Введите текст статьи').isLength({ min: 10 }).optional().isString(),
    body('tags', 'Неверный формат тэгов (укажите массив)').optional().isArray(),
    body('imageUrl', 'Неверная ссылка на массив').optional().isString(),
];
