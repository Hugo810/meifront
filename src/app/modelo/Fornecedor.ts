import { Endereco } from "./Endereco";

export class Fornecedor{
     
    codigo: number=0;
    razaoSocial:String  = "";
    cnpj:String  = "";
    telefone1:String = "";
    telefone2:String  = "";
    nomeContato:String = "";
    email:String  = "";
    endereco: Endereco = new Endereco();

}