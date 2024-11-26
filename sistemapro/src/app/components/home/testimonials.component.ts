// app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  }
];

// components/home/testimonials/testimonials.component.ts
import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { interval, Subscription } from 'rxjs';

interface Testimonial {
  id: number;
  area: string;
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
  tools: string[];
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatDividerModule
  ],
  template: `
    <section class="testimonials-section">
      <div class="container mx-auto px-4">
        <h2 class="text-center text-3xl font-bold mb-4">O que nossos clientes dizem</h2>
        <p class="text-center text-gray-600 mb-8">
          Profissionais que transformaram seus escritórios com nossas soluções
        </p>

        <div class="carousel-container" [@slideAnimation]="currentSlide">
          <button mat-icon-button class="nav-button prev" (click)="prevSlide()">
            <mat-icon>chevron_left</mat-icon>
          </button>

          <mat-card class="testimonial-card">
            <mat-card-header>
              <img mat-card-avatar [src]="currentTestimonial.image" [alt]="currentTestimonial.name">
              <mat-card-title>{{currentTestimonial.name}}</mat-card-title>
              <mat-card-subtitle>
                {{currentTestimonial.role}} - {{currentTestimonial.company}}
              </mat-card-subtitle>
            </mat-card-header>

            <mat-card-content>
              <div class="rating mb-4">
                <mat-icon *ngFor="let star of [1,2,3,4,5]" color="accent">star</mat-icon>
              </div>
              <p class="quote">
                "{{currentTestimonial.quote}}"
              </p>
              <mat-divider class="my-4"></mat-divider>
              <p class="tools-title">Ferramentas utilizadas:</p>
              <mat-chip-set>
                <mat-chip *ngFor="let tool of currentTestimonial.tools">
                  {{tool}}
                </mat-chip>
              </mat-chip-set>
            </mat-card-content>
          </mat-card>

          <button mat-icon-button class="nav-button next" (click)="nextSlide()">
            <mat-icon>chevron_right</mat-icon>
          </button>
        </div>

        <div class="indicators flex justify-center gap-2 mt-6">
          <button mat-mini-fab
                  *ngFor="let _ of testimonials; let i = index"
                  [color]="currentSlide === i ? 'primary' : ''"
                  (click)="goToSlide(i)">
          </button>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .testimonials-section {
      padding: 4rem 0;
      background-color: #f5f5f5;
    }

    .carousel-container {
      position: relative;
      max-width: 800px;
      margin: 0 auto;
      padding: 0 48px;
    }

    .testimonial-card {
      margin: 1rem auto;
      max-width: 600px;
    }

    .nav-button {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }

    .prev { left: 0; }
    .next { right: 0; }

    .quote {
      font-style: italic;
      font-size: 1.1rem;
      line-height: 1.6;
      color: rgba(0, 0, 0, 0.87);
    }

    .tools-title {
      font-weight: 500;
      margin-bottom: 0.5rem;
    }
  `],
  animations: [
    trigger('slideAnimation', [
      transition('* => *', [
        style({ transform: 'translateX(-100%)' }),
        animate('500ms ease-out')
      ])
    ])
  ]
})
export class TestimonialsComponent implements OnInit, OnDestroy {
  testimonials: Testimonial[] = [
    {
      id: 1,
      area: 'Engenharia',
      name: 'Eng. Carlos Silva',
      role: 'Diretor de Projetos',
      company: 'CS Engenharia',
      image: 'assets/images/avatars/engineer.jpg',
      quote: 'A calculadora de INSS de obra automatizou nosso processo completamente. Economizamos horas de trabalho manual por semana.',
      tools: ['Calculadora INSS', 'Gestão de Projetos']
    },
    {
      id: 2,
      area: 'Contabilidade',
      name: 'Maria Santos',
      role: 'Contadora Chefe',
      company: 'Contábil Express',
      image: 'assets/images/avatars/accountant.jpg',
      quote: 'As ferramentas de automação revolucionaram nossa forma de trabalhar. O suporte é excepcional.',
      tools: ['Automação Fiscal', 'Relatórios Automáticos']
    },
    {
      id: 3,
      area: 'Direito',
      name: 'Dr. André Mendes',
      role: 'Advogado',
      company: 'Mendes Advocacia',
      image: 'assets/images/avatars/lawyer.jpg',
      quote: 'O sistema simplificou muito nossa gestão de processos e prazos. Recomendo fortemente.',
      tools: ['Gestão de Processos', 'Controle de Prazos']
    }
  ];

  currentSlide = 0;
  private autoPlaySubscription?: Subscription;

  get currentTestimonial(): Testimonial {
    return this.testimonials[this.currentSlide];
  }

  ngOnInit() {
    this.startAutoPlay();
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  private startAutoPlay() {
    this.autoPlaySubscription = interval(5000).subscribe(() => {
      this.nextSlide();
    });
  }

  private stopAutoPlay() {
    if (this.autoPlaySubscription) {
      this.autoPlaySubscription.unsubscribe();
    }
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.testimonials.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.testimonials.length) % this.testimonials.length;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }
}

// components/home/home.component.ts
import { TestimonialsComponent } from './testimonials/testimonials.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    TestimonialsComponent
  ],
  template: `
    <main>
      <app-testimonials></app-testimonials>
      <!-- Outras seções serão adicionadas aqui -->
    </main>
  `
})
export class HomeComponent {}