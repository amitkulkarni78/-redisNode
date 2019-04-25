const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


/**
 * User Routes
 */

//Get User List
router.route('/api/users').get(userController.getAllUser);

// Add User Route
router.route('/api/user/add').post(userController.addUser);

// Get User Details Route
router.route('/api/user/:id').get(userController.getUserDetail);

// Edit User Route 
router.route('/api/user/edit/:id').post(userController.editUser);

// Delete User Route
router.route('/api/user/delete/:id').get(userController.deleteUser);

module.exports = router;