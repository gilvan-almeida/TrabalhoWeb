const express = require('express');
const router = express.Router();
const usersController = require("../Controllers/UsersController");
const { authenticate, authorize, authorizeSelfOrAdmin } = require("../Middleware/Auth");

router.use(authenticate);

router.get('/', authorize('admin'), usersController.getUsers);
router.post('/', authorize('admin'), usersController.createUser);
router.get('/:id', authorizeSelfOrAdmin, usersController.getUserById);
router.put('/:id', authorizeSelfOrAdmin, usersController.updateUser);
router.delete('/:id', authorizeSelfOrAdmin, usersController.deleteUser);

module.exports = router;