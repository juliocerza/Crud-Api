import { config } from "dotenv";
import express from "express";
import { GetUsersController } from "./controllers/getUsers/get-users";
import { MongoGetUsersRepository } from "./repositories/get-users/mongo-get-users";
import { MongoClient } from "./database/mongo";
import { MongoCreateUserRepository } from "./repositories/create-users/mongo-create-users";
import { CreateUserController } from "./controllers/createUsers/create-users";

const main = async () => {
  config();
  const app = express();
  app.use(express.json());
  const port = process.env.PORT ?? 8000;

  await MongoClient.connect();

  app.get("/users", async (req, res) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository();
    const getUsersController = new GetUsersController(mongoGetUsersRepository);
    const { body, statusCode } = await getUsersController.handle();
    res.status(statusCode).send(body);
  });

  app.post("/users", async (req, res) => {
    const mongoCreateUsersRepository = new MongoCreateUserRepository();
    const createUsersController = new CreateUserController(
      mongoCreateUsersRepository
    );
    const { body, statusCode } = await createUsersController.handle({
      body: req.body,
    });
    res.status(statusCode).send(body);
  });

  app.listen(port, () => console.log(`listening on port ${port}`));
};

main();
