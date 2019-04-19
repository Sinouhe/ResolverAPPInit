import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceAuthentificationService } from 'src/app/services/service-authentification.service';
import { User } from 'src/class/user';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  private isAuthenticated = false;
  private href: string;

  constructor(private router: Router,
              private _serviceAuthentificationService: ServiceAuthentificationService,
              private _activatedRoute: ActivatedRoute) {

    /*this._activatedRoute.data.subscribe(data => {
      console.log(data['auth']);
      let oUser: User;
      oUser = new User(data['auth'].result.nom, data['auth'].result.prenom, data['auth'].result.email);
      this._serviceAuthentificationService._oUser = oUser;
      this._serviceAuthentificationService._bIsAuthenticated = true;

    });*/
  }

  ngOnInit() {
    this.href = this.router.url;
    this.isAuthenticated = this._serviceAuthentificationService.isAuthenticated();
    this._serviceAuthentificationService.oSubjectConnectionUserChange.subscribe(
                                      (data) => {
                                        this.isAuthenticated = data;
                                      }
                                    );

  }

}
