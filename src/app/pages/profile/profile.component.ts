import { User } from 'backend/src/models/user.model';
import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AccountService } from 'src/app/shared/services/account.service';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  private destroy$ = new Subject<void>();
  currentUserOptions = {
    id: '',
    username: '',
    password: '',
    isAdmin: false,
  };
  user: User = new User();
  constructor(
    public accountService: AccountService,
    private profileService: ProfileService
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    const token = this.accountService.getToken();
    console.log('token:', token);
    const currentUser = window.localStorage.getItem('username');
    if (currentUser) {
      this.accountService
        .getUser(currentUser)
        .pipe(takeUntil(this.destroy$))
        .subscribe((u) => {
          this.user = u[0];
          console.log(this.user);
          this.restoreInfoMyProfile();
        });
    }
  }

  verifyToggle(event: any) {
    this.currentUserOptions.isAdmin = event.checked;
  }

  restoreInfoMyProfile(): void {
    this.currentUserOptions.id = this.user.uuid as string;
    this.currentUserOptions.username = this.user.username;
    this.currentUserOptions.password = this.user.password as string;
    this.currentUserOptions.isAdmin =
      this.user.user_type == 'administrador' ? true : false;
  }

  updateProfile() {
    this.user.username = this.currentUserOptions.username;
    this.user.password = this.currentUserOptions.password;
    this.user.user_type =
      this.currentUserOptions.isAdmin == true ? 'administrador' : 'atendente';
    this.profileService.updateProfile(this.user);
  }
  disableSubmit() {
    if (
      this.currentUserOptions.username == '' ||
      this.currentUserOptions.password == ''
    )
      return true;
    return false;
  }
}
