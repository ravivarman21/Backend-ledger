const express = require("express") 
const authMiddleware = require("../middleware/auth.middleware")
const accountController = require("../controllers/account.controller")

const router = express.Router()


/**
 * - post  /api/accounts/
 * -create a new account
 * -protected route
 */

router.post("/",authMiddleware.authMiddleware  , accountController.createAccountController)

/**
 * -get /api/accounts/
 * -get all accounts of the logged-in user
 * -protected Route
 */

router.get("/" , authMiddleware.authMiddleware , accountController.getUserAccountsController)


/**
 * - GET /api/accounts/balance/:acountId
 */


router.get("/balance/:accountId", authMiddleware.authMiddleware , accountController.getAccountBalanceController)




module.exports = router 