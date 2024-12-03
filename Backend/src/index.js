import express, { json, urlencoded } from "express";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import { connectDb } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import "./config/passportConfig.js";

dotenv.config();
connectDb();

const app = express();
const options = {
  origin: ["http://localhost:3001"],
  credentials: true,
};

app.use(cors(options));
app.use(json({ limit: "10kb" }));
app.use(urlencoded({ limit: "10kb", extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000 * 60,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
