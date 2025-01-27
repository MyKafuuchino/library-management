import {UserRepositoryImpl} from "../repository/userRepositoryImpl";
import {verifyPassword} from "../utils/bcrypt";
import {CustomError} from "../utils/custom_error";
import {generateToken} from "../utils/jwt";
import {
  COMMON_ERROR_CODES,
  USR_ERROR_CODES,
} from "../constant/error.constant";
import {
  UserRegisterRequest,
  UserLoginRequest,
} from "../route/auth/auth.validator";
import {UserLoginResponse, UserRegisterResponse} from "../types/auth.types";

export interface AuthService {
  login(reqUser: UserLoginRequest): Promise<UserLoginResponse>;

  register(reqUser: UserRegisterRequest): Promise<UserRegisterResponse>;
}

export class AuthServiceImpl implements AuthService {
  private userRepository: UserRepositoryImpl;

  constructor(userRepository: UserRepositoryImpl) {
    this.userRepository = userRepository;
  }

  public async login(reqLogin: UserLoginRequest): Promise<UserLoginResponse> {
    const isUserExist = await this.userRepository.findByEmail(reqLogin);
    if (!isUserExist) {
      throw new CustomError(
          "invalid email ",
          USR_ERROR_CODES.USER_NOT_FOUND,
          "FORBIDDEN"
      );
    }

    const isPasswordSame = await verifyPassword(
        isUserExist.password,
        reqLogin.body.password
    );
    console.log(isPasswordSame)

    if (isPasswordSame) {
      throw new CustomError(
          "invalid  password",
          COMMON_ERROR_CODES.PERMISSION_DENIED,
          "FORBIDDEN"
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

  public async register(
      reqRegister: UserRegisterRequest
  ): Promise<UserRegisterResponse> {
    const user = await this.userRepository.create(reqRegister);

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      role: user.role,
      isActive: user.isActive,
    };
  }
}
