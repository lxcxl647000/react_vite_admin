import { createBrowserRouter } from "react-router-dom";// 异步路由
import { asyncRoutes, constantRoutes } from "./routes";

const router = createBrowserRouter(constantRoutes.concat(asyncRoutes));

export default router;