import { Component } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  @ViewChild('audioPlayer') audioPlayer!: ElementRef;
  public title: string;
  public subtitle: string;
  public email: string;


  constructor() { 
    this.title = "Diego Logroño - Ingeniero en Software ";
    this.subtitle = "Desarrollador Web";
    this.email = "diego_oswld@hotmail.com";
  }
  ngOnInit() {

  }
ngAfterViewInit() {
  // Accede al elemento de audio y establece su tiempo actual en el minuto 2 (120 segundos)
  this.audioPlayer.nativeElement.currentTime = 0;
  // Establece el volumen del audio al 50%
  this.audioPlayer.nativeElement.volume = 0.1;
  // Inicia la reproducción del audio
  this.audioPlayer.nativeElement.play();
}
}