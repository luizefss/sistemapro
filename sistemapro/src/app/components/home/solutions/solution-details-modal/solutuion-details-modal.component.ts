// src/app/components/home/solutions/solution-details-modal/solution-details-modal.component.ts
import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

interface ToolDetail {
  name: string;
  description: string;
  icon: string;
  features: string[];
  benefits: string[];
  screenshots: string[];
  integrations: string[];
}

@Component({
  selector: 'app-solution-details-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="modal-container">
      <!-- Header -->
      <div class="modal-header" [style.background-color]="data.color + '10'">
        <div class="flex items-center gap-4">
          <mat-icon [style.color]="data.color">{{data.icon}}</mat-icon>
          <div>
            <h2 class="text-2xl font-bold">{{data.area}}</h2>
            <p class="text-gray-600">{{data.description}}</p>
          </div>
        </div>
      </div>

      <!-- Carousel -->
      <div class="carousel-container">
        <button 
          mat-icon-button 
          class="nav-button prev" 
          (click)="prevTool()"
          [disabled]="currentIndex === 0"
        >
          <mat-icon>chevron_left</mat-icon>
        </button>

        <div class="carousel-content" #carouselContent>
          <div 
            class="tool-details"
            *ngFor="let tool of data.toolDetails; let i = index"
            [class.active]="i === currentIndex"
            [@slideAnimation]="i === currentIndex ? 'active' : 'inactive'"
          >
            <div class="tool-header mb-6">
              <mat-icon [style.color]="data.color">{{tool.icon}}</mat-icon>
              <h3 class="text-xl font-bold">{{tool.name}}</h3>
              <p class="text-gray-600">{{tool.description}}</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Funcionalidades -->
              <div class="feature-section">
                <h4 class="font-medium mb-3 flex items-center gap-2">
                  <mat-icon class="text-blue-500">extension</mat-icon>
                  Funcionalidades
                </h4>
                <ul class="space-y-2">
                  @for (feature of tool.features; track feature) {
                    <li class="flex items-center gap-2">
                      <mat-icon class="text-green-500 text-sm">check_circle</mat-icon>
                      {{feature}}
                    </li>
                  }
                </ul>
              </div>

              <!-- Benefícios -->
              <div class="benefits-section">
                <h4 class="font-medium mb-3 flex items-center gap-2">
                  <mat-icon class="text-purple-500">stars</mat-icon>
                  Benefícios
                </h4>
                <ul class="space-y-2">
                  @for (benefit of tool.benefits; track benefit) {
                    <li class="flex items-center gap-2">
                      <mat-icon class="text-blue-500 text-sm">trending_up</mat-icon>
                      {{benefit}}
                    </li>
                  }
                </ul>
              </div>
            </div>

            <!-- Screenshots -->
            <div class="screenshots-section mt-6">
              <h4 class="font-medium mb-3">Prévia da Ferramenta</h4>
              <div class="screenshot-grid">
                @for (screenshot of tool.screenshots; track screenshot) {
                  <img 
                    [src]="screenshot" 
                    alt="Screenshot" 
                    class="rounded-lg shadow-lg"
                  >
                }
              </div>
            </div>

            <!-- Integrações -->
            @if (tool.integrations.length > 0) {
              <div class="integrations-section mt-6">
                <h4 class="font-medium mb-3">Integrações Disponíveis</h4>
                <div class="flex flex-wrap gap-2">
                  @for (integration of tool.integrations; track integration) {
                    <span class="px-3 py-1 bg-gray-100 rounded-full text-sm">
                      {{integration}}
                    </span>
                  }
                </div>
              </div>
            }
          </div>
        </div>

        <button 
          mat-icon-button 
          class="nav-button next" 
          (click)="nextTool()"
          [disabled]="currentIndex === data.toolDetails.length - 1"
        >
          <mat-icon>chevron_right</mat-icon>
        </button>
      </div>

      <!-- Progress Indicator -->
      <div class="progress-indicators flex justify-center gap-2 mt-6">
        @for (tool of data.toolDetails; track tool; let i = $index) {
          <button 
            class="w-2 h-2 rounded-full transition-all"
            [class.bg-gray-300]="i !== currentIndex"
            [style.background-color]="i === currentIndex ? data.color : ''"
            (click)="goToTool(i)"
          ></button>
        }
      </div>

      <!-- Actions -->
      <div class="modal-actions mt-6 flex justify-between items-center">
        <button mat-button (click)="close()">Fechar</button>
        <button 
          mat-raised-button 
          [style.background-color]="data.color"
          class="text-white"
          (click)="startTrial()"
        >
          Começar Trial Grátis
          <mat-icon class="ml-2">arrow_forward</mat-icon>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .modal-container {
      max-width: 800px;
      padding: 0;
    }

    .modal-header {
      padding: 24px;
      border-radius: 8px 8px 0 0;
    }

    .carousel-container {
      position: relative;
      padding: 24px;
      overflow: hidden;
    }

    .carousel-content {
      min-height: 400px;
    }

    .tool-details {
      display: none;
      &.active {
        display: block;
      }
    }

    .nav-button {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 10;
      
      &.prev { left: 0; }
      &.next { right: 0; }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }

    .screenshot-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      
      img {
        width: 100%;
        aspect-ratio: 16/9;
        object-fit: cover;
      }
    }

    .modal-actions {
      padding: 16px 24px;
      background: #f8f9fa;
      border-radius: 0 0 8px 8px;
    }
  `],
  animations: [
    trigger('slideAnimation', [
      transition('void => active', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-out', style({ transform: 'translateX(0)' }))
      ]),
      transition('active => void', [
        animate('300ms ease-out', style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})
export default class SolutionDetailsModalComponent {
  currentIndex = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SolutionDetailsModalComponent>
  ) {}

  prevTool() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  nextTool() {
    if (this.currentIndex < this.data.toolDetails.length - 1) {
      this.currentIndex++;
    }
  }

  goToTool(index: number) {
    this.currentIndex = index;
  }

  startTrial() {
    // Implementar navegação para signup
    this.dialogRef.close('trial');
  }

  close() {
    this.dialogRef.close();
  }
}