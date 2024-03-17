export class UserRequestDto {
  username: string;
  password: string;
}

export class RefreshTokenDto {
  token: string;
  expired: number;
}
