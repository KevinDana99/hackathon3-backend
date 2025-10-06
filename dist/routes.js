import { Router } from "express";
import rainController from "./controllers/rain-controller.js";
import temperatureController from "./controllers/temperature-controller.js";
const router = Router();
router.get('/rain', rainController);
router.get('/temperature', temperatureController);
router.get('/test', (req, res) => {
});
export default router;
//# sourceMappingURL=routes.js.map