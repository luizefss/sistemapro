import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule } from "@angular/router";
import FaqComponent from "./faq/faq.component";
import FeaturesComponent from "./features/features.component";
import PricingComponent from "./pricing/pricing.component";
import SolutionsComponent from "./solutions/solutions.component";
import TestimonialsComponent from "./testimonials/testimonials.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    SolutionsComponent, // Substituindo AutomationToolsComponent
    FeaturesComponent,
    PricingComponent,
    TestimonialsComponent,
    FaqComponent,
    
  ],
  template: `
  
    <app-solutions /> 
    <app-features />
    <app-pricing />
    <app-testimonials />
    <app-faq />
  `
})
export default class HomeComponent {}

