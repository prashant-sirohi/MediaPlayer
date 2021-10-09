import { Playlist } from './../interfaces/playlist';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlaylistsService } from '../../services/playlists.service';
import { environment } from 'src/environments/environment';

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
  defaultPlaylistUrl = '../../../assets/default_track_cover.jpeg';

  ngOnInit(): void {
    this.playlistsService.getAll().subscribe((data: any)=> {
      this.playlists = data;
    })
  }

  goToNewPlaylist() {
    this.router.navigate(['new-playlist'])
  }

  goToPlaylist(playlistId: any) {
    this.router.navigate([`/playlist/${playlistId}`])
  }

  createImageUrl(imageUrl: string) {
    return `${environment.apiBase}${imageUrl}`
  }

}
