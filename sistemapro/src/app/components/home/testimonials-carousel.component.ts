// testimonials-carousel.component.ts

import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';

@Component({
  selector: 'app-testimonials-carousel',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, KeenSlider, ElementRef,],
  template: `
    <div class="testimonials">
      <h2>Depoimentos</h2>
      <div class="keen-slider" #sliderRef>
        <!-- slides -->
      </div>
    </div>
  `
})
export default class TestimonialsCarouselComponent {
  private slider: KeenSliderInstance | null = null;
  private readonly sliderRef = ViewChild('sliderRef');

  constructor() {
    // Configuração do slider
    if (this.sliderRef) {
      this.slider = new KeenSlider(this.sliderRef().nativeElement, {
        loop: true,
        slides: {
          perView: 1,
          spacing: 16
        }
      });
    }
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy();
  }
}