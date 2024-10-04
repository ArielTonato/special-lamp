import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ICanal } from '../interfaces/channel.interface';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  apiUrl = `${environment.URL_API}/channels`;
  http = inject(HttpClient);
  constructor() { }

  //Obtener los canales
  getChannels():Observable<ICanal[]> { 
    return this.http.get<ICanal[]>(this.apiUrl);
  }

  //Guardar un canal
  saveChannel(channel: ICanal):Observable<ICanal> {
    return this.http.post<ICanal>(this.apiUrl, channel);
  }

}
