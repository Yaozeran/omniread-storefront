/* Copyright (c) 2026, Yao Zeran 
 * 
 * The api services that fetch and post auth data from the backend server. */


import { fetchJson } from "@/services/http";

import type { 
  EmailLoginPayload, EmailRegistrationPayload, SentVerificationCodeResponse, 
  AuthResponse, JwtToken } from "@/types/auth";
import type { User } from "@/types/user"

import { setToken } from "@/utils/jwt";


export async function sendEmailVerificationCode(email: string): Promise<SentVerificationCodeResponse> {
  try {
    return await fetchJson<SentVerificationCodeResponse>("/auth/email/verification-code", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    if (e instanceof Error) { throw e; }
    throw new Error("Unknown system error: unable to send email verification");
  }
}


export async function registerWithEmail(payload: EmailRegistrationPayload): Promise<User> {
  try {
    const response = await fetchJson<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.token) { setToken(response.token.accessToken, response.token.expiresIn); }
    return response.user;
  } catch (e) {
    throw e;
    // const errorMsg = e instanceof Error ? e.message : "Failed to register";
    // if (errorMsg.toLowerCase().includes("verification") || errorMsg.toLowerCase().includes("code")) {
    //   throw new Error(`Invalid verification code. Please check and try again.`);
    // }
  }
}


export async function loginWithEmail(payload: EmailLoginPayload): Promise<User> {
  try {
    const response = await fetchJson<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    // Store JWT token for future requests
    if (response.token) {
      setToken(response.token.accessToken, response.token.expiresIn);
    }
    
    return response.user;
  } catch (e) {
    throw e;
  }
}


