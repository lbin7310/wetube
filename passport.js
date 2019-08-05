import passport from "passport";
import GithubStrategy from "passport-github";
import KakaoStrategy from "passport-kakao";
import User from "./models/User";
import { githubLoginCallback, kakaoLoginCallback } from "./controllers/userController";
import routes from "./routes";

passport.use(User.createStrategy()) // passport가 strategy 사용할 수 있게 설정한다. 로그인 방식을 이용해라.
//
passport.use(
  new GithubStrategy({
    clientID: process.env.GH_ID,
    clientSecret: process.env.GH_SECRET,
    callbackURL: `http://localhost:4000${routes.githubCallback}`
  },
  githubLoginCallback
));

passport.use(
  new KakaoStrategy({
    clientID: process.env.KAKAO_ID,
    clientSecret: process.env.KAKAO_SECRET,
    callbackURL: `http://localhost:4000${routes.kakaoCallback}`
  },
  kakaoLoginCallback
  )
)

passport.serializeUser((user, done) => { 
  done(null, user)
});
passport.deserializeUser((user, done) => { 
  done(null, user)
});

