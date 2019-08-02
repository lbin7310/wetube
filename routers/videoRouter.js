import express from "express";
import routes from "../routes";
import { postUpload, getUpload, videoDetail, editVideo, deleteVideo, home } from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get(routes.home, home)
videoRouter.get(routes.upload, getUpload)
videoRouter.post(routes.upload, postUpload)
videoRouter.get(routes.videoDetail(), videoDetail)
videoRouter.get(routes.editVideo, editVideo)
videoRouter.get(routes.deleteVideo, deleteVideo)

export default videoRouter;