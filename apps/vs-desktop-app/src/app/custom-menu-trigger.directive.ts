import { Directive, Input } from '@angular/core';
import { MatLegacyMenuPanel as MatMenuPanel, MatLegacyMenuTrigger as MatMenuTrigger } from '@angular/material/legacy-menu';

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
