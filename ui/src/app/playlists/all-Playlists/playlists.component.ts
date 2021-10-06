import { Playlist } from './../interfaces/playlist';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlaylistsService } from '../../services/playlists.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {
  playlists: Playlist[] = [];

  constructor(
    private playlistsService: PlaylistsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.playlistsService.getAll().subscribe(data=> {
      this.playlists = data.playlists;
    })
  }

  goToNewPlaylist() {
    this.router.navigate(['new-playlist'])
  }

  goToPlaylist(playlistId: any) {
    this.router.navigate([`/playlist/${playlistId}`])
  }

}
