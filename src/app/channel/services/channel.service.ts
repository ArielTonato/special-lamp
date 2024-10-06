import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { ICanal } from '../interfaces/channel.interface';
import { BaseService } from 'src/app/shared/base.service';

@Injectable({
  providedIn: 'root'
})
export class ChannelService extends BaseService<ICanal> {
  constructor() {
    super(`${environment.URL_API}/channels`);
  }
}
