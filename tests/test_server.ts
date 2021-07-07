import express from "express";
import express_session from "express-session";
import path from "path";

const app: express.Application = express();

export function startServer(port: number) {
  app.listen(port, () => {
    console.log("http listening on " + port);
  });

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(
    express_session({
      saveUninitialized: false,
      secret: "df4t3g8rybuib",
      resave: false,
    })
  );

  // end middleware
  app.get("/favicon.ico", (req, res) => {
    res.sendStatus(200);
  });

  app.use(express.static("dist"));

  app.get("**", (req, res) => {
    console.log(req);
    res.sendFile(path.join(__dirname, "../../", "dist/index.html"));
  });
}

startServer(3000);
