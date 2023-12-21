export type ApiResponse<T> = {
    success: false,
    data: null,
    message: string,
    status: number,
} | {
    success: true,
    message: string,
    data: T,
    status: number,
}