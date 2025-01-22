import { UserRepository } from "../repository/user.repository";
import { UserLogin } from "../route/user/user.validator";
import { UserLoginResponse } from "../types/user.types";
import { verifyPassword } from "../utils/bcrypt";
import { CustomError } from "../utils/custom_error";

export class AuthService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async login(reqLogin: UserLogin): Promise<UserLoginResponse> {
    const isUserExist = await this.userRepository.findUserByEmail(reqLogin);
    if (!isUserExist) {
      throw new CustomError("invalid email ", "ACCESS_DENIED", 403);
    }

    const isPasswordSame = await verifyPassword(
      reqLogin.body.password,
      isUserExist.password
    );

    if (!isPasswordSame) {
      throw new CustomError("invalid  password", "ACCESS_DENIED", 403);
    }

    const userLoginResponse: UserLoginResponse = {
      email: isUserExist.email,
      token: "BLELELEL",
    };

    return userLoginResponse;
  }
}
