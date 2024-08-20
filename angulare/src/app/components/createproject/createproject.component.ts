import { Component } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { UploadService } from 'src/app/services/upload.service';
import { global } from 'src/app/services/global';


@Component({
  selector: 'app-createproject',
  templateUrl: './createproject.component.html',
  styleUrls: ['./createproject.component.css'],
  providers: [ProjectService, UploadService] 

})
export class CreateprojectComponent {
  public title: string;
  public project: Project;
  public status: string = '';
  public filesToUpload: Array<File> = [];
  public save_project: any;
  public url: string; // Explicitly specify the type of the "url" property


  constructor(private _projectService: ProjectService, private _uploadService: UploadService) {
    this.title = "Crear proyecto";
    this.project = new Project(0, '', '', '', 2024, '', '');
    this.url = global.url; // Initialize the "url" property with an empty string

  }
  onSubmit(form: any) {
    console.log(this.project);
    this._projectService.saveProject(this.project).subscribe(
      response => {
        if (response.project) {
          this.status = 'success';

          // Subir la imagen
          if (this.filesToUpload) {
          this._uploadService.makeFileRequest('http://localhost:3800/api/upload-image/' + response.project._id, [], this.filesToUpload, 'image')
            .then((result: any) => {
              this.save_project = response.project;
          this.status = 'success';
          form.reset();
            });
        }else{
          this.save_project = response.project;
          this.status = 'success';
          form.reset();
        }}
        else{
          this.status = 'failed';
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }
  fileChangeEvent(fileInput: any) {
this.filesToUpload = <Array<File>>fileInput.target.files;
}
}
