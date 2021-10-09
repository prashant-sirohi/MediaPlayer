import { Playlist } from './../playlists/interfaces/playlist';
import { SearchService } from './../services/search.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavigationService } from '../services/sideNav.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Track } from '../tracks/interfaces';
import _ from 'lodash'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private sideNavService: NavigationService,
    private fb: FormBuilder,
    private searchService: SearchService) { }

  searchForm: FormGroup = this.fb.group({
    query: [],
  });
  minQueryLength = 3;
  playlistsFound: Playlist[] = [];
  tracksFound: Track[] = [];

  ngOnInit(): void {
    this.searchForm.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(data => {
        if (data.query.length >= this.minQueryLength) {
          this.searchService.search(data.query).subscribe(res => {
            const { tracks, playlists } = res;
            this.tracksFound = [].concat(tracks)
            this.playlistsFound = [].concat(playlists)
          })
        }
      });
  }

  toggleSideNav() {
    this.sideNavService.setShowNav(true);
  }

  onHide(event) {
    if (event) {
      this.playlistsFound = []
      this.tracksFound = []
    }
  }

}
