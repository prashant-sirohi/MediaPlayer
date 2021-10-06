import { PlaylistsService } from './../../services/playlists.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  ) { }

  playlistForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    // userAvatar: [''],
    description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(240)]],
});

  ngOnInit(): void {
  }

  createPlaylist() {
    const name = this.playlistForm.get('name')?.value
    const desc = this.playlistForm.get('description')?.value
    this.playlistsService.create({name, description: desc}).subscribe((response: any) => {
      this.goToPlaylist(response.id)
    })
  }

  goToPlaylist(playlistId: any) {
    this.router.navigate([`/playlist/${playlistId}`])
  }

}
