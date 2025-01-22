import { UserRepository } from "../repository/user.repository";
import { UserLogin } from "../route/user/user.validator";
import { UserLoginResponse } from "../types/user.types";
import { verifyPassword } from "../utils/bcrypt";
import { CustomError } from "../utils/custom_error";
import { generateToken } from "../utils/jwt";
import {
  COMMON_ERROR_CODES,
  USR_ERROR_CODES,
} from "../constant/error.constant";

export class AuthService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async login(reqLogin: UserLogin): Promise<UserLoginResponse> {
    const isUserExist = await this.userRepository.findUserByEmail(reqLogin);
    if (!isUserExist) {
      throw new CustomError(
        "invalid email ",
        USR_ERROR_CODES.USER_NOT_FOUND,
        "FORBIDDEN",
      );
    }

    const isPasswordSame = await verifyPassword(
      reqLogin.body.password,
      isUserExist.password,
    );

    if (!isPasswordSame) {
      throw new CustomError(
        "invalid  password",
        COMMON_ERROR_CODES.PERMISSION_DENIED,
        "FORBIDDEN",
      );
    }

    const jwtToken = generateToken({
      id: isUserExist.id,
      role: isUserExist.role,
    });

    return {
      email: isUserExist.email,
      token: jwtToken,
    };
  }
}
