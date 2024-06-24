import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MaterialModule } from '../material/material.module';
import { ToastComponent } from './toast/toast.component';



@NgModule({
  declarations: [
    NavBarComponent,
    ToastComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[
    NavBarComponent,
    ToastComponent
  ]
})
export class SharedModule { }
