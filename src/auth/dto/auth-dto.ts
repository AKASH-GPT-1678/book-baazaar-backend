// register-response.dto.ts
export class RegisterResponseDto {
    name: string;
    id: string;
    email: string;
    success: boolean;
    message: string;
    address : string
  }
  export class LoginUserDto {
    email: string;
    password: string;
  }
  