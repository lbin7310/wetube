// Global
import routes from "../routes";
import Video from "../models/Video";
import User from "../models/User";
import Comment from "../models/Comment";

export const home = async (req, res) => {
  // await는 다음 과정이 끝날 때까지 잠시 기다려 달라는 의마다.
  try {
    const videos = await Video.find({}).sort({'_id': -1});
    res.render("Home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("Home", { pageTitle: "Home", videos: [] });
  }
}

// Search

export const search = async (req, res) => {
  const { 
    query: { term: searchingBy }
  } = req;
  let videos = [];
  try{
    videos = await Video.find({title: { $regex: searchingBy, $options: "i"} })
  }catch(error){
    console.log(error)
  }
  res.render("Search", { pageTitle: "Search", searchingBy, videos })
};

// Upload

export const getUpload = (req, res) => {
  res.render("upload", { pageTitle: "Upload" });
}

export const postUpload = async (req, res) => {
  // To do : upload and save
  const { body: { title, description },
          file: { path } } = req;
  const { user : { _id } } = req;
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
    creator: _id
  });
  const currentUser = await User.findOne({ _id });
  currentUser.videos.push(newVideo.id);
  currentUser.save();
  res.redirect(routes.videoDetail(newVideo.id));
}
  
export const videoDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id)
      .populate('creator')
      .populate('comments');
    res.render("videoDetail", { pageTitle: video.title, video });
  } catch (error) {
    res.redirect(routes.home);
  }
}
  
export const getEditVideo = async (req, res) => {
  // editVideo를 클릭 했을 때 해당 objectId가 무엇인지 알고 난 뒤 
  // 찾아낸 아이디로 database에서 정보를 title과 description의 정보를 가져온다.
  const { params: { id } } = req;
  try {
    const video = await Video.findById(id);
    if (video.creator != req.user._id) {
      throw Error();
    } else {
      res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
    }
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
  
export const deleteVideo = async (req, res) => {
  const { 
    params: {
      id
    }
  } = req;
  try {
    if (video.creator !== req.user.id) {
      throw Error();
    } else {
      await Video.findOneAndRemove({_id: id});
    }
    res.redirect(routes.home);
  } catch (error) {
    res.redirect(routes.home);
  }
}

// Register Video View

export const postRegisterView = async (req, res) => {
  const { 
    params: { id }
   } = req;
  try {
    const video = await Video.findById(id)
    video.views += 1;
    video.save();
    res.status(200);
  } catch(error) {
    res.status(400);
    res.end();
  } finally {
    res.end();
  }
}

// Add comment

export const postAddComment = async (req,res) => {
  const {
    params: {id},
    body: { comment },
    user
  } = req;
  try {
    const video = await Video.findById(id);
    const newComment = await Comment.create({
      text: comment,
      creator: user.id
    })
    video.comments.push(newComment._id);
    video.save();
  } catch(error) {
    res.status(400);
  } finally {
    res.end();
  }
}