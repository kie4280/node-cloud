import express from "express";
import express_session from "express-session";

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

  app.get("/", (req, res) => {
    console.log(req.body);
    res.status(200).send("hello");
  });

  app.get("/status", (req, res) => {
    res.status(200).send({ status: "alive" });
  });

  app.use(express.static("static"));
}
