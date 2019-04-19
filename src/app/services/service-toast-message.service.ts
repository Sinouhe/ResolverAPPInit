import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import $ from 'jquery';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ServiceToastMessageService {

  private _subject: Subject<any>;

  constructor() {
    this._subject = new Subject();
  }

  get subject(): Subject<any> {
    return this._subject;
  }

  public afficheMessage(p_stype: string, p_sMessage: string): void {
    this._subject.next(p_sMessage);
    switch (p_stype) {
      case environment.alert: {
        this.toastAffiche(environment.alert);
      break;
      }
      case environment.info: {
        this.toastAffiche(environment.info);
         break;
      }
      case environment.valid: {
        this.toastAffiche(environment.valid);
        break;
     }
      default: {
        this.toastAffiche(environment.unknow);
        break;
      }
    }
  }

  private toastAffiche(p_stype: string): void {
    const element = $(`#toast${p_stype}`);
    element.fadeTo(1000, 0.8, () => {
      setTimeout(function() {
        element.fadeTo(1000, 0);
      }, 5000);
    });
  }

}
