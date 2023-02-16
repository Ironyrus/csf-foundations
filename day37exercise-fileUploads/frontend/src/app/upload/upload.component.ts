import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { appService } from '../app.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit{

  @ViewChild('file') file!: ElementRef;
  uploadForm!: FormGroup;
  fileName: string = "";

  constructor(private service: appService,
              private fb: FormBuilder,
              private http: HttpClient) {}

  ngOnInit() {
      this.uploadForm = this.fb.group({
        'file-name': this.fb.control('')
        ,'file': this.fb.control('')
      })
  }

  upload() {
    this.fileName = this.uploadForm.get('file-name')?.value;

    const formData = new FormData();
    formData.set("name", this.fileName);
    formData.set("file", this.file.nativeElement.files[0]);
    
    this.service.uploadFile(formData)
        .subscribe((data) => {
          console.log(data);
        });
    console.log("upload button pressed");
  }
}
