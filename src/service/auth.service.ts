import { UserRepository } from "../repository/user.repository";
import { verifyPassword } from "../utils/bcrypt";
import { CustomError } from "../utils/custom_error";
import { generateToken } from "../utils/jwt";
import {
  UserRegisterRequest,
  UserLoginRequest,
} from "../route/auth/auth.validator";
import { UserLoginResponse, UserRegisterResponse } from "../types/auth.types";

export interface AuthService {
  login(reqUser: UserLoginRequest): Promise<UserLoginResponse>;

  register(reqUser: UserRegisterRequest): Promise<UserRegisterResponse>;
}

export class AuthServiceImpl implements AuthService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async login(reqLogin: UserLoginRequest): Promise<UserLoginResponse> {
    const isUserExist = await this.userRepository.findByEmail(reqLogin);
    if (!isUserExist) {
      throw new CustomError("invalid email or password", "FORBIDDEN");
    }

    const isPasswordSame = await verifyPassword(
      isUserExist.password,
      reqLogin.body.password
    );
    console.log(isPasswordSame);

    if (isPasswordSame) {
      throw new CustomError("invalid username or password", "FORBIDDEN");
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
