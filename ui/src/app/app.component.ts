import { SideNavDirection } from './common/enums/sideNavDirection';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

export interface SideNavItem {
  id: number;
  name: string;
  url: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Media Player';
  navDirection = SideNavDirection.Left;
  navItems: SideNavItem[] = [];

  constructor(
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    this.navItems = [
      {
        id: 1,
        name: 'Tracks',
        url: 'tracks'
      },
      {
        id: 2,
        name: 'Playlists',
        url: 'home'
      }
    ]
  }

  navigate(navItem: SideNavItem) {
    this.router.navigate([`${navItem.url}`])
  }
}
