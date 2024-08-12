import passport from "passport";
import localStrategy from "passport-local";
import jwt from "passport-jwt";
import { userModel } from "../../models/user.model.js";
import { hashPass, comparePass } from "../utils/hashUtils.js";
import { generateToken, verifyToken } from "../utils/jwtUtils.js";
import {JWT_SECRET} from '../utils/jwtUtils.js'

const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

// Register
export function initializePassport() {
  passport.use(
    "register",
    new localStrategy(
      {
        usernameField: "email",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          const { first_name, last_name, age } = req.body;

          if (!first_name || !last_name || !age) {
            return done(null, false, {
              message:
                "Se deben rellenar todos los campos para poder registrarse exitosamente",
            });
          }
          const userExists = await userModel.findOne({ email });

          if (userExists) {
            return done(null, false, {
              message: "El usuario o correo electrónico ingresados ya existen",
            });
          }
          const hashPassword = await hashPass(password);

          const user = await userModel.create({
            first_name,
            last_name,
            email,
            age,
            password: hashPassword,
          });
          return done(null, user);
        } catch (error) {
          return done(`Se produjo un error: ${error.message}`);
        }
      }
    )
  );

  passport.use(
    "login",
    new localStrategy(
      {
        usernameField: "email",
      },
      async (email, password, done) => {
        try {
          const user = await userModel.findOne({ email });
          if (!user) {
            return done(null, false, { message: "No se encontró el usuario" });
          }
          const isMatch = comparePass(password, user.password);
          if (!isMatch) {
            return done(null, false, {
              message: "Contraseña incorrecta. Intentalo de nuevo",
            });
          }

          return done(null, user);
        } catch (error) {
          return done(`Hubo un error: ${error}`);
        }
      }
    )
  )

    passport.use(
        'current',
    new JWTStrategy (
        {
            jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
            secretOrKey: JWT_SECRET
        },
        async (payload, done) => {
            try {
                done (null, payload)
            } catch (error){
                return done (error)
            }
        }
    ))

    function cookieExtractor(req) {
      let token = null;
    
      if (req && req.cookies) {
        token = req.cookies.token;
      }
      console.log("cookieExtractor", token);
    
      return token;
    }



  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userModel.findById(id);

      return done(null, user);
    } catch (error) {
      return done(`Hubo un error: ${error.message}`);
    }
  });
}
