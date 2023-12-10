import { config } from "dotenv";
import express from "express";
import { GetUsersController } from "./controllers/getUsers/get-users";
import { MongoGetUsersRepository } from "./repositories/get-users/mongo-get-users";
import { MongoClient } from "./database/mongo";

const main = async () => {
  config();
  const app = express();
  const port = process.env.PORT ?? 8000;

  await MongoClient.connect();

  app.get("/users", async (req, res) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository();
    const getUsersController = new GetUsersController(mongoGetUsersRepository);
    const { body, statusCode } = await getUsersController.handle();
    res.send(body).status(statusCode);
  });

  app.listen(port, () => console.log(`listening on port ${port}`));
};

main();
