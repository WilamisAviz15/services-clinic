import { UtilService } from './../../shared/services/util.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AccountService,
  UserLogin,
} from 'src/app/shared/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private accountService: AccountService,
    private router: Router,
    private utilService: UtilService
  ) {}
  user: UserLogin = {
    username: '',
    password: '',
  };
  ngOnInit(): void {}

  onSubmit() {
    console.log(this.user);
    this.accountService.login(this.user).subscribe({
      next: (key) => {
        console.log('res:', key);
        if (key) {
          window.localStorage.setItem('authorization-token', key);
          this.accountService.getUserByToken();
          setTimeout(() => this.router.navigate(['']), 10);
        }
      },
      error: (err) => this.utilService.sendNotificationBySnackBar(err.error),
    });
  }
}
