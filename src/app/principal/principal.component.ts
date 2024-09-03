import { Component, OnInit } from '@angular/core';
import { Cliente } from '../modelo/Cliente';
import { ClienteService } from '../servico/cliente.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  //objeto do tipo cliente

  cliente = new Cliente();

  // Variável para controlar a visibilidade dos botões
  btnCadastro: boolean = true;
  //Variavel para visibiliadde da tabela
  tabela :boolean=true;

  // Lista de clientes
  clientes: Cliente[] = [];

  constructor(private servico: ClienteService) {}

  // Método para selecionar clientes
  selecionar(): void {
    this.servico.selecionar()
      .subscribe(retorno => this.clientes = retorno);
  }

  //Metodo de cadastro
  cadastrar():void{
    this.servico.cadastrar(this.cliente)
    .subscribe(retorno =>{
      //cadastrar o cliente no vetor
      this.clientes.push(retorno);
      //limpar formulario
      this.cliente=new Cliente();
      alert('Cliente cadastrado com sucesso')
    });
  }

  //Metodo para selecionar cliente especifico
   selecionarCliente(posicao:number):void{

    //Selecionar cliente no vetor
    this.cliente=this.clientes[posicao];

    //Visibilidade dos botões
    this.btnCadastro=false;
    //Visibiliadde da tabela
    this.tabela=false;

   }



  // Método de inicialização
  ngOnInit(): void {
    this.selecionar();
  }
}
