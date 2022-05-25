export interface PaginatedQuery {
    page?: number;
    limit?: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    page: number;
    limit: number;
}