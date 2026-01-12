const express = require('express');
const router = express.Router();
const itemsController = require("../Controllers/ItemsController");
const statsController = require("../Controllers/StatsController");
const { authenticate, authorize } = require("../Middleware/Auth");


router.get('/', itemsController.getItems);
router.get('/stats', statsController.getStatistics);
router.get('/:id', itemsController.getItemById);

router.post('/', authenticate, authorize('admin', 'employee'), itemsController.createItem);
router.put('/:id', authenticate, authorize('admin', 'employee'), itemsController.updateItem);
router.delete('/:id', authenticate, authorize('admin'), itemsController.deleteItem);
router.post('/:id/collect', authenticate, authorize('admin', 'employee'), itemsController.registerCollection);

module.exports = router;