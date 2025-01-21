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

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async getUsers(): Promise<GetUsersResponse[]> {
    const usersResponse: GetUsersResponse[] =
      await this.userRepository.getUsers();
    return usersResponse;
  }

  public async getUserById(reqUser: GetUserById): Promise<GetUserByIdResponse> {
    const user = await this.userRepository.getUserById(reqUser);
    if (!user) {
      throw new CustomError("User not found", "USER_NOT_FOUND", 404);
    }
    const userResponse: GetUserByIdResponse = {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      isActive: user.isActive,
      role: user.role,
    };
    return userResponse;
  }

  public async createUser(reqUser: CreateUser): Promise<CreateUserResponse> {
    reqUser.body.password = await hashPassword(reqUser.body.password);
    const user = await this.userRepository.createUser(reqUser);
    const userResponse: CreateUserResponse = {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      role: user.role,
      isActive: user.isActive,
    };
    return userResponse;
  }

  public async updateUserById(
    reqUser: UpdateUser
  ): Promise<UpdateUserResponse> {
    const userExist = await this.userRepository.getUserById(reqUser);
    if (!userExist) {
      throw new CustomError("User not found", "USER_NOT_FOUND", 404);
    }

    if (reqUser.body.password) {
      reqUser.body.password = await hashPassword(reqUser.body.password);
    }

    const updatedUser = await this.userRepository.updateUserById(reqUser);

    if (!updatedUser) {
      throw new CustomError("Failed to update user", "USER_UPDATE_FAILED", 404);
    }

    const updatedUserResponse: UpdateUserResponse = {
      id: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
      phone: updatedUser.phone,
      role: updatedUser.role,
      isActive: updatedUser.isActive,
    };

    return updatedUserResponse;
  }

  public async deleteUserById(reqUser: GetUserById): Promise<string> {
    const userExist = await this.userRepository.getUserById(reqUser);
    if (!userExist) {
      throw new CustomError("User not found", "USER_NOT_FOUND", 404);
    }
    await this.userRepository.deleteUserById(reqUser);
    return "Delete user successfully";
  }
}
