// faq.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

interface FaqCategory {
  name: string;
  icon: string;
  questions: {
    question: string;
    answer: string;
  }[];
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule
  ],
  template: `
    <section class="faq-section">
      <div class="container mx-auto px-4 py-16">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-4">Perguntas Frequentes</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Encontre respostas para as dúvidas mais comuns sobre nossa plataforma
          </p>
        </div>

        <!-- Categorias de FAQ -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          @for (category of faqCategories; track category.name) {
            <button
              class="category-card"
              [class.active]="selectedCategory === category.name"
              (click)="selectCategory(category.name)"
            >
              <mat-icon class="text-4xl mb-3">{{category.icon}}</mat-icon>
              <h3 class="text-lg font-semibold">{{category.name}}</h3>
            </button>
          }
        </div>

        <!-- Accordion de perguntas -->
        <div class="max-w-3xl mx-auto">
          <mat-accordion class="faq-accordion" multi>
            @for (category of faqCategories; track category.name) {
              @if (category.name === selectedCategory) {
                @for (item of category.questions; track item.question) {
                  <mat-expansion-panel class="mb-4">
                    <mat-expansion-panel-header>
                      <mat-panel-title>
                        {{item.question}}
                      </mat-panel-title>
                    </mat-expansion-panel-header>
                    <div class="py-4">
                      <p class="text-gray-700">{{item.answer}}</p>
                    </div>
                  </mat-expansion-panel>
                }
              }
            }
          </mat-accordion>
        </div>

        <!-- CTA de Suporte -->
        <div class="text-center mt-12">
          <p class="text-gray-600 mb-4">Não encontrou o que procurava?</p>
          <button mat-raised-button color="primary">
            Falar com Suporte
            <mat-icon class="ml-2">headset_mic</mat-icon>
          </button>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .faq-section {
      background: linear-gradient(to bottom, #ffffff, #f8f9fa);
    }

    .category-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      transition: all 0.3s ease;
      border: 2px solid transparent;
    }

    .category-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .category-card.active {
      border-color: #1976d2;
      background-color: #e3f2fd;
    }

    .faq-accordion {
      .mat-expansion-panel {
        border-radius: 8px;
        margin-bottom: 1rem;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05) !important;
        
        &:not(.mat-expanded) {
          &:hover {
            background-color: #fafafa;
          }
        }
      }

      .mat-expansion-panel-header {
        padding: 1.5rem;
      }
    }

    ::ng-deep {
      .mat-expansion-panel-body {
        padding: 0 24px 24px !important;
      }
    }
  `]
})
export default class FaqComponent {
  selectedCategory = 'Geral';

  faqCategories: FaqCategory[] = [
    {
      name: 'Geral',
      icon: 'help_outline',
      questions: [
        {
          question: 'Como funciona o período de teste?',
          answer: 'Oferecemos 7 dias de teste gratuito em todos os planos. Durante este período, você terá acesso a todas as funcionalidades do plano escolhido, sem compromisso.'
        },
        {
          question: 'Preciso instalar algum software?',
          answer: 'Não, nossa plataforma é 100% baseada em nuvem. Você só precisa de um navegador e conexão com internet para acessar todas as funcionalidades.'
        },
        {
          question: 'Posso cancelar a qualquer momento?',
          answer: 'Sim, você pode cancelar sua assinatura a qualquer momento sem multa ou taxas adicionais. O serviço ficará disponível até o final do período pago.'
        }
      ]
    },
    {
      name: 'Funcionalidades',
      icon: 'settings',
      questions: [
        {
          question: 'Quais integrações estão disponíveis?',
          answer: 'Oferecemos integração com os principais sistemas do mercado, incluindo QuickBooks, Projuris, Sienge e outros. A disponibilidade varia conforme o plano escolhido.'
        },
        {
          question: 'Como funciona o suporte técnico?',
          answer: 'O suporte técnico está disponível por email em todos os planos. Planos Professional e Enterprise contam com suporte via chat e telefone em horário comercial.'
        },
        {
          question: 'É possível personalizar os relatórios?',
          answer: 'Sim, todos os relatórios podem ser personalizados de acordo com suas necessidades. Nos planos Professional e Enterprise, você também pode criar modelos personalizados.'
        }
      ]
    },
    {
      name: 'Segurança',
      icon: 'security',
      questions: [
        {
          question: 'Como os dados são protegidos?',
          answer: 'Utilizamos criptografia de ponta a ponta e seguimos as melhores práticas de segurança. Nossos servidores são certificados e realizamos backups diários.'
        },
        {
          question: 'Onde os dados são armazenados?',
          answer: 'Todos os dados são armazenados em servidores no Brasil, seguindo a LGPD e outras regulamentações de proteção de dados.'
        },
        {
          question: 'Como funciona o backup dos dados?',
          answer: 'Realizamos backups automáticos diários e mantemos múltiplas cópias em diferentes localizações para garantir a segurança dos seus dados.'
        }
      ]
    }
  ];

  selectCategory(category: string) {
    this.selectedCategory = category;
  }
}