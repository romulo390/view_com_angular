export class Pessoa {
  cod: number;
}

export class Categoria {
  cod: number;
}
export class Lancamaneto {
  cod: number;
  tipo = 'RECEITA';
  descricao: string;
  dataVencimento: Date;
  dataPagamento: Date;
  valor: number;
  observacao: string;
  pessoa = new  Pessoa();
  categoria = new Categoria;
}
