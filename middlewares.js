import routes from "./routes";
import multer from "multer";

const multerVideo = multer({dest: "uploads/videos/" }); // upload한 파일을 루트 폴더에 uploads/videos에 encoding되서 생성된 파일을 저장합니다.
const multerAvatar = multer({ dest: "uploads/avatars"});

export const localMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  next();
}

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
}

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
}

export const uploadVideo = multerVideo.single('videoFile');
export const uploadAvatar = multerAvatar.single('avatar');