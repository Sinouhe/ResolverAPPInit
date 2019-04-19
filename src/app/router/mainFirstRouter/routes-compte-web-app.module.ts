import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { AuthResolverService } from 'src/app/services/auth-resolver.service';
import { GarageComponent } from 'src/app/testResolver/garage/garage.component';
import { GarageResolverService } from 'src/app/testResolver/garage/garage-resolver.service';

const routes = [
  {path: 'account', loadChildren: '../../modules/auth/auth.module#AuthModule'/*, resolve: { auth: GarageResolverService }*/},
  {path: 'testResolve', component: GarageComponent, resolve: { cars: GarageResolverService }},
  {path: '', redirectTo: '/account', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthResolverService]
})
export class RoutesCompteWebAppModule { }
