
export interface MessageResponse<T> {
	BASIC_NAME: string;
    status: number;
    message: string;
    path: string;
    timestamp: number;
    data: T;
    total: number;
    error: string;
}


export interface DataResponse<T> {
    totalRecord: number;
    data: T;
}