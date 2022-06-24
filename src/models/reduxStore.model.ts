import { UserEntityModel } from "./user.model";

export interface ReduxStoreModel {
    user: UserEntityModel | null;
}