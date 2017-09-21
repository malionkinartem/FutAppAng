export interface IResponse<T> extends INoDataResponse {
    data: T
}

export interface INoDataResponse {
    isSuccess: boolean,
    message: string
}
