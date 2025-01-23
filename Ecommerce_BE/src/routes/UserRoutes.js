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

router.get('/search-history', authentication, UserController.getSearchProductHistory);
router.post('/search-history', authentication, UserController.storeSearchProductHistory);

export const UserRoutes = router;
