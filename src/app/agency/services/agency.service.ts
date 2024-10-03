import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { IAgency } from '../interfaces/agency.interface';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {
  apiUrl = `${environment.URL_API}/agencies`;
  http = inject(HttpClient);
  constructor() { }

  //Obtener las agencias

  getAgencies():Observable<IAgency[]>{
    return this.http.get<IAgency[]>(this.apiUrl);
  }

  getAgencyById(id: number):Observable<IAgency>{
    return this.http.get<IAgency>(`${this.apiUrl}/${id}`);
  }

  //Agregar una agencia
  addAgency(agency: IAgency):Observable<IAgency>{
    return this.http.post<IAgency>(this.apiUrl, agency);
  }

  //Actualizar una agencia
  updateAgency(agency: IAgency):Observable<void>{
    return this.http.put<void>(`${this.apiUrl}/${agency._id}`, agency);
  }

  //Eliminar una agencia
  deleteAgency(id: number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
