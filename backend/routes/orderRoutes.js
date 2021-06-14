const router = require('express').Router()


const orderCtrl = require('../controllers/orderControler')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.route('/').post(auth,orderCtrl.addorderitems).get(auth, authAdmin,orderCtrl.GetOrders)

router.get('/myorders',auth ,orderCtrl.GetMyOrders)
router.get('/:id',auth ,orderCtrl.getOrderById)
router.put('/:id/pay',auth ,orderCtrl.updateOrderToPaid)



module.exports = router



