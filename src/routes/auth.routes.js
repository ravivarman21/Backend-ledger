const express = require('express')
const authController = require('../controllers/auth.controllers')

const router = express.Router();

//*post /api/auth/register  *//
router.post("/register" , authController.userRegisterController)


/* post /api/auth/login */
router.post("/login" , authController.userLoginController)


/**
 * -Post /api/auth/logout
 */

router.post("/logout" , authController.userLogoutController)



module.exports = router ;