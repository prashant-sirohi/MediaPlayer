import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../services/sideNav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private sideNavService: NavigationService) { }

  ngOnInit(): void {
  }

  toggleSideNav() {
    this.sideNavService.setShowNav(true);
  }

}
