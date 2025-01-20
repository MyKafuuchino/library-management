import { UserRepository } from "../repository/user.repository";
import { CreateUser } from "../route/user/user.validator";
import { CreateUserResponse } from "../types/user.types";

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async createUser(
    reqUser: CreateUser["body"]
  ): Promise<CreateUserResponse> {
    const user = await this.userRepository.createUser(reqUser);
    const userResponse: CreateUserResponse = {
      email: user.email,
      name: user.name,
      phone: user.phone,
      role: user.role,
    };
    return userResponse;
  }
}
