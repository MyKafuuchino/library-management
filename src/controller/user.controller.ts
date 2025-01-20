import { CreateUser } from "../route/user/user.validator";
import { UserService } from "../service/user.service";
import { CreateUserResponse } from "../types/user.types";
import { HttpRequest, HttpResponse, HttpNextFunction } from "../utils/http";
import { NewResponseSuccess } from "../utils/http_response";

export class UserController {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  public createUser = async (
    req: HttpRequest,
    res: HttpResponse,
    next: HttpNextFunction
  ): Promise<void> => {
    try {
      const reqUserBody = req.body as CreateUser["body"];
      const createUserResponse = await this.userService.createUser(reqUserBody);
      res
        .status(201)
        .json(
          NewResponseSuccess<CreateUserResponse>(
            "User created successfully",
            createUserResponse
          )
        );
    } catch (error) {
      next(error);
    }
  };
}
