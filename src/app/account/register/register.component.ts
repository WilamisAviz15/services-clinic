import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'backend/src/models/user.model';
import { AccountService } from 'src/app/shared/services/account.service';
import { UtilService } from 'src/app/shared/services/util.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  user: User = new User();

  constructor(
    private accountService: AccountService,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {}
  onSubmit() {
    this.user.user_type = 'cliente';
    this.accountService
      .register(this.user)
      .subscribe((m) =>
        this.utilService.sendNotificationBySnackBar(m.message, 8000)
      );
  }

  disableSubmit(): boolean {
    if (
      this.user.username == '' ||
      this.user.password == '' ||
      this.user.fullname == '' ||
      this.user.cpf == ''
    )
      return true;
    return false;
  }
}
