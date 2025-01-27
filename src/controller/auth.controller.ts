import {HTTP_STATUSES} from "../constant/http_status.constant";
import {
  UserLoginRequest,
  UserRegisterRequest,
} from "../route/auth/auth.validator";
import {HttpNextFunction, HttpRequest, HttpResponse} from "../utils/http";
import {NewResponseSuccess} from "../utils/http_response";
import {AuthService} from "../service/authServiceImpl";

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  public login = async (
      req: HttpRequest,
      res: HttpResponse,
      next: HttpNextFunction,
  ): Promise<void> => {
    try {
      const reqUserLogin: UserLoginRequest = {
        body: req.body,
      };
      const userLoginResponse = await this.authService.login(reqUserLogin);
      res
          .status(HTTP_STATUSES.OK)
          .json(NewResponseSuccess("user login successfully", userLoginResponse));
    } catch (error) {
      next(error);
    }
  };

  public register = async (
      req: HttpRequest,
      res: HttpResponse,
      next: HttpNextFunction,
  ): Promise<void> => {
    try {
      const userRegisterReq: UserRegisterRequest = {
        body: req.body,
      };
      const userRegisterResponse = await this.authService.register(userRegisterReq);
      res
          .status(HTTP_STATUSES.CREATED)
          .json(NewResponseSuccess("User created successfully", userRegisterResponse));
    } catch (error) {
      next(error);
    }
  };
}
