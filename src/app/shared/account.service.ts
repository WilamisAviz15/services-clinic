import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface UserLogin {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  login(user: UserLogin): Observable<any> {
    const req = {
      user: user,
    };
    return this.http.post(`${environment.api}/`, req).pipe(take(1));
  }

  getToken(): string {
    const tokenLocalStorage = window.localStorage.getItem(
      'authorization-token'
    );
    let token: string = '';
    if (tokenLocalStorage) {
      token = tokenLocalStorage;
    }
    return token;
  }

  getUserByToken(): void {
    this.http
      .post<string>(`${environment.api}/parseTokenToUsername`, {
        token: this.getToken(),
      })
      .pipe(take(1))
      .subscribe((u) => window.localStorage.setItem('username', u));
  }

  logout() {
    window.localStorage.clear();
  }
}
