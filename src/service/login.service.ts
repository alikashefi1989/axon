import { ApiListResponse } from "../models/apiRes.model";
import { UserEntityModel } from "../models/user.model";
import { BaseService } from "./base.service";

export class LoginService extends BaseService {
    login(data: string): Promise<ApiListResponse<UserEntityModel>> {
        return this.getAxiosInstance.get(`users?${data}`);
    }
}