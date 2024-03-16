import { UserServiceMock } from "test/UserServiceMock";
import { User } from "user";
const user = new User(new UserServiceMock());
user.login("wildananugrah", "p@ssw0rd");
