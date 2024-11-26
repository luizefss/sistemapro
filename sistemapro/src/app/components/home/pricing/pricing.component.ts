import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { plans } from '../../../shared/constants/plans';
import { Plan } from '../../../shared//interfaces/plans.interface';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="planos">
      <h2>Planos</h2>
      <div class="plans">
        <div *ngFor="let plan of plans" class="plan">
          <h3>{{ plan.name }}</h3>
          <p>{{ plan.price | currency }}</p>
          <!-- Outros detalhes do plano -->
        </div>
      </div>
    </section>
  `,
})
export class PricingComponent {
  plans: Plan[] = plans;
}
