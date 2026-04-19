/* Copyright (c) 2026, Yao Zeran
 * 
 * The authentication related types and interfaces. */


export interface EmailLoginPayload {
  email: string;
  password: string;
}


export interface EmailRegistrationPayload {
  email: string;
  name: string;
  password: string;
  verificationCode: string;
}


export interface SentVerificationCodeResponse {
  success: boolean;
  expiresInSec: number;
}


export interface JwtToken {
  accessToken: string;
  tokenType: "Bearer";
  expiresIn: number;
  refreshToken?: string;
}


export interface AuthResponse {
  user: any;
  token: JwtToken;
}
