import {Router} from 'express'
import authRouter from './authRouter';


const routes = Router();

routes.use("/auth",authRouter)

export default routes;