import { Router } from 'express';
import sessionsController from '../controllers/sessions.controller.js';

const router = Router();
/**
 * @swagger
 * /api/sessions/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags:
 *       - sessions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - last_name
 *               - email
 *               - password
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               payload: "65ee3b41c9c1f8as12e1"
 *       400:
 *         description: Valores incompletos o usuario ya existe
 */
router.post('/register',sessionsController.register);

/**
 * @swagger
 * /api/sessions/login:
 *   post:
 *     summary: Inicia sesión del usuario
 *     tags:
 *       - sessions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               message: Logged in
 *       400:
 *         description: Contraseña incorrecta o valores incompletos
 *       404:
 *         description: Usuario no existe
 */
router.post('/login',sessionsController.login);

/**
 * @swagger
 * /api/sessions/current:
 *   get:
 *     summary: Obtiene los datos del usuario logueado (cookie protegida)
 *     tags:
 *       - sessions
 *     responses:
 *       200:
 *         description: Información del usuario autenticado
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               payload:
 *                 id: "65ee3b41c9c1f8as12e1"
 *                 email: "test@email.com"
 *                 role: "user"
 */
router.get('/current',sessionsController.current);
/**
 * @swagger
 * /api/sessions/unprotectedLogin:
 *   post:
 *     summary: Login sin dto de seguridad
 *     tags:
 *       - sessions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: login sin protección
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               message: Unprotected Logged in
 *       400:
 *         description: Datos incompletos o contraseña inválida
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/unprotectedLogin',sessionsController.unprotectedLogin);



/**
 * @swagger
 * /api/sessions/unprotectedCurrent:
 *   get:
 *     summary: Obtiene el usuario desde cookie sin protección
 *     tags:
 *       - sessions
 *     responses:
 *       200:
 *         description: Usuario retornado desde cookie insegura
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               payload:
 *                 id: "65ee3b41c9c1f8as12e1"
 *                 email: "test@email.com"
 */
router.get('/unprotectedCurrent',sessionsController.unprotectedCurrent);

export default router;