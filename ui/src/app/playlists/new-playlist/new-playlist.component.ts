import { NotificationService } from './../../services/notification.service';
import { PlaylistsService } from './../../services/playlists.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-playlist',
  templateUrl: './new-playlist.component.html',
  styleUrls: ['./new-playlist.component.scss']
})
export class NewPlaylistComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private playlistsService: PlaylistsService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  playlistForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(240)]],
  });

  ngOnInit(): void {
  }

  createPlaylist() {
    const isValid = !this.playlistForm.invalid
    if(isValid) {
      const name = this.playlistForm.get('name')?.value
      const description = this.playlistForm.get('description')?.value
      this.playlistsService.create({name, description, playlist_cover: ''}).subscribe((response: any) => {
        this.goToPlaylist(response.id)
      }) 
    } else {
      this.notificationService.show('Cannot save as form has errors')
    }
  }

  goToPlaylist(playlistId: any) {
    this.router.navigate([`/playlist/${playlistId}`])
  }

}
