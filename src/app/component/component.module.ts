import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ComponentsRoutes } from './component.routing';
import { CercaPipe } from '../pipes/cerca.pipe';

import { LlistaRegUsuarisComponent } from './llista-reg-usuaris/llista-reg-usuaris.component';
import { EditarComponent } from './editar/editar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [
    LlistaRegUsuarisComponent,
    EditarComponent,
    CercaPipe,
  ],
  providers:[ ],
  exports: [CercaPipe]
})
export class ComponentsModule {}
