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

export type PaginatedData = {
    next_page?: number,
    has_next_page?: boolean,
} 