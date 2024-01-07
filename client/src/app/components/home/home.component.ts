import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Counseling } from 'src/app/model/counseling.model ';
import { User } from 'src/app/model/user.model';
import { CounselingService } from 'src/app/services/counseling.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  counselingRes: Counseling | undefined;

  allUsers: User[] | undefined

  constructor(private fb: FormBuilder, private http: HttpClient, private userSerevice: UserService, private counselingService: CounselingService) { }

  counselingFg = this.fb.group({
    phoneNumberCtrl: ['', [Validators.minLength(11), Validators.maxLength(11), Validators.required]]
  });

  registerCounseling(): void {
    console.log(this.counselingFg.value);

    let counseling: Counseling = {
      phoneNumber: this.PhoneNumberCtrl.value
    }

    this.counselingService.counseling(counseling).subscribe({
      next: counseling => {
        console.log(counseling);
      }
    })

  }

  get PhoneNumberCtrl(): FormControl {
    return this.counselingFg.get('phoneNumberCtrl') as FormControl;
  }

  showAllUsers() {
    this.userSerevice.getAllUsers().subscribe({
        next: users => this.allUsers = users,
        error: err => console.log(err)
      });
  }
  }





