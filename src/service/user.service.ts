import { ApiListResponse, ApiResponse } from "../models/apiRes.model";
import { UserEntityModel } from "../models/user.model";
import { BaseService } from "./base.service";

export class UserService extends BaseService {

    getContactList(): Promise<ApiListResponse<UserEntityModel>> {
        return this.getAxiosInstance.get('users');
    }

    getContactById(userId: string): Promise<ApiResponse<UserEntityModel>> {
        return this.getAxiosInstance.get(`users/${userId}`);
    }

    getEditProfile(user: UserEntityModel, userId: string): Promise<ApiResponse<UserEntityModel>> {
        return this.getAxiosInstance.put(`users/${userId}`, user);
    }
}