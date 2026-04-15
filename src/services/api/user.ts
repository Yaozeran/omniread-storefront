/* Copyright (c) 2026, Yao Zeran 
 * 
 * The api services that fetch user data from the backend server. */


import { User } from "@/types/user";

import { fetchJson } from "@/services/http";


export async function fetchUserById(userId: number | string) {
  return fetchJson<User>(`/users/${userId}`);
}


