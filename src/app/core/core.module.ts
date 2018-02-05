import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToastyModule } from 'ng2-toasty';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { ConfirmationService } from 'primeng/components/common/api';
import {SidebarModule} from 'primeng/components/sidebar/sidebar';

import { ErrorHendlesService } from './error-hendles.service';
import { PessoaService } from './../pessoas/pessoa.service';
import { LancamentoService } from './../lancamentos/lancamento.service';
import { CategoriaService } from '../categoria/categoria.service';

import { NavbarComponent } from './navbar/navbar.component';

// Adicione o registerLocaleData e o localePt

import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

// E por fim, registre o localePt como 'pt-BR'
registerLocaleData(localePt, 'pt-BR');


@NgModule({
  imports: [
    CommonModule,
    SidebarModule,
    ToastyModule.forRoot(),
    ConfirmDialogModule,
  ],
  declarations: [NavbarComponent],
  exports: [
    NavbarComponent,
    ToastyModule,
    ConfirmDialogModule
  ],
  providers: [
    LancamentoService,
    PessoaService,
    ErrorHendlesService,
    CategoriaService,

    ConfirmationService,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class CoreModule { }
