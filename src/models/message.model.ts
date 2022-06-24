export interface MessageEntityModel {
    id: string;
    pairId: string;
    datetime: number;
    body: string;
    from: string;
    to: string;
    isModified: boolean;
    repliedOn?: MessageEntityModel
}