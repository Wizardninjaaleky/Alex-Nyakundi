const express = require('express');
const { body } = require('express-validator');
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  createCoupon,
  getCoupons,
  updateCoupon,
  deleteCoupon,
  createFlashSale,
  getFlashSales,
  updateFlashSale,
  deleteFlashSale,
} = require('../controllers/adminController');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// All admin routes require admin authorization
router.use(protect);
router.use(authorize('admin'));

// User management
router.route('/users').get(getUsers);
router.route('/users/:id').get(getUser).put(updateUser).delete(deleteUser);

// Coupon management
router
  .route('/coupons')
  .get(getCoupons)
  .post(
    [
      body('code', 'Coupon code is required').not().isEmpty(),
      body('type', 'Type must be percentage or fixed').isIn(['percentage', 'fixed']),
      body('value', 'Value must be a positive number').isFloat({ min: 0 }),
    ],
    createCoupon
  );
router.route('/coupons/:id').put(updateCoupon).delete(deleteCoupon);

// Flash sale management
router
  .route('/flashsales')
  .get(getFlashSales)
  .post(
    [
      body('title', 'Title is required').not().isEmpty(),
      body('discount', 'Discount must be between 0 and 100').isFloat({ min: 0, max: 100 }),
      body('startDate', 'Start date is required').isISO8601(),
      body('endDate', 'End date is required').isISO8601(),
    ],
    createFlashSale
  );
router.route('/flashsales/:id').put(updateFlashSale).delete(deleteFlashSale);

module.exports = router;
