import { Router } from "express";
import rainController from "./controllers/rain-controller.js";

const router: Router = Router();

router.get('/rain', rainController);
router.get('/test', (req, res) => {

})

export default router;