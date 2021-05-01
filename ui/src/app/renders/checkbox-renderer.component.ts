import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'checkbox-renderer',
  template: `
    <input
      type="checkbox"
      (click)="checkedHandler($event)"
      [checked]="params.value"
    />
`,
})
export class CheckboxRenderer implements ICellRendererAngularComp, OnDestroy {
  params: any;

  agInit(params: any): void {
    this.params = params;
  }

  ngOnDestroy(): void {

  }

  refresh(params: any) {
    return true;
  }

  checkedHandler(event: MouseEvent) {
      let checked = (<HTMLInputElement>event.target)?.checked;
      let colId = this.params.column.colId;
      this.params.node.setDataValue(colId, checked);
  }
}
