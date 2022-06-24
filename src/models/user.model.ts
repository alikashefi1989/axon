export interface UserEntityModel {
    id: string;
    name: string;
    lastName: string;
    userName: string;
    password: string;
    avatar: string;
    friends: Array<string>;
    lastActions: Array<{
        friendId: string;
        msg: string;
    }>
}