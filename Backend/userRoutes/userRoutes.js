import express from 'express';
import { loginUser, registerUser, updateDetails, userDetails } from './userControllers.js';
import { isAdmin, requireSignIn } from './userMiddlewares.js';
import { getCart, setCart } from './cartControllers.js';

const router = express.Router();


router.post('/register', registerUser)

router.post('/login', loginUser)

router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true })
})
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true })
})

// Users Data

router.get('/allUsers', userDetails);

router.post('/getcart', getCart);

router.post('/setcart', setCart);

// Update details
router.post('/update', updateDetails);


export default router;