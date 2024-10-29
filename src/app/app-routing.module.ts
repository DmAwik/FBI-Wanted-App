import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartPageComponent } from './modules/start-page/start-page.component';
import { AuthGuard } from './shared/guards/auth-guard';

const routes: Routes = [
  { path: '', component: StartPageComponent },
  {
    path: 'fbi-wanted',
    loadChildren: () =>
      import('./modules/fbi-wanted-page/fbi-wanted-page.module').then(
        (module) => module.FbiWantedPageModule,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./modules/settings-page/settings-page.module').then(
        (module) => module.SettingsPageModule,
      ),
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
