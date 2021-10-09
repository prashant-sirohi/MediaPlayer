import { Router } from '@angular/router';
import { Playlist } from './../playlists/interfaces/playlist';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Track } from '../tracks/interfaces';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  @Input() playlists: Playlist[]
  @Input() tracks: Track[]
  @Output() hide = new EventEmitter<boolean>();
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  createImageUrl(imageUrl: string) {
    return `${environment.apiBase}${imageUrl}`
  }

  goToPlaylist(playlist: Playlist) {
    this.router.navigate([`playlist/${playlist.id}`])
    this.hide.emit(true)
  }

  goToTrack(track: Track) {
    this.router.navigate([`tracks/${track.id}`])
    this.hide.emit(true)
  }

}
