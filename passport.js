import passport from "passport";
import User from "./models/User";

passport.use(User.createStrategy()) // passport가 strategy 사용할 수 있게 설정한다. 로그인 방식을 이용해라.
// 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());