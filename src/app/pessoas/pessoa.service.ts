import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';


export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}




@Injectable()
export class PessoaService {

  pessoasUrl = 'http://localhost:8080/pessoa';

  constructor(private http: Http) {}

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    const parametro = new URLSearchParams();
    const headers = new Headers();

    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

      parametro.set('page', filtro.pagina.toString());
      parametro.set('size', filtro.itensPorPagina.toString());

   if (filtro.nome) {
      parametro.set('nome', filtro.nome);
   }

    return this.http.get(`${this.pessoasUrl}`, { headers, search: parametro })
    .toPromise()
    .then(response => {
      const responseJson = response.json();
      const pessoas = responseJson.content;

      const resultado = {
        pessoas,
        total: responseJson.totalElements
      };
      return resultado;
    });

    }

    excluirPessoa(cod: number): Promise<any> {
      const headers = new Headers();
      headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

      return this.http.delete(`${this.pessoasUrl}/${cod}`, {headers})
      .toPromise()
      .then(() => null );

    }

    listarTodos(): Promise<any> {
        const headers = new Headers();

        headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

        return this.http.get(this.pessoasUrl, { headers })
        .toPromise()
        .then(response => response.json().content);
    }

    alternarStatus(cod: number, ativo: boolean ): Promise<void> {
      const headers = new Headers();

      headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
      headers.append('Content-Type', 'application/json');

      return this.http.put(`${this.pessoasUrl}/${cod}/ativo`, ativo, { headers })
      .toPromise()
      .then(() => null);

    }

}
