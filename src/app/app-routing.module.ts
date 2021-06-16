import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'ru',
    loadChildren: () => import('./main/main.module')
      .then(m => m.MainModule)
  },
  {
    path: '',
    loadChildren: () => import('./main/main.module')
      .then(m => m.MainModule)
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
