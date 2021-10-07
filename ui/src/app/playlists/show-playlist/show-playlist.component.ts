import { Playlist } from './../interfaces/playlist';
import { Component, OnInit } from '@angular/core';
import { PlaylistsService } from 'src/app/services/playlists.service';

@Component({
  selector: 'app-show-playlist',
  templateUrl: './show-playlist.component.html',
  styleUrls: ['./show-playlist.component.scss']
})
export class ShowPlaylistComponent implements OnInit {

  constructor(
    private playlistsService: PlaylistsService,
  ) { }

  playlist: Playlist;

  ngOnInit(): void {
    this.playlistsService.getOne(32).subscribe(res => {
      console.log("TCL >>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ~ file: show-playlist.component.ts ~ line 20 ~ ShowPlaylistComponent ~ this.playlistsService.getOne ~ res", res)
      this.playlist = res;
    })
  }

}
