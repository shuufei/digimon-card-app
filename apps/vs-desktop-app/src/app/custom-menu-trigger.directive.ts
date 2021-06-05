import { Directive, Input } from '@angular/core';
import { MatMenuPanel, MatMenuTrigger } from '@angular/material/menu';

@Directive({
  selector: `[digimonCardAppMenuTrigger]`,
  exportAs: 'digimonCardAppMenuTrigger',
})
export class CustomMenueTriggerDirective extends MatMenuTrigger {
  _handleClick(): void {
    return;
  }

  @Input('digimonCardAppMenuTrigger')
  get menu() {
    return super.menu;
  }
  set menu(menu: MatMenuPanel) {
    super.menu = menu;
  }
}
