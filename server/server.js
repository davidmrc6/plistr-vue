// server.js
import fs from "fs";
import https from "https";
import express from "express";
import axios from "axios";
import qs from "querystring";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(cookieParser());

const CLIENT_ID = process.env.VITE_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

app.get("/callback", async (req, res) => {
  const code = req.query.code;
  const tokenResponse = await axios
    .post(
      "https://accounts.spotify.com/api/token",
      qs.stringify({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: REDIRECT_URI,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`,
        },
      },
    )
    .catch(() => {
      return res.status(400).send("Token exchange failed");
    });

  const { access_token, refresh_token } = tokenResponse.data;
  res.cookie("access_token", access_token, { httpOnly: true });
  res.cookie("refresh_token", refresh_token, { httpOnly: true });
  return res.redirect("/dashboard");
});

app.get("/dashboard", (req, res) => {
  if (!req.cookies.access_token)
    return res.status(401).send("Not authenticated");
  return res.send("User is logged in with Spotify");
});

const sslOptions = {
  key: fs.readFileSync("localhost-key.pem"),
  cert: fs.readFileSync("localhost.pem"),
};

https.createServer(sslOptions, app).listen(3000);
