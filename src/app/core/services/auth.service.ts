import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Auth, AuthResponse, User } from '../model/auth.model';
import { ApiResponse } from '../model/common.model';
import { ApiEndpoint } from '../constants/api.constants';
import { map, Observable } from 'rxjs';
import { TokenService } from './token.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedInUser = signal<User | null>(null);

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router,
  ) {}

  login(auth: Auth): Observable<ApiResponse<AuthResponse>> {
    return this.http
      .post<
        ApiResponse<AuthResponse>
      >(`${ApiEndpoint.AuthEndpoint.login}`, auth)
      .pipe(
        map((response) => {
          if (response && response.data.token) {
            this.tokenService.setToken(response.data.token);
          }
          return response;
        }),
      );
  }

  me() {
    this.http
      .get<ApiResponse<User>>(`${ApiEndpoint.AuthEndpoint.me}`)
      .subscribe({
        next: (response) => {
          this.loggedInUser.set(response.data);
        },
      });
  }

  logout() {
    this.http.get(`${ApiEndpoint.AuthEndpoint.logout}`).subscribe({
      next: (response) => {
        if (response) {
          this.tokenService.removeToken();
          this.router.navigate(['/']);
        }
      },
    });
  }
}
