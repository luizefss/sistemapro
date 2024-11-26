import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/shared/layout/footer.component';
import { HeaderComponent } from './components/shared/layout/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <app-header />
    <main>
      <router-outlet />
    </main>
    <app-integrations />
        <app-support />
    <app-footer />

  `,
  styles: [`
    main {
      min-height: calc(100vh - 128px);
      padding-top: 64px;
    }
  `]
})
export class AppComponent {}