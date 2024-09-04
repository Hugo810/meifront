import { Component, OnInit } from '@angular/core';
import { Cliente } from '../modelo/Cliente';
import { ClienteService } from '../servico/cliente.service';
import { Endereco } from '../modelo/Endereco';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  cliente: Cliente = new Cliente(); // Inicializando o cliente com endereço
  btnCadastro: boolean = true;
  tabela: boolean = true;
  clientes: Cliente[] = [];

  constructor(private servico: ClienteService) {}

  ngOnInit(): void {
    this.selecionar();
  }

  selecionar(): void {
    this.servico.selecionar()
      .subscribe(retorno => this.clientes = retorno, error => {
        console.error('Erro ao carregar clientes:', error);
        alert('Erro ao carregar clientes.');
      });
  }

  cadastrar(): void {
    this.servico.cadastrar(this.cliente)
      .subscribe(retorno => {
        this.clientes.push(retorno);
        this.cliente = new Cliente(); // Limpa o formulário, incluindo o endereço
        alert('Cliente cadastrado com sucesso');
      }, error => {
        console.error('Erro ao cadastrar cliente:', error);
        alert('Erro ao cadastrar cliente.');
      });
  }

  selecionarCliente(cliente: Cliente): void {
    this.cliente = { ...cliente }; // Preenche o formulário com os dados do cliente e endereço
    this.btnCadastro = false; // Muda o estado para edição
    this.tabela = false; // Oculta a tabela
  }

  editar(): void {
    if (this.cliente.codigo) { // Verifica se o cliente possui um código válido
      this.servico.editar(this.cliente.codigo, this.cliente)
        .subscribe(retorno => {
          let posicao = this.clientes.findIndex(obj => obj.codigo === retorno.codigo);
          if (posicao !== -1) {
            this.clientes[posicao] = retorno;
            this.cliente = new Cliente(); // Limpa o formulário
            this.btnCadastro = true; // Volta ao estado de cadastro
            this.tabela = true; // Mostra a tabela novamente
            alert('Cliente alterado com sucesso!');
          } else {
            alert('Cliente não encontrado na lista.');
          }
        }, error => {
          console.error('Erro ao editar cliente:', error);
          alert('Erro ao alterar cliente.');
        });
    } else {
      alert('Cliente não selecionado ou código inválido.');
    }
  }

  remover(): void {
    if (this.cliente.codigo) { // Verifica se o cliente possui um código válido
      this.servico.remover(this.cliente.codigo)
        .subscribe(retorno => {
          let posicao = this.clientes.findIndex(obj => obj.codigo === this.cliente.codigo);
          if (posicao !== -1) {
            this.clientes.splice(posicao, 1);
            this.cliente = new Cliente(); // Limpa o formulário
            this.btnCadastro = true; // Volta ao estado de cadastro
            this.tabela = true; // Mostra a tabela novamente
            alert('Cliente removido com sucesso!');
          } else {
            alert('Cliente não encontrado na lista.');
          }
        }, error => {
          console.error('Erro ao remover cliente:', error);
          alert('Erro ao remover cliente.');
        });
    } else {
      alert('Cliente não selecionado ou código inválido.');
    }
  }

  cancelar(): void {
    this.cliente = new Cliente(); // Limpa o formulário, incluindo o endereço
    this.btnCadastro = true; // Volta ao estado de cadastro
    this.tabela = true;
  }
}
