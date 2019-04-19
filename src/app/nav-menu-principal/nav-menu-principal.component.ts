import { Component, OnInit } from '@angular/core';
import { ServiceAuthentificationService } from 'src/app/services/service-authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu-principal',
  templateUrl: './nav-menu-principal.component.html',
  styleUrls: ['./nav-menu-principal.component.css']
})
export class NavMenuPrincipalComponent implements OnInit {

  private isAuthenticated: boolean;

  constructor(private _serviceAuthentificationService: ServiceAuthentificationService,
              private _router: Router) { }

  ngOnInit() {
    this._serviceAuthentificationService.oSubjectConnectionUserChange.subscribe(
      (data) => {
        this.isAuthenticated = data;
      }
    );
  }

  public deconnection() {
    this._serviceAuthentificationService.deconnectUser();
    this._router.navigate(['']);
  }

}
