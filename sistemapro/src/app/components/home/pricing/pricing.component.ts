// components/pricing.component.ts
import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Plan } from '../../../shared/interfaces/plans.interface';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatSlideToggleModule],
  template: `
    <section class="pricing">
      <div class="container">
        <h2>Escolha seu plano</h2>
        
        <div class="billing-toggle">
          <span [class.active]="!isYearly()">Mensal</span>
          <mat-slide-toggle 
            [checked]="isYearly()" 
            (change)="toggleBilling()">
          </mat-slide-toggle>
          <span [class.active]="isYearly()">Anual</span>
          <div class="discount-badge">
            Economia de 20%
          </div>
        </div>

        <div class="plans-grid">
          @for(plan of plans; track plan.id) {
            <mat-card [class.featured]="plan.isFeatured">
              @if(plan.isFeatured) {
                <div class="featured-badge">Mais Popular</div>
              }
              
              <mat-card-header>
                <mat-card-title>{{plan.name}}</mat-card-title>
                <mat-card-subtitle>
                  <div class="price">
                    <span class="currency">R$</span>
                    <span class="amount">{{isYearly() ? plan.price.yearly/12 : plan.price.monthly}}</span>
                    <span class="period">/mês</span>
                  </div>
                  @if(isYearly()) {
                    <div class="yearly-price">
                      R$ {{plan.price.yearly}} faturado anualmente
                    </div>
                  }
                </mat-card-subtitle>
              </mat-card-header>

              <mat-card-content>
                <ul class="features">
                  @for(feature of plan.features; track feature) {
                    <li>
                      <mat-icon color="primary">check</mat-icon>
                      <span>{{feature}}</span>
                    </li>
                  }
                </ul>
              </mat-card-content>

              <mat-card-actions>
                <button 
                  mat-raised-button
                  [color]="plan.isFeatured ? 'accent' : 'primary'"
                  (click)="selectPlan(plan)"
                >
                  Começar Agora
                </button>
              </mat-card-actions>
            </mat-card>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .pricing {
      padding: 80px 0;
      background: #f5f5f5;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
    }

    .billing-toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      margin: 32px 0;
      position: relative;

      .active {
        color: #1976d2;
        font-weight: 500;
      }

      .discount-badge {
        position: absolute;
        right: -100px;
        background: #4caf50;
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 0.875rem;
      }
    }

    .plans-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
      margin-top: 48px;
    }

    mat-card {
      position: relative;
      padding: 24px;

      &.featured {
        transform: scale(1.05);
        border: 2px solid #ff4081;
      }
    }

    .featured-badge {
      position: absolute;
      top: 12px;
      right: 12px;
      background: #ff4081;
      color: white;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 0.875rem;
    }

    .price {
      margin: 24px 0;
      
      .currency {
        font-size: 1.25rem;
        vertical-align: top;
      }

      .amount {
        font-size: 3.5rem;
        font-weight: 700;
      }

      .period {
        color: #666;
      }
    }

    .yearly-price {
      font-size: 0.875rem;
      color: #666;
    }

    .features {
      list-style: none;
      padding: 0;
      margin: 24px 0;

      li {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 16px;

        mat-icon {
          font-size: 20px;
          width: 20px;
          height: 20px;
        }
      }
    }

    mat-card-actions {
      padding: 16px;
      text-align: center;

      button {
        width: 100%;
        height: 48px;
      }
    }
  `]
})
export default class PricingComponent {
  isYearly = signal(false);
  plans = PLANS;

  toggleBilling() {
    this.isYearly.update(value => !value);
  }

  selectPlan(plan: Plan) {
    // Implementar navegação para checkout
  }
}