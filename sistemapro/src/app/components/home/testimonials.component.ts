import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

interface Testimonial {
  id: number;
  author: string;
  role: string;
  company: string;
  text: string;
  image?: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  template: `
    <section class="testimonials">
      <h2>Depoimentos</h2>
      <div class="testimonials-grid">
        @for(testimonial of testimonials; track testimonial.id) {
          <mat-card>
            <mat-card-content>
              <div class="author-info">
                @if(testimonial.image) {
                  <img [src]="testimonial.image" [alt]="testimonial.author">
                }
                <div class="author-details">
                  <h3>{{testimonial.author}}</h3>
                  <p>{{testimonial.role}} - {{testimonial.company}}</p>
                </div>
              </div>
              <p class="quote">"{{testimonial.text}}"</p>
            </mat-card-content>
          </mat-card>
        }
      </div>
    </section>
  `,
  styles: [`
    .testimonials {
      padding: 64px 24px;
      background: #f5f5f5;
    }
    .testimonials-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .author-info {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 16px;
    }
    .author-info img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      object-fit: cover;
    }
    .quote {
      font-style: italic;
      color: #666;
      line-height: 1.6;
    }
  `]
})
export default class TestimonialsComponent {
  testimonials: Testimonial[] = [
    {
      id: 1,
      author: 'João Silva',
      role: 'Diretor',
      company: 'Contabilidade Silva',
      text: 'Automatizamos todo nosso processo de folha de pagamento.',
      image: 'assets/avatar1.jpg'
    },
    {
      id: 2,
      author: 'Maria Santos',
      role: 'Advogada',
      company: 'Santos Advocacia',
      text: 'Reduzimos em 70% o tempo gasto com processos.',
      image: 'assets/avatar2.jpg'
    }
  ];
}