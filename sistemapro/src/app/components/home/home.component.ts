// home.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import ComparePlansComponent from './compare-plans/compare-plans.component';
import FaqComponent from './faq/faq.component';
import FeaturesComponent from './features/features.component';
import IntegrationsComponent from './integrations/integrations.component';
import PricingComponent from './pricing/pricing.component';
import SupportComponent from './support/support.component';
import TestimonialsComponent from './testimonials/testimonials.component';
import UseCasesComponent from './use-cases/use-cases.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    UseCasesComponent,
    FeaturesComponent,
    IntegrationsComponent,
    PricingComponent,
    ComparePlansComponent,
    TestimonialsComponent,
    SupportComponent,
    FaqComponent
  ],
  template: `
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <h1>Automatize seu Escritório</h1>
        <p>A plataforma completa para contabilidade, advocacia e engenharia</p>
        <div class="stats">
          <div class="stat">
            <span class="stat-value">500+</span>
            <span class="stat-label">Escritórios</span>
          </div>
          <div class="stat">
            <span class="stat-value">5k+</span>
            <span class="stat-label">Documentos/dia</span>
          </div>
          <div class="stat">
            <span class="stat-value">98%</span>
            <span class="stat-label">Satisfação</span>
          </div>
        </div>
        <div class="hero-actions">
          <a mat-raised-button color="primary" href="#compare-plans">
            Conheça os Planos
          </a>
          <a mat-stroked-button color="accent" routerLink="/register">
            Teste Grátis
          </a>
        </div>
      </div>
    </section>

    <!-- Casos de Uso por área -->
    <app-use-cases />

    <!-- Recursos/Ferramentas -->
    <app-features />

    <!-- Integrações -->
    <app-integrations />

    <!-- Preços -->
    <app-pricing id="pricing" />

    <!-- Comparativo Detalhado -->
    <app-compare-plans id="compare-plans" />

    <!-- Depoimentos -->
    <app-testimonials />

    <!-- Suporte -->
    <app-support />

    <!-- FAQ -->
    <app-faq />

    <!-- CTA Final -->
    <section class="cta">
      <div class="container">
        <h2>Pronto para começar?</h2>
        <p>Teste grátis por 7 dias, sem compromisso</p>
        <div class="cta-actions">
          <a mat-raised-button color="primary" routerLink="/register">
            Começar Agora
          </a>
          <a mat-stroked-button routerLink="/contato">
            Falar com Consultor
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [/* ... estilos anteriores ... */]
})
export default class HomeComponent {}