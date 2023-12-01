import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent  {
  user: User | null | undefined;
  constructor(private accountService: AccountService) {
    
   this.accountService.currentUser$.subscribe({
      next: response => this.user = response
    })
  }
  

  Logout(): void {
    this.accountService.LogoutUser();
  }
}
