const express = require('express');
const router = express.Router();
const usersController = require("../Controllers/UsersController");
const { authenticate, authorize } = require("../Middleware/Auth");

router.use(authenticate);

router.get('/', authorize('admin'), usersController.getUsers);
router.get('/:id', authorize('admin'), usersController.getUserById);
router.post('/', authorize('admin'), usersController.createUser);
router.put('/:id', authorize('admin'), usersController.updateUser);
router.delete('/:id', authorize('admin'), usersController.deleteUser);

module.exports = router;