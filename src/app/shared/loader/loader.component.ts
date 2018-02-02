import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `
    <div class="loader-container" *ngIf="isLoading">
      <img src="../../../assets/images/loading.gif" />
    </div>
  `
})

export class LoaderComponent {
  @Input() isLoading: boolean = false;
}
