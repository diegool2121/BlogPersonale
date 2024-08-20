import { Component } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { global } from 'src/app/services/global';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'], 
  providers: [ProjectService]

})
export class ProjectsComponent {
  public projects: Project[] = [];
  public url: string;

  constructor(private _projectService: ProjectService){
    this.url = global.url; // Initialize the "url" property with an empty string
  }
  ngOnInit(){
    this.getProjects();
  }
  getProjects(){
    this._projectService.getProjects().subscribe(
      response => {
        if(response.projects){
          this.projects = response.projects;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }
  
}
