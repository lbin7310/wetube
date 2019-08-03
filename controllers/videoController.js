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
  
export const videoDetail = async (req, res) => {
  const {
    params: {id}
  } = req;
  try {
    const video = await Video.findById(id);
    res.render("videoDetail", { pageTitle: "Video Detail", video });
  } catch (error) {
    res.redirect(routes.home);
  }
}
  
export const getEditVideo = async (req, res) => {
  // editVideo를 클릭 했을 때 해당 objectId가 무엇인지 알고 난 뒤 
  // 찾아낸 아이디로 database에서 정보를 title과 description의 정보를 가져온다.
  const { params: { id } } = req;
  try {
    const video = await Video.findById(id)
    res.render("editVideo", { pageTitle: "Edit Video", video });
  } catch (error) {
    res.redirect(routes.home);
  }
}
  
export const postEditVideo = async (req, res) => {
  const { 
    params: { id },
    body: {
      title, description
    }
  } = req;
  try {
    await Video.findOneAndUpdate({_id: id}, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
}
  
export const deleteVideo = (req, res) => 
  res.render("deleteVideo", { pageTitle: "Delete Video" });