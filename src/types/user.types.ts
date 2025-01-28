export type UserResponse = {
    id: number;
    name: string;
    email: string;
    phone: string;
    role: string;
    isActive: boolean;
};

export type UpdateUserResponse = UserResponse;

export type GetUsersResponse = UserResponse;

export type GetUserByIdResponse = UserResponse | null;


