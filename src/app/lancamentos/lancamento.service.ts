import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';


import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';
import { Lancamaneto } from '../core/model';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';


export class LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  quantidadePorPagina = 5;
}

@Injectable()
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamento';

  constructor(private http: Http) { }

   pesquisaLanca(filter: LancamentoFiltro): Promise<any> {
      const parametro = new URLSearchParams();

      const headers = new Headers();
      headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

      parametro.append('page', filter.pagina.toString());
      parametro.append('size', filter.quantidadePorPagina.toString());

      if (filter.descricao) {
        parametro.set('descricao', filter.descricao );
      }
      if (filter.dataVencimentoInicio) {
          parametro.set('dataVencimentoDe',
                     moment(filter.dataVencimentoInicio).format( 'YYYY-MM-DD' )); // Biblioteca do npm para foramata datas
      }
      if (filter.dataVencimentoFim) {
        parametro.set('dataVencimentoAte',
                   moment(filter.dataVencimentoFim).format( 'YYYY-MM-DD' ));
    }

      return this.http.get(`${this.lancamentosUrl}?resumo`, { headers, search: parametro })
      .toPromise()
      .then(response => {
         const respostaJson = response.json();
         const lancamentos = respostaJson.content;

         const resultado = {
            lancamentos,
            total: respostaJson.totalElements
         };
         return resultado;
      });
   }

   excluirLanca(cod: number): Promise<void> {
    const headers = new Headers();

    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.delete(`${this.lancamentosUrl}/${cod}`, { headers })
    .toPromise()
    .then(() => null );

  }

  adicionarLanc(lancamento: Lancamaneto): Promise<LazyLoadEvent> {
    const headers = new Headers();

    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.lancamentosUrl,
           JSON.stringify(lancamento),{headers} )
           .toPromise()
           .then(response => response.json());
  }
}
