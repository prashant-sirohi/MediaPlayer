import { AllTracksDialogComponent } from './../../tracks/all-tracks-dialog/all-tracks-dialog.component';
import { Playlist } from './../interfaces/playlist';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PlaylistsService } from 'src/app/services/playlists.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-show-playlist',
  templateUrl: './show-playlist.component.html',
  styleUrls: ['./show-playlist.component.scss']
})
export class ShowPlaylistComponent implements OnInit {

  constructor(
    private playlistsService: PlaylistsService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  playlist: Playlist;
  id: number;
  @ViewChild('playlistCover') private playlistCover;
  playlistCoverUrl: string;

  fileSizeLimit = 5242880; // 5 mb in bytes
  fileSizeExceeds = false;
  fileLabel: string = '';
  loading = false;
  defaultPlaylistUrl = '../../../assets/default_track_cover.jpeg';

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params.id
      this.playlistsService.getOne(this.id).subscribe(res => {
        this.playlist = res;
        this.playlistCoverUrl = this.createImageUrl(res.playlist_cover.url)
      })
    })
  }

  createImageUrl(imageUrl: string) {
    return `${environment.apiBase}${imageUrl}`
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    let formData: FormData = new FormData();

    if (event.target.files && event.target.files.length) {
        const file = event.target.files[0];
        reader.readAsDataURL(file);
        reader.onload = () => {
            if (file.size > this.fileSizeLimit) {
                this.fileSizeExceeds = true;
                return;
            } else {
                formData.append('file', file, file.name);
                this.playlistsService.uploadPlaylistCover({formData, id: this.id}).subscribe(
                  event => {
                    this.playlistCoverUrl = this.createImageUrl(event.playlist_cover.url)
                  },
                err => {console.log(err)});
            }
        };
    }
  }

  openTracksDialog(){
      const dialogRef = this.dialog.open(AllTracksDialogComponent, {
        data: {}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.playlistsService.addTracksToPlaylist({tracks: result, playlistId: this.playlist.id}).subscribe(res => {
          this.playlist = res
        })
      });
  }
}
