import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { ToastyService } from 'ng2-toasty';

@Injectable()
export class ErrorHendlesService {

  constructor(private toast: ToastyService) { }

  errorOcorrido(erroResponse: any) {
    let msn: string;

    if (typeof erroResponse === 'string') {
        msn = erroResponse;

    } else if (  erroResponse instanceof Response
      && erroResponse.status >= 400 && erroResponse.status <= 499) {

      let errors;

       msn = 'Ocorreu um erro ao processar a sua solicitação';
       try {
            errors = erroResponse.json();

            msn = errors[0].mesagemUsuario;
       } catch (e) {}
       console.error('Ocorreu um erro1', erroResponse);
    } else {
      msn = 'Erro ao processar serviço remoto. Tente novamente.';
      console.error('Ocorreu um erro', erroResponse);
    }
    this.toast.error( msn);
  }

}
