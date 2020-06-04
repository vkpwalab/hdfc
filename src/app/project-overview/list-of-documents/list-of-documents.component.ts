import { Component, OnInit, Input } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { SharedService } from 'src/app/services/shared.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-list-of-documents',
  templateUrl: './list-of-documents.component.html',
  styleUrls: ['./list-of-documents.component.css']
})
export class ListOfDocumentsComponent implements OnInit {
  fileEntry: boolean = false
  @Input() project_id: any;
  token: string;
  constructor(private shared:SharedService, private http:HttpClient) {

  }

  ngOnInit() {
    this.token = 'MH3NPYK34J0KHDI';
  }

  public files: NgxFileDropEntry[] = [];


  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        this.fileEntry= true;
        fileEntry.file((file: File) => {
         
          // Here you can access the real file
          console.log(droppedFile.relativePath, file);
          // $("#progress1").show();
         
          /**
          // You could upload it like this:
          const formData = new FormData()
          formData.append('logo', file, relativePath)
 
          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })
 
          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          .subscribe(data => {
            // Sanitized logo returned from backend
          })
          **/
            
        });
      }
      else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
        this.fileEntry= false;

        // $("#progress1").hide();
        
      }
    }
  }


}
