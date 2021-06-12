const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const isTeacher = require('../middleware/isTeacher')
// http://localhost:5000/user/register not http://localhost:5000/signin cuz of rout in server.js
 
/*Next, we go for the POST request. We create a 
new user in the database and then return the 
created user as a response.  */

router.post('/register', userCtrl.register)
router.post('/activation', userCtrl.activateEmail)
router.post('/login', userCtrl.login)
router.post('/refresh_token', userCtrl.getAccessToken)
router.post('/forgot', userCtrl.forgotPassword)
router.post('/reset', auth, userCtrl.resetPassword)
// login as normal user  -> refresh_token -> grtUserInfo
router.get('/infor', auth, userCtrl.getUserInfor)
// login as admin -> refresh_token -> grtAllUsersInfo
router.get('/all_infor', auth, authAdmin, userCtrl.getUsersAllInfor)
router.get('/logout', userCtrl.logout)
// login as normal user   -> refresh_token -> update
router.put('/update', auth, userCtrl.updateUser)
// login as admin -> refresh_token -> update
router.patch('/update_role/:id', auth, authAdmin, userCtrl.updateUsersRole)
router.delete('/delete/:id', auth, authAdmin, userCtrl.deleteUser)


module.exports = router