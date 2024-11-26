import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="container">
        <p>&copy; {{ currentYear }} AutoOffice. Todos os direitos reservados.</p>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: #f5f5f5;
      padding: 16px 0;
      text-align: center;
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
