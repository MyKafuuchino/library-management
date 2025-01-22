import { UserRepository } from "../repository/user.repository";
import {
  CreateUser,
  GetUserById,
  UpdateUser,
} from "../route/user/user.validator";
import {
  CreateUserResponse,
  GetUserByIdResponse,
  GetUsersResponse,
  UpdateUserResponse,
} from "../types/user.types";
import { hashPassword } from "../utils/bcrypt";
import { CustomError } from "../utils/custom_error";
import { USR_ERROR_CODES } from "../constant/error.constant";

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async getUsers(): Promise<GetUsersResponse[]> {
    return await this.userRepository.getUsers();
  }

  public async getUserById(reqUser: GetUserById): Promise<GetUserByIdResponse> {
    const user = await this.userRepository.findUserById(reqUser);
    if (!user) {
      throw new CustomError("User not found", "USER_NOT_FOUND", "NOT_FOUND");
    }
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      isActive: user.isActive,
      role: user.role,
    };
  }

  public async createUser(reqUser: CreateUser): Promise<CreateUserResponse> {
    const isUserAlreadyExist =
      await this.userRepository.findUserByEmail(reqUser);

    if (isUserAlreadyExist) {
      throw new CustomError(
        "User already exist",
        USR_ERROR_CODES.USER_ALREADY_EXISTS,
        "CONFLICT",
      );
    }
    reqUser.body.password = await hashPassword(reqUser.body.password);
    const user = await this.userRepository.createUser(reqUser);
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      role: user.role,
      isActive: user.isActive,
    };
  }

  public async updateUserById(
    reqUser: UpdateUser,
  ): Promise<UpdateUserResponse> {
    const userExist = await this.userRepository.findUserById(reqUser);
    if (!userExist) {
      throw new CustomError(
        "User not found",
        USR_ERROR_CODES.USER_NOT_FOUND,
        "NOT_FOUND",
      );
    }

    if (reqUser.body.password) {
      reqUser.body.password = await hashPassword(reqUser.body.password);
    }

    const updatedUser = await this.userRepository.updateUserById(reqUser);

    if (!updatedUser) {
      throw new CustomError(
        "Failed to update user",
        "USER_UPDATE_FAILED",
        "NOT_FOUND",
      );
    }

    return {
      id: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
      phone: updatedUser.phone,
      role: updatedUser.role,
      isActive: updatedUser.isActive,
    };
  }

  public async deleteUserById(reqUser: GetUserById): Promise<string> {
    const userExist = await this.userRepository.findUserById(reqUser);
    if (!userExist) {
      throw new CustomError(
        "User not found",
        USR_ERROR_CODES.USER_NOT_FOUND,
        "NOT_FOUND",
      );
    }
    await this.userRepository.deleteUserById(reqUser);
    return "Delete user successfully";
  }
}
