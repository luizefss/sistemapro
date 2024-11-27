// src/app/components/home/solutions/solutions.component.ts
import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import SolutionDetailsModalComponent from './solution-details-modal/solution-details-modal.component';

interface Solution {
  area: string;
  icon: string;
  color: string;
  description: string;
  tools: {
    name: string;
    description: string;
    icon: string;
    status: 'available' | 'coming-soon';
  }[];
}

@Component({
  selector: 'app-solutions',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    RouterModule,
    MatDialogModule,
  ],
  template: `
    <section class="solutions-section py-20">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16" @fadeIn>
          <h2 class="text-4xl font-bold mb-4">Soluções Especializadas</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Ferramentas desenvolvidas especificamente para cada área de atuação
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          @for (solution of solutions; track solution.area) {
            <mat-card 
              class="solution-card"
              [style.border-left]="'4px solid ' + solution.color"
              @cardAnimation
            >
              <mat-card-header>
                <div 
                  mat-card-avatar 
                  class="solution-icon"
                  [style.background-color]="solution.color + '20'"
                  [style.color]="solution.color"
                >
                  <mat-icon>{{solution.icon}}</mat-icon>
                </div>
                <mat-card-title class="text-xl mb-2">{{solution.area}}</mat-card-title>
                <mat-card-subtitle>{{solution.description}}</mat-card-subtitle>
              </mat-card-header>

              <mat-card-content>
                <div class="tools-grid mt-6">
                  @for (tool of solution.tools; track tool.name) {
                    <div 
                      class="tool-item p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all"
                      [matTooltip]="tool.description"
                      @toolAnimation
                    >
                      <div class="flex items-start gap-3">
                        <mat-icon [style.color]="solution.color">{{tool.icon}}</mat-icon>
                        <div>
                          <h4 class="font-medium">{{tool.name}}</h4>
                          <p class="text-sm text-gray-600">{{tool.description}}</p>
                        </div>
                        @if (tool.status === 'coming-soon') {
                          <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full ml-auto">
                            Em breve
                          </span>
                        }
                      </div>
                    </div>
                  }
                </div>
              </mat-card-content>

              <mat-card-actions align="end">
                <button 
                  mat-button 
                  [style.color]="solution.color"
                  (click)="showDetails(solution)" 
                  
                  >
                  Ver mais detalhes
                  <mat-icon class="ml-1">arrow_forward</mat-icon>
                </button>
              </mat-card-actions>
            </mat-card>
          }
        </div>

        <!-- Integrações -->
        <div class="text-center mt-16" @fadeIn>
          <h3 class="text-2xl font-bold mb-4">Integrado com os principais sistemas do mercado</h3>
          <div class="flex justify-center flex-wrap gap-8 mt-8">
            <!-- Logos dos sistemas integrados -->
            <img src="assets/logos/sistema1.png" alt="Sistema 1" class="h-8 grayscale hover:grayscale-0 transition-all">
            <!-- Adicionar mais logos -->
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .solutions-section {
      background: linear-gradient(to bottom, #ffffff, #f8f9fa);
    }

    .solution-card {
      height: 100%;
      transition: all 0.3s ease;
    }

    .solution-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 24px rgba(0,0,0,0.12);
    }

    .solution-icon {
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 12px;

      mat-icon {
        font-size: 24px;
        width: 24px;
        height: 24px;
      }
    }

    .tools-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
    }

    .tool-item {
      cursor: pointer;
      transition: all 0.2s ease;
    }
  `],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('cardAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('800ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('toolAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-20px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export default class SolutionsComponent {
  solutions: Solution[] = [
    {
      area: 'Contabilidade',
      icon: 'account_balance',
      color: '#2196F3',
      description: 'Automação e gestão completa para escritórios contábeis',
      tools: [
        {
          name: 'Automação Fiscal',
          description: 'Gestão automática de obrigações fiscais e declarações',
          icon: 'receipt_long',
          status: 'available'
        },
        {
          name: 'Folha de Pagamento',
          description: 'Cálculos automáticos e gestão de folha',
          icon: 'groups',
          status: 'available'
        },
        {
          name: 'Contabilidade Digital',
          description: 'Integração com sistemas e bancos',
          icon: 'cloud_sync',
          status: 'available'
        },
        {
          name: 'IA Contábil',
          description: 'Análise inteligente de documentos e lançamentos',
          icon: 'psychology',
          status: 'coming-soon'
        }
      ]
    },
    {
      area: 'Advocacia',
      icon: 'gavel',
      color: '#4CAF50',
      description: 'Soluções completas para escritórios de advocacia',
      tools: [
        {
          name: 'Gestão Processual',
          description: 'Controle completo de processos e prazos',
          icon: 'work',
          status: 'available'
        },
        {
          name: 'Automação de Documentos',
          description: 'Geração automática de peças e contratos',
          icon: 'description',
          status: 'available'
        },
        {
          name: 'Agenda Jurídica',
          description: 'Controle de compromissos e prazos',
          icon: 'event',
          status: 'available'
        },
        {
          name: 'Análise Jurisprudencial IA',
          description: 'Pesquisa inteligente de jurisprudência',
          icon: 'psychology',
          status: 'coming-soon'
        }
      ]
    },
    {
      area: 'Engenharia Civil',
      icon: 'engineering',
      color: '#FF5722',
      description: 'Ferramentas especializadas para projetos e obras',
      tools: [
        {
          name: 'Gestão de Obras',
          description: 'Controle completo de projetos e execução',
          icon: 'construction',
          status: 'available'
        },
        {
          name: 'Calculadoras Técnicas',
          description: 'Conjunto de calculadoras especializadas',
          icon: 'calculate',
          status: 'available'
        },
        {
          name: 'Orçamentos',
          description: 'Orçamentos detalhados e precisos',
          icon: 'attach_money',
          status: 'available'
        },
        {
          name: 'BIM Integration',
          description: 'Integração com sistemas BIM',
          icon: 'view_in_ar',
          status: 'coming-soon'
        }
      ]
    },
    {
      area: 'Escritórios em Geral',
      icon: 'business',
      color: '#673AB7',
      description: 'Soluções administrativas para qualquer escritório',
      tools: [
        {
          name: 'Gestão Financeira',
          description: 'Controle financeiro completo',
          icon: 'account_balance_wallet',
          status: 'available'
        },
        {
          name: 'CRM',
          description: 'Gestão de relacionamento com clientes',
          icon: 'people',
          status: 'available'
        },
        {
          name: 'Documentos',
          description: 'Gestão documental inteligente',
          icon: 'folder',
          status: 'available'
        },
        {
          name: 'Automação de Marketing',
          description: 'Marketing digital automatizado',
          icon: 'campaign',
          status: 'coming-soon'
        }
      ]
    }
  ];
   constructor(private dialog: MatDialog) {}

  // Adicione a função showDetails
  showDetails(solution: Solution) {
    const dialogRef = this.dialog.open(SolutionDetailsModalComponent, {
      data: {
        ...solution,
        toolDetails: this.getToolDetails(solution.area)
      },
      width: '90%',
      maxWidth: '1200px',
      panelClass: 'solution-details-modal'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'trial') {
        // Implementar navegação para signup
      }
    });
  }

  // Adicione a função getToolDetails
  getToolDetails(area: string): any[] {
    switch(area) {
      case 'Contabilidade':
        return [
          {
            name: 'Automação Fiscal',
            icon: 'receipt_long',
            description: 'Gestão completa de obrigações fiscais',
            features: [
              'Geração automática de guias',
              'Cálculo de impostos',
              'Validação de notas fiscais',
              'Relatórios fiscais',
              'Gestão de certidões'
            ],
            benefits: [
              'Economia de tempo',
              'Redução de erros',
              'Conformidade fiscal',
              'Alertas automáticos'
            ],
            screenshots: ['/assets/screenshots/fiscal1.jpg'],
            integrations: ['SPED', 'eSocial', 'NFe', 'ERP']
          },
          // Adicione mais ferramentas contábeis
        ];
      
      case 'Advocacia':
        return [
          {
            name: 'Gestão Processual',
            icon: 'gavel',
            description: 'Controle completo de processos e prazos',
            features: [
              'Acompanhamento processual',
              'Gestão de prazos',
              'Controle de documentos',
              'Alertas automáticos',
              'Relatórios gerenciais'
            ],
            benefits: [
              'Organização processual',
              'Cumprimento de prazos',
              'Gestão eficiente',
              'Produtividade aumentada'
            ],
            screenshots: ['/assets/screenshots/juridico1.jpg'],
            integrations: ['PJe', 'e-SAJ', 'Projudi']
          },
          // Adicione mais ferramentas jurídicas
        ];

      case 'Engenharia Civil':
        return [
          {
            name: 'Gestão de Obras',
            icon: 'construction',
            description: 'Controle completo de projetos e obras',
            features: [
              'Cronograma de obras',
              'Gestão de equipes',
              'Controle de custos',
              'Medições',
              'Diário de obra'
            ],
            benefits: [
              'Controle total da obra',
              'Redução de custos',
              'Aumento de produtividade',
              'Documentação organizada'
            ],
            screenshots: ['/assets/screenshots/obras1.jpg'],
            integrations: ['MS Project', 'AutoCAD', 'Revit']
          },
          // Adicione mais ferramentas de engenharia
        ];

      case 'Escritórios em Geral':
        return [
          {
            name: 'Gestão Financeira',
            icon: 'account_balance_wallet',
            description: 'Controle financeiro completo',
            features: [
              'Contas a pagar/receber',
              'Fluxo de caixa',
              'Conciliação bancária',
              'Relatórios gerenciais',
              'DRE automático'
            ],
            benefits: [
              'Controle financeiro',
              'Redução de inadimplência',
              'Previsibilidade',
              'Decisões informadas'
            ],
            screenshots: ['/assets/screenshots/financeiro1.jpg'],
            integrations: ['Bancos', 'ERP', 'Sistemas contábeis']
          },
          // Adicione mais ferramentas administrativas
        ];

      default:
        return [];
    }
  }

}
