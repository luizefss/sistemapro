import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="contato">
      <h2>Perguntas Frequentes</h2>
      <!-- Conteúdo do FAQ -->
    </section>
  `,
})
export class FaqComponent {}
