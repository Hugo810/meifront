export class Cliente {
    codigo?: number;
    nome: string = '';
    sexo?: string;
    cpf?: string;
    cnpj?: string;
    telefoneResidencial?: string;
    telefoneComercial?: string;
    telefoneCelular?: string;
    email?: string;
    endereco: {
      logradouro?: string;
      numero?: string;
      bairro?: string;
      cidade?: string;
      uf?: string;
      cep?: string;
    } = {};
    mostrarDetalhes: boolean = false; // Adicionado para controlar a visibilidade dos detalhes
  }
  