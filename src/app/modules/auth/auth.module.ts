import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GeneralModule } from 'src/app/general.module';
import { LoginComponent } from './Auth/login/login.component';
import { AccountRegisterComponent } from './Auth/account-register/account-register.component';
import { AuthComponent } from './Auth/auth.component';
import { AngularMaterialModule } from '../../materialAngular.module';
import { HttpClientModule } from '@angular/common/http';
import { ProfilComponent } from 'src/app/modules/auth/Auth/profil/profil.component';


const routes = [
  {path: '', component: AuthComponent},
  {path: 'creationCompte', component: AuthComponent},
  {path: 'profil', component: ProfilComponent}
];

@NgModule({
  declarations: [
    LoginComponent,
    AccountRegisterComponent,
    AuthComponent,
    ProfilComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    GeneralModule,
    CommonModule,
    AngularMaterialModule,
    HttpClientModule
  ],
  providers: []
})
export class AuthModule { }


