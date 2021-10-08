import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TracksService } from 'src/app/services/tracks.service';
import _ from 'lodash'

@Component({
  selector: 'app-new-track',
  templateUrl: './new-track.component.html',
  styleUrls: ['./new-track.component.scss']
})
export class NewTrackComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private tracksService: TracksService,
    private router: Router,
  ) { }

  trackForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    cover: [''],
    file: [''],
    artist: [''],
  });
  trackFile: any;
  fileSizeLimit = 2e+7; // 5 mb in bytes
  fileSizeExceeds = false;

  ngOnInit(): void {
  }

  createTrack() {
    const name = this.trackForm.get('name')?.value
    const cover = this.trackForm.get('cover')?.value
    const file = this.trackForm.get('file')?.value
    const artist = this.trackForm.get('artist')?.value
    this.tracksService.create({name, cover, file, artist}).subscribe((response: any) => {
      this.gotToTrack(response.id)
    })
  }

  gotToTrack(id: number) {

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
                this.tracksService.uploadTrackFile({formData}).subscribe(
                  event => {
                  console.log("TCL >>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ~ file: new-track.component.ts ~ line 62 ~ NewTrackComponent ~ onFileChange ~ event", event)
                    if(event.file?.url) {
                      this.router.navigate([`tracks/${event.id}/edit`])
                    } else {
                      console.log('File not uploaded, try again')
                    }
                    // this.playlistCoverUrl = this.createImageUrl(event.playlist_cover.url)
                  },
                err => {console.log(err)});
            }
        };
    }
  }

}
