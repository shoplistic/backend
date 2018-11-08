import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProfileService } from '../_services/profile.service';
import { UserData, PasswordReset } from '../_classes/user-data';
import { InfoBarService } from '../_services/info-bar.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @ViewChild('deleteModal') deleteModal: ElementRef;

  userData = new UserData('', 0);
  regDate = '';

  passwordReset = new PasswordReset('', '', '');
  submitted = false;

  constructor(private _profileService: ProfileService, private _infobarService: InfoBarService) { }

  ngOnInit() {

    this._profileService.get().subscribe(
      res => {
        this.userData = res;
        this.regDate = new Date(res.registerDate).toLocaleString();
      },
      err => {
        console.error(err);
      }
    );

  }

  prSubmit() {

    this.submitted = true;

    this._profileService.resetPassword(this.passwordReset).subscribe(
      res => {
        this._infobarService.show('Password updated', 3000);
        // this.passwordReset = new PasswordReset('', '', '');
        // this.submitted = false;
      },
      err => {
        this._infobarService.show('Invalid password', 3000);
        this.passwordReset.old_password = '';
        this.submitted = false;
      }
    );

  }

  deleteProfileSubmit() {
    // TODO:
  }

  toggleDeleteModal() {
    this.deleteModal.nativeElement.classList.toggle('show');
  }

}
