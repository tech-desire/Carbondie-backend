import { Router } from "express";
import { getProduct } from "../controller/productController";
import { verifyToken } from "../middleware/authmiddleware";
const productRouter = Router();

productRouter.get('/:id',verifyToken, getProduct)





export default productRouter


