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
    private tracksService: TracksService,
    private router: Router,
  ) { }
  trackFile: any;
  fileSizeLimit = 2e+7; // 5 mb in bytes
  fileSizeExceeds = false;

  ngOnInit(): void {
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
                    if(event.file?.url) {
                      this.router.navigate([`tracks/${event.id}/edit`])
                    } else {
                      console.log('File not uploaded, try again')
                    }
                  },
                err => {console.log(err)});
            }
        };
    }
  }

}
