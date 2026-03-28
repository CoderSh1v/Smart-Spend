import {getall} from "../controllers/analytics.controller.js"
import express from "express"
import { jwtAuth } from "../middleware/authMiddleware.js";

const analytics = express.Router();

analytics.use(jwtAuth)
analytics.get("/",getall);

export {analytics} 