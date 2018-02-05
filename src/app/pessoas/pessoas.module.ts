import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { ButtonModule } from 'primeng/components/button/button';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';


import { PessoasCadastroComponent } from './pessoas-cadastro/pessoas-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    DataTableModule,
    TooltipModule
  ],
  declarations: [
    PessoasPesquisaComponent,
    PessoasCadastroComponent
    ],
  exports: [
    PessoasPesquisaComponent,
    PessoasCadastroComponent
  ]
})
export class PessoasModule { }
