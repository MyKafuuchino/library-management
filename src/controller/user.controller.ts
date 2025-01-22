import {
  CreateUser,
  GetUserById,
  UpdateUser,
} from "../route/user/user.validator";
import { UserService } from "../service/user.service";
import { CreateUserResponse } from "../types/user.types";
import { HttpRequest, HttpResponse, HttpNextFunction } from "../utils/http";
import { NewResponseSuccess } from "../utils/http_response";

export class UserController {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  public getUsers = async (
    req: HttpRequest,
    res: HttpResponse,
    next: HttpNextFunction
  ): Promise<void> => {
    try {
      const getUsersResponse = await this.userService.getUsers();
      res
        .status(200)
        .json(NewResponseSuccess("User get successfully", getUsersResponse));
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (
    req: HttpRequest,
    res: HttpResponse,
    next: HttpNextFunction
  ): Promise<void> => {
    try {
      const reqUser: GetUserById = {
        params: {
          userId: parseInt(req.params["userId"]),
        },
      };
      const getUserByIdResponse = await this.userService.getUserById(reqUser);
      res
        .status(200)
        .json(
          NewResponseSuccess("User get by id successfully", getUserByIdResponse)
        );
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (
    req: HttpRequest,
    res: HttpResponse,
    next: HttpNextFunction
  ): Promise<void> => {
    try {
      const reqUser: CreateUser = {
        body: req.body,
      };
      const createUserResponse = await this.userService.createUser(reqUser);
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

  public updateUserById = async (
    req: HttpRequest,
    res: HttpResponse,
    next: HttpNextFunction
  ): Promise<void> => {
    try {
      const reqUser: UpdateUser = {
        body: req.body,
        params: {
          userId: parseInt(req.params["userId"]),
        },
      };
      const updateUserResponse = await this.userService.updateUserById(reqUser);
      res
        .status(200)
        .json(
          NewResponseSuccess("User updated successfully", updateUserResponse)
        );
    } catch (error) {
      next(error);
    }
  };

  public deleteUserById = async (
    req: HttpRequest,
    res: HttpResponse,
    next: HttpNextFunction
  ): Promise<void> => {
    try {
      const reqUser: GetUserById = {
        params: {
          userId: parseInt(req.params["userId"]),
        },
      };

      const deleteUserResponse = await this.userService.deleteUserById(reqUser);

      res.status(200).json(NewResponseSuccess(deleteUserResponse));
    } catch (error) {
      next(error);
    }
  };
}
