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
    playlistCover: [''],
    description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(240)]],
  });

  fileSizeLimit = 5242880; // 5 mb in bytes
  fileSizeExceeds = false;
  fileLabel: string = '';
  loading = false;

  ngOnInit(): void {
  }

  createPlaylist() {
    const name = this.playlistForm.get('name')?.value
    const description = this.playlistForm.get('description')?.value
    const playlistCover = this.playlistForm.get('playlistCover')?.value
    this.playlistsService.create({name, description, playlistCover}).subscribe((response: any) => {
      this.goToPlaylist(response.id)
    })
  }

  goToPlaylist(playlistId: any) {
    this.router.navigate([`/playlist/${playlistId}`])
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    const formData: FormData = new FormData();

    if (event.target.files && event.target.files.length) {
        const [file] = event.target.files;
        reader.readAsDataURL(file);
        reader.onload = () => {
            if (file.size > this.fileSizeLimit) {
                this.fileSizeExceeds = true;
                // this.notificationService.show('File chosen is invalid!, max 2mb allowed.');
                return;
            } else {
                formData.append('playlistCover', file, file.name);
                console.log("TCL >>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ~ file: new-playlist.component.ts ~ line 60 ~ NewPlaylistComponent ~ onFileChange ~ formData", reader.result)
                this.loading = true;
                this.fileSizeExceeds = false;
                // this.uploadPlaylistCover(formData);
                this.playlistForm.controls['playlistCover'].setValue(formData.get('playlistCover'))
                // this.playlistForm.controls['playlistCover'].setValue(reader.result) //TDDO: investigate if this works
                console.log("TCL >>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ~ file: new-playlist.component.ts ~ line 65 ~ NewPlaylistComponent ~ onFileChange ~ this.playlistForm", this.playlistForm.get('playlistCover')?.value)
            }
        };
    }
  }

  uploadPlaylistCover(data: FormData) {
    this.playlistsService.uploadPlaylistCover(data).subscribe((res: any) => {
      this.loading = false;
      // this.playlistForm.controls['playlistCover'].setValue(this.getUserAvatar(res));
      this.fileLabel = res;
    });
  }

}
