// components/home/features/automation-tools.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  benefits: string[];
  features: string[];
  status: 'available' | 'coming-soon';
  complexity: 'basic' | 'intermediate' | 'advanced';
}

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  tools: Tool[];
}

@Component({
  selector: 'app-automation-tools',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatBadgeModule
  ],
  template: `
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-4">Ferramentas de Automação</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Automatize tarefas repetitivas e aumente a produtividade do seu escritório
          </p>
        </div>

        <!-- Tabs por categoria -->
        <mat-tab-group mat-align-tabs="center" animationDuration="400ms">
          @for (category of categories; track category.id) {
            <mat-tab>
              <ng-template mat-tab-label>
                <mat-icon class="mr-2">{{category.icon}}</mat-icon>
                {{category.name}}
              </ng-template>

              <!-- Grid de ferramentas -->
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                @for (tool of category.tools; track tool.id) {
                  <mat-card class="h-full">
                    <mat-card-header>
                      <mat-icon mat-card-avatar>{{tool.icon}}</mat-icon>
                      <mat-card-title class="flex items-center gap-2">
                        {{tool.name}}
                        @if (tool.status === 'coming-soon') {
                          <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            Em breve
                          </span>
                        }
                      </mat-card-title>
                      <mat-card-subtitle>
                        <span [class]="getComplexityClass(tool.complexity)">
                          {{getComplexityLabel(tool.complexity)}}
                        </span>
                      </mat-card-subtitle>
                    </mat-card-header>

                    <mat-card-content class="mt-4">
                      <p class="text-gray-600 mb-4">{{tool.description}}</p>
                      
                      <div class="benefits mb-4">
                        <h4 class="font-medium mb-2">Benefícios:</h4>
                        <ul class="list-disc pl-5 space-y-1">
                          @for (benefit of tool.benefits; track benefit) {
                            <li class="text-sm text-gray-600">{{benefit}}</li>
                          }
                        </ul>
                      </div>

                      <div class="features">
                        <h4 class="font-medium mb-2">Recursos:</h4>
                        <ul class="space-y-2">
                          @for (feature of tool.features; track feature) {
                            <li class="flex items-center gap-2 text-sm">
                              <mat-icon class="text-green-500 text-base">check_circle</mat-icon>
                              {{feature}}
                            </li>
                          }
                        </ul>
                      </div>
                    </mat-card-content>

                    <mat-card-actions align="end">
                      @if (tool.status === 'available') {
                        <button mat-button color="primary">
                          Ver detalhes
                          <mat-icon class="ml-1">arrow_forward</mat-icon>
                        </button>
                      }
                    </mat-card-actions>
                  </mat-card>
                }
              </div>
            </mat-tab>
          }
        </mat-tab-group>
      </div>
    </section>
  `,
  styles: [`
    mat-card {
      transition: transform 0.2s ease-in-out;
    }

    mat-card:hover {
      transform: translateY(-5px);
    }

    .complexity-basic {
      color: #22c55e;
    }

    .complexity-intermediate {
      color: #f59e0b;
    }

    .complexity-advanced {
      color: #ef4444;
    }
  `]
})
export default class AutomationToolsComponent {
  categories: Category[] = [
    {
      id: 'accounting',
      name: 'Contabilidade',
      description: 'Ferramentas para escritórios contábeis',
      icon: 'account_balance',
      tools: [
        {
          id: 'tax-calculator',
          name: 'Calculadora de Impostos',
          description: 'Cálculos automáticos de IRPF, INSS, FGTS e outros impostos',
          icon: 'calculate',
          benefits: [
            'Economia de tempo em cálculos manuais',
            'Redução de erros em declarações',
            'Conformidade com a legislação'
          ],
          features: [
            'Cálculo automático de IRPF',
            'Cálculo de INSS e FGTS',
            'Geração de guias DARF',
            'Relatórios detalhados'
          ],
          status: 'available',
          complexity: 'basic'
        },
        {
          id: 'invoice-validator',
          name: 'Validador de NF-e',
          description: 'Validação e organização automática de notas fiscais',
          icon: 'receipt',
          benefits: [
            'Verificação automática de dados',
            'Organização por categoria',
            'Alertas de inconsistências'
          ],
          features: [
            'Validação XML',
            'Extração de dados',
            'Categorização automática',
            'Arquivo digital'
          ],
          status: 'available',
          complexity: 'intermediate'
        }
      ]
    },
    {
      id: 'legal',
      name: 'Jurídico',
      description: 'Ferramentas para escritórios de advocacia',
      icon: 'gavel',
      tools: [
        {
          id: 'deadline-calculator',
          name: 'Calculadora de Prazos',
          description: 'Cálculo automático de prazos processuais',
          icon: 'event',
          benefits: [
            'Controle preciso de prazos',
            'Alertas automáticos',
            'Organização processual'
          ],
          features: [
            'Cálculo de dias úteis',
            'Consideração de feriados',
            'Alertas configuráveis',
            'Calendário integrado'
          ],
          status: 'available',
          complexity: 'basic'
        },
        {
          id: 'contract-generator',
          name: 'Gerador de Contratos',
          description: 'Criação automática de contratos e documentos jurídicos',
          icon: 'description',
          benefits: [
            'Padronização de documentos',
            'Economia de tempo',
            'Redução de erros'
          ],
          features: [
            'Templates personalizáveis',
            'Campos dinâmicos',
            'Exportação em PDF',
            'Versionamento'
          ],
          status: 'available',
          complexity: 'intermediate'
        }
      ]
    },
    {
      id: 'engineering',
      name: 'Engenharia',
      description: 'Ferramentas para escritórios de engenharia',
      icon: 'engineering',
      tools: [
        {
          id: 'inss-calculator',
          name: 'Calculadora INSS Obra',
          description: 'Cálculo automático de INSS para obras',
          icon: 'domain',
          benefits: [
            'Cálculos precisos e rápidos',
            'Conformidade com normas',
            'Documentação organizada'
          ],
          features: [
            'Cálculo por tipo de obra',
            'Geração de relatórios',
            'Histórico de cálculos',
            'Exportação de dados'
          ],
          status: 'available',
          complexity: 'basic'
        },
        {
          id: 'material-calculator',
          name: 'Calculadora de Materiais',
          description: 'Cálculo automático de materiais de construção',
          icon: 'construction',
          benefits: [
            'Orçamentos precisos',
            'Redução de desperdício',
            'Controle de custos'
          ],
          features: [
            'Cálculo por área',
            'Lista de materiais',
            'Estimativa de custos',
            'Comparativo de preços'
          ],
          status: 'available',
          complexity: 'intermediate'
        }
      ]
    }
  ];

  getComplexityClass(complexity: string): string {
    return `complexity-${complexity}`;
  }

  getComplexityLabel(complexity: string): string {
    switch (complexity) {
      case 'basic':
        return 'Básico';
      case 'intermediate':
        return 'Intermediário';
      case 'advanced':
        return 'Avançado';
      default:
        return '';
    }
  }
}