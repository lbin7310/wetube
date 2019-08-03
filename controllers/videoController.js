// Global
import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
  // await는 다음 과정이 끝날 때까지 잠시 기다려 달라는 의마다.
  try {
    const videos = await Video.find({});
    res.render("Home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("Home", { pageTitle: "Home", videos: [] });
  }
}

export const search = (req, res) => {
  const { query: {term: searchingBy} } = req;
  res.render("Search", { pageTitle: "Search", searchingBy, videos })
};

export const getUpload = (req, res) => {
  res.render("upload", { pageTitle: "Upload" });
}
export const postUpload = async (req, res) => {
  // To do : upload and save
  const { body: { title, description },
          file: { path } } = req;
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description
  });
  console.log(newVideo);
  res.redirect(routes.videoDetail(newVideo.id));
}
  
export const videoDetail = (req, res) => 
  res.render("videoDetail", { pageTitle: "Video Detail" });
export const editVideo = (req, res) => 
  res.render("editVideo", { pageTitle: "Edit Video" });
export const deleteVideo = (req, res) => 
  res.render("deleteVideo", { pageTitle: "Delete Video" });