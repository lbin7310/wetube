import express from "express";
import routes from "../routes";
import { videos, upload, videoDetail, editVideo, deleteVideo } from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get(routes.home, videos)
videoRouter.post(routes.upload, upload)
videoRouter.get(routes.videoDetail, videoDetail)
videoRouter.post(routes.editVideo, editVideo)
videoRouter.post(routes.deleteVideo, deleteVideo)

export default videoRouter;