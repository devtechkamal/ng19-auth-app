import { Injectable, signal } from '@angular/core';
import { constants } from '../constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  isAuthentication = signal<boolean>(false);

  constructor() {
    const token = this.getToken();
    if (token) {
      this.updateToken(true);
    }
  }

  updateToken(status: boolean) {
    this.isAuthentication.set(status);
  }

  getToken(): string | null {
    return sessionStorage.getItem(constants.CURRENT_TOKEN) || null;
  }

  setToken(token: string) {
    sessionStorage.setItem(constants.CURRENT_TOKEN, token);
    this.updateToken(true);
  }

  removeToken() {
    sessionStorage.removeItem(constants.CURRENT_TOKEN);
    this.updateToken(false);
  }
}
