import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estado, Municipio } from './brasilapi.models';

@Injectable({
  providedIn: 'root'
})
export class BrasilAPIService {
 baseURL: string = 'https://brasilapi.com.br/api'

  constructor(private http: HttpClient) { }

  //retornando estado da API
    listarUFs(): Observable<Estado[]> {
      const path = '/ibge/uf/v1'
      return this.http.get<Estado[]>(this.baseURL + path )
    }
    
    //retonar uma lista de municipios da API quando selecionado a UF desejada
    listarMunicipios(uf: string): Observable<Municipio[]> {
      const path = '/ibge/municipios/v1/' + uf;
      return this.http.get<Municipio[]> (this.baseURL + path);
    }
    
}
