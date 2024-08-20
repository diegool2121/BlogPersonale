import { Component } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { global } from 'src/app/services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [ProjectService]
})
export class DetailComponent {
  public url: string;
  public project: Project;
  public confirm: boolean = false;

constructor(
  private _projectService: ProjectService, 
  private _route: ActivatedRoute, 
  private _router: Router
) { 
  this.url = global.url; 
  this.project = new Project(0, '', '', '', 2024, '', '');
  this.confirm = false;

  
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
  deleteProject(id: number) { // Define el tipo de id como string
    this._projectService.deleteProject(id).subscribe(
      response => {
        if (response.project) {
          this._router.navigate(['/proyectos']);
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  setConfirm(confirm: boolean) {
    this.confirm = confirm;
  }

}
