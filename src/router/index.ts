import { Router } from "express";
import { MainController } from "../controller";

const router = Router();

router.get("/generateId", MainController.generateUserId);
router.post("/create/block", MainController.createBlock);
router.get("/block/:id", MainController.findBlockById);
router.get("/blocks", MainController.getBlocks);

export default router;
