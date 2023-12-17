export type ApiResponse<T> = {
    success: false,
    data: null,
    message: string
} | {
    success: true,
    message: string,
    data: T,
}