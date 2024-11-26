// home.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import ComparePlansComponent from './compare-plans/compare-plans.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [

    
    CommonModule,
    RouterModule,
    MatButtonModule,
    ComparePlansComponent,
    
 
  ],
  template: `
   <app-compare-plans />


  `,
  styles: [/* ... estilos anteriores ... */]
})
export default class HomeComponent {}