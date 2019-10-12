import { NgModule } from "@angular/core";
import { ModalInfoComponent } from './modal-info/modal-info.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { VendasDetalhesComponent } from './vendas-detalhes/vendas-detalhes.component';
import { FinalizarVendaModalComponent } from './finalizar-venda-modal/finalizar-venda-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    entryComponents:[ModalInfoComponent, VendasDetalhesComponent, FinalizarVendaModalComponent],
    declarations: [ModalInfoComponent, VendasDetalhesComponent, FinalizarVendaModalComponent],
    imports:[
        CommonModule,
        IonicModule,
        FormsModule,
        ReactiveFormsModule 
    ],
    exports: [CommonModule,IonicModule,ModalInfoComponent, VendasDetalhesComponent, FinalizarVendaModalComponent]
})

export class SharedModule {};