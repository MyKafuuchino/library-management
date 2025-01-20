import { UserRepository } from "../repository/user.repository";
import { CreateUser } from "../route/user/user.validator";
import { CreateUserResponse } from "../types/user.types";

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async createUser(
    reqUserBody: CreateUser["body"]
  ): Promise<CreateUserResponse> {
    const user = await this.userRepository.createUser(reqUserBody);
    const userResponse = user as CreateUserResponse;
    return userResponse;
  }
}
