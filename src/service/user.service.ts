import {UserRepositoryImpl} from "../repository/user.repository";
import {FindUserById, UpdateUser} from "../route/user/user.validator";
import {
  GetUserByIdResponse,
  GetUsersResponse,
  UpdateUserResponse,
} from "../types/user.types";
import {hashPassword} from "../utils/bcrypt";
import {CustomError} from "../utils/custom_error";
import {LoanRepository} from "../repository/loan.repository";

export interface UserService {
  getUsers(): Promise<GetUsersResponse[]>

  getUserById(reqUser: FindUserById): Promise<GetUserByIdResponse>

  getUserById(reqUser: FindUserById): Promise<GetUserByIdResponse>

  updateUserById(reqUser: UpdateUser): Promise<UpdateUserResponse>

  deleteUserById(reqUser: FindUserById): Promise<string>
}

export class UserServiceImpl implements UserService {
  private userRepository: UserRepositoryImpl;
  private loanRepository: LoanRepository;

  constructor(userRepository: UserRepositoryImpl, loanRepository: LoanRepository) {
    this.userRepository = userRepository;
    this.loanRepository = loanRepository;
  }

  public async findLoanByUserId(reqUser: FindUserById): Promise<any> {
    return this.loanRepository.findByUserId(reqUser);
  }

  public async getUsers(): Promise<GetUsersResponse[]> {
    return await this.userRepository.findAll();
  }

  public async getUserById(reqUser: FindUserById): Promise<GetUserByIdResponse> {
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

  public async deleteUserById(reqUser: FindUserById): Promise<string> {
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
