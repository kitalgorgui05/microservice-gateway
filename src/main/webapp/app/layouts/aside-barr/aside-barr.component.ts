import { Component, OnInit } from '@angular/core';
import { AccountService } from 'app/core/auth/account.service';
import {LoginService} from "app/core/login/login.service";

@Component({
  selector: 'jhi-aside-barr',
  templateUrl: './aside-barr.component.html',
  styleUrls: ['./aside-barr.component.scss']
})
export class AsideBarrComponent implements OnInit {
  isNavbarCollapsed = true;
  account?: Account | any
  constructor(private accountService: AccountService,private loginService: LoginService) {}

  ngOnInit(): void {
    this.accountService.identity().subscribe(
      (a) =>{
        this.account = a
      }
    );
  }
  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }
  collapseNavbar(): void {
    this.isNavbarCollapsed = true;
  }
}
