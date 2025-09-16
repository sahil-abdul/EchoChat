import main from "./database/index.js";
import dotenv from "dotenv"
import { server } from "./socketIO/server.js";


dotenv.config({
  path:"./.env"
})

import { app } from "./app.js";


const port = process.env.PORT || 3000;
main()
  .then(() => {
    server.listen(port, () => {
      console.log("app was running on port : ", port);
    });
  })
  .catch((err) => {
    console.log("connection faild !!! : ", err);
  });
