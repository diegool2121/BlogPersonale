import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { global } from 'src/app/services/global';
import { UploadService } from 'src/app/services/upload.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: '../createproject/createproject.component.html',
  styleUrls: ['./edit.component.css'], 
  providers: [ProjectService, UploadService]  
})
export class EditComponent implements OnInit {
  public title: string;
  public save_project: any; // Explicitly specify the type of the "save_project" property
  public status: string = ''; // Initialize the "status" property
  public project!: Project; // Asumiendo que estás seguro de que project será inicializado antes de ser utilizado.
  public url: string; // Explicitly specify the type of the "url" property
  public filesToUpload: Array<File> = []; // Initialize the "filesToUpload" property as an empty array

  constructor( 
    private _projectService: ProjectService, 
    private _uploadService: UploadService, 
    private _route: ActivatedRoute, 
    private _router: Router
    ){
    this.title = "Editar proyecto";
    this.url = global.url; // Initialize the "url" property with an empty string
   }
    
   ngOnInit() {
    this._route.params.subscribe(params => {
      let id = params["id"]; 
      this.getProject(id);
    });
  }
  
    getProject(id: string) { // Define el tipo de id como string
      this._projectService.getProject(id).subscribe(
        response => {
          this.project = response.project;
        },
        error => {
          console.log(error);
        }
      );
    }
    onSubmit(form: any) {
      this._projectService.updateProject(this.project).subscribe(
        response => {
          if (response.project) {
            // Subir la imagen
            if (this.filesToUpload) {
              this._uploadService. makeFileRequest(this.url + 'upload-image/' + response.project._id, [], this.save_project, 'image')
              .then((result: any) => {
                this.save_project = result.project;
                this.status = 'success';
              });
            }else{
              this.save_project = response.project;
              this.status = 'success';
            }
          } else {
            this.status = 'failed';
          }
        },
        error => {
          console.log(error);
        }
      );
    }
    fileChangeEvent(fileInput: any) {
      this.save_project = <Array<File>>fileInput.target.files;
    }

}
