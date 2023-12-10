import { IGetUsersRepository } from "../../controllers/getUsers/protocols";
import { User } from "../../models/user";

export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    return [
      {
        firstName: "Julio",
        lastName: "Rocha",
        email: "julhocerza@gmail.com",
        password: "123",
      },
    ];
  }
}
