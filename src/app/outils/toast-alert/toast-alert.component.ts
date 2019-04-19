import { Component, OnInit } from '@angular/core';
import { ServiceToastMessageService } from 'src/app/services/service-toast-message.service';

@Component({
  selector: 'app-toast-alert',
  templateUrl: './toast-alert.component.html',
  styleUrls: ['./toast-alert.component.css']
})
export class ToastAlertComponent implements OnInit {

  private _texte: string;

  constructor(private _serviceToastMessageService: ServiceToastMessageService) { }

  ngOnInit() {
    this._serviceToastMessageService.subject.subscribe(
                                                    (data) => {
                                                      this._texte = data;
                                                    },
                                                    (error) => {
                                                      console.log(error);
                                                    });
  }

}
