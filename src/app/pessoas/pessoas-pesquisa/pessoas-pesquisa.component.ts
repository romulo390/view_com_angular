import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/components/common/api';

import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { ToastyService } from 'ng2-toasty';

import { ErrorHendlesService } from '../../core/error-hendles.service';
import { PessoaService, PessoaFiltro } from '../pessoa.service';




@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent  {

  totalRegistros = 0;
  filtro = new PessoaFiltro();
  pessoas = [];
  @ViewChild('tabela') grid;

  constructor(private pessoaService: PessoaService,
              private toasty: ToastyService,
              private confirmationService: ConfirmationService,
              private erroHandles: ErrorHendlesService) {}

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

      this.pessoaService.pesquisar(this.filtro)
      .then(resultado => {
        this.pessoas = resultado.pessoas;
        this.totalRegistros = resultado.total;
      }).catch(erro => this.erroHandles.errorOcorrido(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  aoTentarExclui(pessoa: any) {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir a pessoa: ${pessoa.nome} ?`,
      header: 'Confirmação',
        icon: 'fa fa-question-circle',
        accept: () => {
          this.excluir(pessoa);
        },
        reject: () => {
          this.toasty.info('Pessoa não foi excluida');
        }
    });
  }

  excluir(pessoa: any) {
    this.pessoaService.excluirPessoa(pessoa.cod)
    .then(() => {
       if (this.grid === 0) {
        this.pesquisar();
       } else {
           this.grid.first = 0;
       }
       this.toasty.success('Pessoa excluída com sucesso!!');

    }).catch(erro => this.erroHandles.errorOcorrido(erro));

  }

  alternarStatus(pessoa: any) {
    this.pessoaService.alternarStatus(pessoa.cod, pessoa.ativo)
    .then(() => {

      if ( pessoa.ativo === false) {
        pessoa.ativo = true;
      } else {
       pessoa.ativo = false;
      }
      const acao =  pessoa.ativo ? 'ativada' : 'desativada';

      this.toasty.success(`Pessoa ${acao} com sucesso!`);
    }).catch(erro => this.erroHandles.errorOcorrido(erro));
  }

}
