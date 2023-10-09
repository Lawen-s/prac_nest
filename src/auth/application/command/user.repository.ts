import { User } from "../../infrastructure/entity/user.entity";

export interface UserRepository {
  findByName:(username: string) => Promise<User>;
  save: (uesr: User) => Promise<void>;
}