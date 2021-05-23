import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
{
  path: 'userListing',
  loadChildren: () => import('./modules/user-listing/user-listing.module').then(m => m.UserListingModule),
  data: {
    title: ''
  }
}]

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
