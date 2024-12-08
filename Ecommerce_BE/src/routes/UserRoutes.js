import express from 'express';
import { UserController } from '~/controllers/UserController';
import { authentication } from '~/middlewares/verify';

const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);

router.get('/info', authentication, UserController.getInfo);
router.put('/update-info', authentication, UserController.updateInfo);

router.delete('/delete', authentication, UserController.deleteAccount);

export const UserRoutes = router;
