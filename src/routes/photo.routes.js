import { Router } from 'express';
import * as photoController from '../controllers/photo.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js';

const router = Router();

router.use(authMiddleware);

/**
 * @swagger
 * /api/photos:
 *   get:
 *     summary: Get user's photos
 *     tags: [Photos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Photos retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/', photoController.getUserPhotos);

/**
 * @swagger
 * /api/photos/{id}:
 *   delete:
 *     summary: Delete a photo
 *     tags: [Photos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Photo ID
 *     responses:
 *       200:
 *         description: Photo deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Photo not found
 */
router.delete('/:id', photoController.deleteUserPhoto);

/**
 * @swagger
 * /api/photos/upload:
 *   post:
 *     summary: Upload a photo
 *     tags: [Photos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - photo
 *             properties:
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: Image file to upload
 *     responses:
 *       200:
 *         description: Photo uploaded successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Invalid file or no file provided
 */
router.post('/upload', upload.single('photo'), photoController.uploadPhoto);

export default router;
