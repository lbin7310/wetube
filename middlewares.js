import routes from "./routes";
import multer from "multer";

const multerVideo = multer({dest: "uploads/videos/" }) // upload한 파일을 루트 폴더에 uploads/videos에 encoding되서 생성된 파일을 저장합니다.

export const localMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.user = req.user || null;
  console.log(req.user);
  next();
}

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
}

export const uploadVideo = multerVideo.single('videoFile');