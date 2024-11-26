// features.component.ts
import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

interface Feature {
  icon: string;
  title: string;
  description: string;
  category: 'contabilidade' | 'direito' | 'engenharia';
}

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  template: `
    <section class="features">
      <div class="container">
        <h2>Nossas Ferramentas</h2>
        <div class="category-filter">
          @for(category of categories; track category) {
            <button 
              class="filter-btn" 
              [class.active]="selectedCategory() === category"
              (click)="selectedCategory.set(category)"
            >
              {{getCategoryName(category)}}
            </button>
          }
        </div>

        <div class="features-grid">
          @for(feature of filteredFeatures(); track feature.title) {
            <mat-card>
              <mat-icon [fontIcon]="feature.icon"></mat-icon>
              <h3>{{feature.title}}</h3>
              <p>{{feature.description}}</p>
            </mat-card>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .features {
      padding: 80px 0;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
    }

    .category-filter {
      display: flex;
      justify-content: center;
      gap: 16px;
      margin-bottom: 48px;
    }

    .filter-btn {
      padding: 8px 16px;
      border: none;
      background: none;
      cursor: pointer;
      border-radius: 20px;
      transition: all 0.3s;

      &.active {
        background: #1976d2;
        color: white;
      }
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
    }

    mat-card {
      padding: 24px;
      text-align: center;

      mat-icon {
        font-size: 48px;
        height: 48px;
        width: 48px;
        margin-bottom: 16px;
        color: #1976d2;
      }

      h3 {
        margin-bottom: 12px;
        font-size: 1.25rem;
      }

      p {
        color: #666;
        line-height: 1.6;
      }
    }
  `]
})
export default class FeaturesComponent {
  private features: Feature[] = [
    {
      icon: 'calculate',
      title: 'Calculadora INSS Obra',
      description: 'Cálculo automático com base nas novas regras',
      category: 'engenharia'
    },
    {
      icon: 'description',
      title: 'Automação IRPF',
      description: 'Importação e processamento automático de notas',
      category: 'contabilidade'
    },
    {
      icon: 'gavel',
      title: 'Gerador de Contratos',
      description: 'Modelos personalizáveis e atualizados',
      category: 'direito'
    }
  ];

  categories = ['all', 'contabilidade', 'direito', 'engenharia'] as const;
  selectedCategory = signal<(typeof this.categories)[number]>('all');

  getCategoryName(category: string): string {
    const names = {
      all: 'Todas',
      contabilidade: 'Contabilidade',
      direito: 'Direito',
      engenharia: 'Engenharia'
    };
    return names[category as keyof typeof names];
  }

  filteredFeatures = computed(() => {
    if (this.selectedCategory() === 'all') {
      return this.features;
    }
    return this.features.filter(f => f.category === this.selectedCategory());
  });
}