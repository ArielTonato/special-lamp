import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { IAgency } from '../interfaces/agency.interface';
import { BaseService } from 'src/app/shared/base.service';

@Injectable({
  providedIn: 'root'
})
export class AgencyService extends BaseService<IAgency> {
  constructor() {
    super(`${environment.URL_API}/agencies`);
  }
}
