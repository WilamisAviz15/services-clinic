import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin, AccountService } from 'src/app/shared/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private accountService: AccountService, private router: Router) {}
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
    });
  }
}
