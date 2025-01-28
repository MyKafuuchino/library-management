import {UserRepository} from "../repository/user.repository";
import {GetUserById, UpdateUser} from "../route/user/user.validator";
import {
  GetUserByIdResponse,
  GetUsersResponse,
  UpdateUserResponse,
} from "../types/user.types";
import {hashPassword} from "../utils/bcrypt";
import {CustomError} from "../utils/custom_error";

export interface UserService {
  getUsers(): Promise<GetUsersResponse[]>

  getUserById(reqUser: GetUserById): Promise<GetUserByIdResponse>

  getUserById(reqUser: GetUserById): Promise<GetUserByIdResponse>

  updateUserById(reqUser: UpdateUser): Promise<UpdateUserResponse>

  deleteUserById(reqUser: GetUserById): Promise<string>
}

export class UserServiceImpl implements UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async getUsers(): Promise<GetUsersResponse[]> {
    return await this.userRepository.findAll();
  }

  public async getUserById(reqUser: GetUserById): Promise<GetUserByIdResponse> {
    const user = await this.userRepository.findById(reqUser);
    if (!user) {
      throw new CustomError("User not found", "NOT_FOUND");
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


  public async updateUserById(
      reqUser: UpdateUser,
  ): Promise<UpdateUserResponse> {
    const userExist = await this.userRepository.findById(reqUser);
    if (!userExist) {
      throw new CustomError(
          "User not found",
          "NOT_FOUND",
      );
    }

    if (reqUser.body.password) {
      reqUser.body.password = await hashPassword(reqUser.body.password);
    }

    const updatedUser = await this.userRepository.update(reqUser);

    if (!updatedUser) {
      throw new CustomError(
          "Failed to update user",
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
    const userExist = await this.userRepository.findById(reqUser);
    if (!userExist) {
      throw new CustomError(
          "User not found",
          "NOT_FOUND",
      );
    }
    await this.userRepository.delete(reqUser);
    return "Delete user successfully";
  }
}
