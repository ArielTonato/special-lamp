import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

export abstract class BaseService<T> {
  protected http = inject(HttpClient);

  constructor(private apiUrl: string) {}

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.apiUrl);
  }

  getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${id}`);
  }

  add(item: T): Observable<T> {
    return this.http.post<T>(this.apiUrl, item);
  }

  update(item: T, idField: string = '_id'): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${(item as any)[idField]}`, item);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
