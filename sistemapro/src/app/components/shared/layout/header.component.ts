import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../../auth/login.component';
import { RegisterComponent } from '../../auth/register.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <mat-toolbar class="header">
      <div class="container header-content">
        <!-- Logo -->
        <div class="logo">
          <a href="/">
            <span class="logo-text">AutoOffice</span>
          </a>
        </div>

        <!-- Menu -->
        <div class="nav-links">
          <a mat-button href="#beneficios">Benefícios</a>
          <a mat-button href="#planos">Planos</a>
          <a mat-button href="#depoimentos">Depoimentos</a>
          <a mat-button href="#contato">Contato</a>
        </div>

        <!-- Botões de ação -->
        <div class="action-buttons">
          <button 
            mat-flat-button 
            color="accent" 
            (click)="openLogin()">
            <mat-icon>login</mat-icon>
                Entrar
          
                </button>
          <button 
            mat-raised-button 
            color="primary"
            (click)="openRegister()"
          >
            Começar Agora
          </button>
        </div>
      </div>
    </mat-toolbar>
  `,
  styles: [`
    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      background: #fff;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 16px;
    }

    .logo a {
      text-decoration: none;
      color: inherit;
    }

    .logo-text {
      font-size: 1.5rem;
      font-weight: 500;
      color: #1976d2;
    }

    .nav-links {
      display: flex;
      gap: 8px;
    }

    .nav-links a {
      font-weight: 400;
      color: #333;
    }

    .action-buttons {
      display: flex;
      gap: 8px;
    }

    @media (max-width: 768px) {
      .nav-links {
        display: none;
      }
    }
  `]
})
export class HeaderComponent {
  constructor(private dialog: MatDialog) {}

  openLogin() {
    this.dialog.open(LoginComponent, {
      width: '400px',
      panelClass: 'login-dialog'
    });
  }

  openRegister() {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '400px',
      panelClass: 'register-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'login') {
        this.openLogin();
      }   
    });
  }
}
