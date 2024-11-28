// solution-detail-modal.component.ts
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-solution-detail-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule
  ],
  template: `
  
    <div class="modal-container">
      <!-- Header Superior -->
      <div class="modal-header" [style.borderColor]="data.color">
        <div class="header-content">
          <div class="header-main">
            <div 
              class="solution-icon"
              [style.backgroundColor]="data.color + '15'"
              [style.color]="data.color"
            >
              <mat-icon>{{data.icon}}</mat-icon>
            </div>
            <div class="header-text">
              <h2>{{data.area}}</h2>
              <p>{{data.description}}</p>
            </div>
          </div>
          <button mat-icon-button (click)="close()" class="close-button">
            <mat-icon>close</mat-icon>
          </button>
        </div>
      </div>

      <!-- Conteúdo Principal -->
      <div class="modal-content">
        <mat-tab-group [backgroundColor]="'primary'" [color]="'primary'">
          <!-- Tab de Ferramentas -->
          <mat-tab>
            <ng-template mat-tab-label>
              <mat-icon class="mr-2">build</mat-icon>
              Ferramentas
            </ng-template>
            
            <div class="tab-content">
              <div class="tools-grid">
                @for (tool of data.tools; track tool.name) {
                  <div class="tool-card" [class.coming-soon]="tool.status === 'coming-soon'">
                    <div class="tool-header">
                      <mat-icon [style.color]="data.color">{{tool.icon}}</mat-icon>
                      <div class="tool-title">
                        <h3>{{tool.name}}</h3>
                        @if (tool.status === 'coming-soon') {
                          <span class="status-badge">Em breve</span>
                        }
                      </div>
                    </div>
                    <p class="tool-description">{{tool.description}}</p>
                    <div class="tool-features">
                      <h4>Principais funcionalidades:</h4>
                      <ul>
                        <li>Funcionalidade 1</li>
                        <li>Funcionalidade 2</li>
                        <li>Funcionalidade 3</li>
                      </ul>
                    </div>
                  </div>
                }
              </div>
            </div>
          </mat-tab>

          <!-- Tab de Benefícios -->
          <mat-tab>
            <ng-template mat-tab-label>
              <mat-icon class="mr-2">star</mat-icon>
              Benefícios
            </ng-template>
            
            <div class="tab-content benefits-content">
              <div class="benefits-grid">
                <div class="benefit-card">
                  <mat-icon color="primary">schedule</mat-icon>
                  <h3>Economia de Tempo</h3>
                  <p>Automatize tarefas repetitivas e foque no que importa</p>
                </div>
                <div class="benefit-card">
                  <mat-icon color="primary">trending_up</mat-icon>
                  <h3>Aumento de Produtividade</h3>
                  <p>Processos otimizados e mais eficientes</p>
                </div>
                <div class="benefit-card">
                  <mat-icon color="primary">security</mat-icon>
                  <h3>Maior Segurança</h3>
                  <p>Dados protegidos e backups automáticos</p>
                </div>
              </div>
            </div>
          </mat-tab>
        </mat-tab-group>
      </div>

      <!-- Footer -->
      <div class="modal-footer">
        <div class="price-info">
          <span class="price-label">A partir de</span>
          <span class="price-value">R$ 99,90/mês</span>
        </div>
        <div class="action-buttons">
          <button mat-stroked-button (click)="close()">
            Fechar
          </button>
          <button 
            mat-raised-button
            [style.backgroundColor]="data.color"
            class="start-trial-btn"
            (click)="startTrial()"
          >
            Começar Trial Grátis
            <mat-icon>arrow_forward</mat-icon>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-container {
      display: flex;
      flex-direction: column;
      max-height: 90vh;
      border-radius: 16px;
      overflow: hidden;
    }

    .modal-header {
      padding: 24px;
      background: #fff;
      border-bottom: 3px solid;
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    .header-main {
      display: flex;
      gap: 20px;
      align-items: center;
    }

    .solution-icon {
      width: 56px;
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 12px;

      mat-icon {
        font-size: 32px;
        width: 32px;
        height: 32px;
      }
    }

    .header-text {
      h2 {
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 4px;
      }

      p {
        color: #666;
        font-size: 16px;
      }
    }

    .modal-content {
      flex: 1;
      overflow: auto;
    }

    .tab-content {
      padding: 24px;
    }

    .tools-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      padding: 16px;
    }

    .tool-card {
      background: #fff;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 4px 16px rgba(0,0,0,0.12);
      }

      &.coming-soon {
        opacity: 0.7;
      }
    }

    .tool-header {
      display: flex;
      gap: 16px;
      margin-bottom: 16px;

      mat-icon {
        font-size: 28px;
        width: 28px;
        height: 28px;
      }
    }

    .tool-title {
      flex: 1;

      h3 {
        font-size: 18px;
        font-weight: 500;
        margin-bottom: 4px;
      }
    }

    .status-badge {
      display: inline-block;
      padding: 4px 8px;
      background: #e3f2fd;
      color: #1976d2;
      border-radius: 12px;
      font-size: 12px;
    }

    .tool-description {
      color: #666;
      margin-bottom: 16px;
    }

    .tool-features {
      h4 {
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 8px;
      }

      ul {
        list-style: none;
        padding: 0;

        li {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 4px;
          font-size: 14px;
          color: #666;

          &:before {
            content: "•";
            color: #1976d2;
          }
        }
      }
    }

    .benefits-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 24px;
      padding: 24px;
    }

    .benefit-card {
      text-align: center;
      padding: 24px;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);

      mat-icon {
        font-size: 32px;
        width: 32px;
        height: 32px;
        margin-bottom: 16px;
      }

      h3 {
        font-size: 18px;
        font-weight: 500;
        margin-bottom: 8px;
      }

      p {
        color: #666;
      }
    }

    .modal-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 24px;
      background: #f8f9fa;
      border-top: 1px solid #eee;
    }

    .price-info {
      display: flex;
      flex-direction: column;

      .price-label {
        font-size: 12px;
        color: #666;
      }

      .price-value {
        font-size: 20px;
        font-weight: 600;
        color: #1976d2;
      }
    }

    .action-buttons {
      display: flex;
      gap: 12px;
    }

    .start-trial-btn {
      color: white;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    @media (max-width: 768px) {
      .tools-grid {
        grid-template-columns: 1fr;
      }

      .header-main {
        flex-direction: column;
        align-items: flex-start;
      }

      .modal-footer {
        flex-direction: column;
        gap: 16px;
        text-align: center;

        .action-buttons {
          width: 100%;
          justify-content: center;
        }
      }
    }
  `]
})
export default class SolutionDetailModalComponent {
  constructor(
    public dialogRef: MatDialogRef<SolutionDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close() {
    this.dialogRef.close();
  }

  startTrial() {
    this.dialogRef.close('trial');
  }
}