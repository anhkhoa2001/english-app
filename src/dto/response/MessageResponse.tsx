
interface MessageResponse<T> {
	BASIC_NAME: string;
    status: number;
    message: string;
    path: string;
    timestamp: number;
    data: T;
    total: number;
}


export default MessageResponse;