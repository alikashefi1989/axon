export interface ApiResponse<DataModel> {
    config: any;
    data: DataModel;
    headers: any;
    request: any;
    status: number;
    statusText: string;
}

export interface ApiListResponse<DataModel> {
    config: any;
    data: Array<DataModel>;
    headers: any;
    request: any;
    status: number;
    statusText: string;
}