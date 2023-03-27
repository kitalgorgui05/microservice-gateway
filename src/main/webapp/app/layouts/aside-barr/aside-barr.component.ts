import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-aside-barr',
  templateUrl: './aside-barr.component.html',
  styleUrls: ['./aside-barr.component.scss']
})
export class AsideBarrComponent implements OnInit {
  isNavbarCollapsed = true;
  constructor() { }

  ngOnInit(): void {
  }
  collapseNavbar(): void {
    this.isNavbarCollapsed = true;
  }
}
