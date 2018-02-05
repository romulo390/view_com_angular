import { Component, OnInit, ViewChild } from '@angular/core';


import { LazyLoadEvent, Message} from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { GrowlModule } from 'primeng/primeng';

import { LancamentoService, LancamentoFiltro } from '../lancamento.service';
import { ErrorHendlesService } from '../../core/error-hendles.service';


@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  totalResgistros = 0;
  filtro = new LancamentoFiltro();
  lancamentos = [];
  @ViewChild('tabela') grid;

  msgs: Message[] = [];

  constructor(
    private lancamentoService: LancamentoService,
    private toasty: ToastyService,
    private confirmationService: ConfirmationService,
    private erroHandles: ErrorHendlesService
  ) { }

  ngOnInit() {

  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisaLanca(this.filtro)
      .then(resultadoFinal => {
            this.totalResgistros = resultadoFinal.total;
             this.lancamentos = resultadoFinal.lancamentos;
          }).catch(erro => this.erroHandles.errorOcorrido(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const paginaAtual = event.first / event.rows;
    this.pesquisar(paginaAtual);
  }


  confirmarExclucao(lancamento: any) {
      this.confirmationService.confirm({
        message: `Tem certeza que deseja excluir lançamento: ${lancamento.descricao} ?`,
        header: 'Confirmação',
        icon: 'fa fa-question-circle',
        accept: () => {
          this.excluir(lancamento);
        },
        reject: () => {
          this.msgs = [{severity: 'info', summary: 'Rejeitado', detail: 'Lançamento não foi excluído'}];
        }
      });
  }

  excluir(lancamento: any) {
    this.lancamentoService.excluirLanca(lancamento.cod)
    .then(() => {
      if (this.grid.first === 0) {
        this.pesquisar();
      } else {
          this.grid.first = 0;
      }

      this.toasty.success('Lancamento excluído com sucesso!!');
    }).catch(erro => this.erroHandles.errorOcorrido(erro));
  }



}
