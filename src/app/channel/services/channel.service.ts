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

  //Obtener un canal por ID
  getChannelById(id: number):Observable<ICanal> {
    return this.http.get<ICanal>(`${this.apiUrl}/${id}`);
  }

  //Guardar un canal
  saveChannel(channel: ICanal):Observable<ICanal> {
    return this.http.post<ICanal>(this.apiUrl, channel);
  }

  //Actualizar un canal
  updateChannel(channel: ICanal):Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${channel._id}`, channel);
  }

  //Eliminar un canal
  deleteChannel(id: number):Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
