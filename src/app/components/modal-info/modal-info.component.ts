import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { ProdutosService } from 'src/app/services/produtos.service';

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.scss'],
})
export class ModalInfoComponent implements OnInit {

  @Input() id: number;

  public produtor = [{}];

  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private produtosService: ProdutosService
  ) { }

  ngOnInit() {
    this.produtosService.getInfoProdutor(this.navParams.get('id')).subscribe(
      (res)=>{
        this.produtor = res.media[0];
      }
    ) 
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
