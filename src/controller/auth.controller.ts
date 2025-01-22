import { UserLogin } from "../route/user/user.validator";
import { AuthService } from "../service/auth.service";
import { HttpNextFunction, HttpRequest, HttpResponse } from "../utils/http";
import { NewResponseSuccess } from "../utils/http_response";

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  public login = async (
    req: HttpRequest,
    res: HttpResponse,
    next: HttpNextFunction
  ): Promise<void> => {
    try {
      const reqUserLogin: UserLogin = {
        body: req.body,
      };
      const userLoginResponse = await this.authService.login(reqUserLogin);
      res
        .status(200)
        .json(NewResponseSuccess("user login successfully", userLoginResponse));
    } catch (error) {
      next(error);
    }
  };
}
