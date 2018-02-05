import { ToastyService } from 'ng2-toasty';

import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ErrorHendlesService } from './../../core/error-hendles.service';
import { CategoriaService } from '../../categoria/categoria.service';
import { PessoaService } from './../../pessoas/pessoa.service';
import { Lancamaneto } from './../../core/model';
import { LancamentoService } from './../lancamento.service';


@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];

  categorias = [];
  pessoas = [];
  lancamento = new Lancamaneto();

  constructor(
                private categoriaService: CategoriaService,
                private errorHandler: ErrorHendlesService,
                private pessoaService: PessoaService,
                private lancamentoService: LancamentoService,
                private toasty: ToastyService
              ) {}

  ngOnInit() {
   this.listarCategorias();
   this.listarPessoas();
  }

  salvar(form: FormControl) {
      this.lancamentoService.adicionarLanc(this.lancamento)
      .then(() => {
        this.toasty.success('Lançamento adicionado com sucesso!!');
        form.reset();

      }).catch(erro => this.errorHandler.errorOcorrido(erro));
  }

 listarCategorias() {
    this.categoriaService.listarTodas()
    .then(categorias => {
      this.categorias = categorias.map(c => ({ label: c.nome, value: c.cod}));
    })
    .catch(erro => this.errorHandler.errorOcorrido(erro));
  }

  listarPessoas() {
    this.pessoaService.listarTodos()
    .then(respostaPessoa => {
      this.pessoas = respostaPessoa.map(p => ({label: p.nome, valeu: p.cod}));
    //  this.pessoas = respostaPessoa.map(p => {
      //  return {label: p.nome, valeu: p.cod };
     // });

    })
    .catch(erro => this.errorHandler.errorOcorrido(erro));
  }

}
