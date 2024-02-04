import express from "express";
import db from "./models";
import api from "./api/routes.service";
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", api);

// connecting server + sequelize
db.sequelize
  .sync()
  .then(function () {
    app.listen(PORT, function () {
      console.log(`App listening at http://localhost:${PORT}`);
    });
  })
  .catch((err: any) => console.log(err));

export default app;
