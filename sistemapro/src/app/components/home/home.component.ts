import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import TestimonialsComponent from './testimonials.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
    MatButtonModule,
    RouterModule,
    TestimonialsComponent
  ],
  template: `
    <!-- Hero -->
    <section class="hero">
      <div class="container">
        <h1>Automatize seu Escritório</h1>
        <p>Soluções para contabilidade, advocacia e engenharia</p>
        <div class="cta-buttons">
          <a mat-raised-button color="primary" routerLink="/register">
            Começar Agora
          </a>
          <a mat-raised-button color="accent" href="#plans">
            Ver Planos
          </a>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="features">
      <div class="container">
        <h2>Recursos</h2>
        <div class="features-grid">
          @for(feature of features; track feature.title) {
            <div class="feature-card">
              <mat-icon>{{feature.icon}}</mat-icon>
              <h3>{{feature.title}}</h3>
              <p>{{feature.description}}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <app-testimonials />
  `,
  styles: [`
    .hero {
      background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%);
      color: white;
      padding: 120px 0;
      text-align: center;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
    }
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 24px;
    }
  `]
})
export class HomeComponent {
  features = [
    {
      icon: 'speed',
      title: 'Automação',
      description: 'Automatize tarefas repetitivas'
    },
    {
      icon: 'security',
      title: 'Segurança',
      description: 'Seus dados protegidos'
    }
  ];
}