import { Component, OnInit } from '@angular/core';

interface UserLogin {
  mail: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor() {}
  user: UserLogin = {
    mail: '',
    password: '',
  };
  ngOnInit(): void {}

  onSubmit() {}
}
