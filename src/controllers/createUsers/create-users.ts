import validator from "validator";
import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";
import {
  CreateUserParams,
  ICreateUserController,
  ICreateUserRepository,
} from "./protocols";

export class CreateUserController implements ICreateUserController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}
  async handle(
    httpRequest: HttpRequest<CreateUserParams>
  ): Promise<HttpResponse<User>> {
    try {
      const requiredFields = ["firstName", "lastName", "email", "password"];
      for (const fields of requiredFields) {
        if (!httpRequest?.body?.[fields as keyof CreateUserParams]?.length) {
          return {
            statusCode: 400,
            body: `Fields ${fields} are required!`,
          };
        }
      }
      const emailIsValid = validator.isEmail(httpRequest.body!.email);
      if (!emailIsValid) {
        return {
          statusCode: 400,
          body: "E-mais is invalid!",
        };
      }
      const user = await this.createUserRepository.createUser(
        httpRequest.body!
      );
      return {
        statusCode: 201,
        body: user,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong!",
      };
    }
  }
}
