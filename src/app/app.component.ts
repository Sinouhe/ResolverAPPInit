import { Component, OnInit } from '@angular/core';
import { ServiceAuthentificationService } from 'src/app/services/service-authentification.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public title: String = 'Welcome to refonteCompteAppWeb!'; 

  constructor(private _activatedRoute: ActivatedRoute) { }

  ngOnInit() { }
}
