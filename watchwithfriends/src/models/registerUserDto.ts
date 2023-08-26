import { Dayjs } from "dayjs";

export interface RegisterUserDto {
    name: string;
    email: string;
    password: string;
    birthDate: string;
}