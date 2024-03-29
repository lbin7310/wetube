import passport from "passport";
import routes from "../routes";
import User from "../models/User";

// Videos

export const getJoin = (req, res) => {
  res.render("Join", { pageTitle: "Join" });
};

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2}
  } = req;
  if (password !== password2) {
    res.status(400)
    res.render("Join", { pageTitle: "Join" });
  } else {
    try{
      // To Do: Register User
      const user = await User({
        name,
        email
      })
      await User.register(user, password);
      next();
    } catch(error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
}


export const getLogin = (req, res) => {
  res.render("Login", { pageTitle: "Login" });
}
export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home
})

export const githubLogin = passport.authenticate('github');

export const githubLoginCallback = async (_, __, profile, cb) => {
  const { _json: { id, avatar_url, name, email } } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      user.avatarUrl = avatar_url
      user.save();
      return cb(null, user);
    } 
    const newUser = await User.create({
      email,
      name,
      githubId: id,
      avatarUrl: avatar_url
    })
    return cb(null, newUser);
  } catch(error){
    return cb(error);
  }
}


export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
}

export const kakaoLogin = passport.authenticate('kakao');

export const kakaoLoginCallback = async (_, __, profile, cb) => {
  const { 
    _json: 
    {
      id, kaccount_email,
      properties: {
        profile_image,
        nickname
      }
    }
  } = profile;
  try {
    const user = await User.findOne({ kaccount_email });
    if (user) {
      user.facebookiId = id;
      user.avatarUrl = profile_image;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email: kaccount_email,
      facebookiId: id,
      avatarUrl: profile_image,
      name: nickname
    })
    return cb(null, newUser)
  } catch(error) {
    return cb(error)
  }
}

export const postKakaoLogin = (req, res) => {
  res.redirect(routes.home);
}

export const logout = (req, res) => {
  // To Do: Process Log out
  req.logout();
  res.redirect(routes.home);
}

// Users

export const getMe = (req, res) => {
  res.render("userDetail", { pageTitle: "User Detail", user: req.user });
}

export const userDetail = async (req, res) => {
  const { params: {id} } = req;
  try{
    const user = await User.findById(id).populate('videos');
    console.log(user);
    res.render("userDetail", { pageTitle: "User Detail", user });
  } catch(error) {
    res.redirect(routes.home);
  }
}
  


export const getEditProfile = (req, res) => 
  res.render("editProfile", { pageTitle: "Edit Profile" });

export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file
  } = req;
  try {
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email, 
      avatarUrl: file ? file.path : req.user.avatarUrl
    });
    res.redirect(routes.me);
  } catch(error) {
    res.redirect(routes.editProfile);
  }
}

export const getChangePassword = (req, res) => {
  res.render("changePassword", { pageTitle: "Change Password" });
}

export const postChangePassword = async (req, res) => {
  const { 
    body: {
      oldPassword,
    newPassword,
    newPassword1
    }
   } = req;
   try {
    if (newPassword !== newPassword1) {
      res.status(400);
      res.redirect(`/users${routes.changePassword}`);
      return;
    }
    await req.user.changePassword(oldPassword, newPassword);
    res.redirect(routes.me);
   }catch(error) {
     res.status(400);
     res.redirect(`/users${routes.changePassword}`);
   }
}