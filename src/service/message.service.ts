import { ApiListResponse } from "../models/apiRes.model";
import { MessageEntityModel } from "../models/message.model";
import { BaseService } from "./base.service";

export class MessageService extends BaseService {

    getMessageList(filter?: string): Promise<ApiListResponse<MessageEntityModel>> {
        return this.getAxiosInstance.get(`messages${filter ? `?${filter}` : ''}`);
    }

    sendMessage(msg: MessageEntityModel): Promise<ApiListResponse<MessageEntityModel>> {
        return this.getAxiosInstance.post('messages', msg);
    }
}