import { SuccessResponse } from '../../types/response.type';

export function buildSuccessResponse<T>(message: string, data: T): SuccessResponse<T> {
    return {
        success: true,
        message,
        data,
        error: {}
    };
}