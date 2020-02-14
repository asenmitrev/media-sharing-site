import { User } from "..//entities/user.entity";

export class UserDTO implements Readonly<UserDTO> {
    username: string;
    password: string;
    email?: string;

    public toEntity() {
        const user = new User();
        user.username = this.username;
        user.createDateTime = new Date();
        return user;
    }
}