import { Component } from '@angular/core';
import { FornecedorService } from '../fornecedor.service';
import { Fornecedor } from '../modelo/Fornecedor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.css']
})
export class FornecedorComponent {

  fornecedor: Fornecedor = new Fornecedor(); // Inicializando o Fornecedor com endereço
  btnCadastro: boolean = true;
  tabela: boolean = true;
  fornecedores: Fornecedor[] = [];

  constructor(private servico: FornecedorService, private router :Router) {}

  retornar() {
    this.router.navigate(['inicio']);
  }

  ngOnInit(): void {
    this.selecionar();
  }

  selecionar(): void {
    this.servico.selecionar()
      .subscribe(retorno => this.fornecedores = retorno, error => {
        console.error('Erro ao carregar fornecedors:', error);
        alert('Erro ao carregar fornecedors.');
      });
  }

  cadastrar(): void {
    this.servico.cadastrar(this.fornecedor)
      .subscribe(retorno => {
        this.fornecedores.push(retorno);
        this.fornecedor = new Fornecedor(); // Limpa o formulário, incluindo o endereço
        alert('Fornecedor cadastrado com sucesso');
      }, error => {
        console.error('Erro ao cadastrar fornecedor:', error);
        alert('Erro ao cadastrar fornecedor.');
      });
  }

  selecionarFornecedor(fornecedor: Fornecedor): void {
    this.fornecedor = { ...fornecedor }; // Preenche o formulário com os dados do fornecedor e endereçon
    this.btnCadastro = false; // Muda o estado para edição
    this.tabela = false; // Oculta a tabela
  }

  editar(): void {
    if (this.fornecedor.codigo) { // Verifica se o fornecedor possui um código válido
      this.servico.editar(this.fornecedor.codigo, this.fornecedor)
        .subscribe(retorno => {
          let posicao = this.fornecedores.findIndex(obj => obj.codigo === retorno.codigo);
          if (posicao !== -1) {
            this.fornecedores[posicao] = retorno;
            this.fornecedor = new Fornecedor(); // Limpa o formulário
            this.btnCadastro = true; // Volta ao estado de cadastro
            this.tabela = true; // Mostra a tabela novamente
            alert('Fornecedor alterado com sucesso!');
          } else {
            alert('Fornecedor não encontrado na lista.');
          }
        }, error => {
          console.error('Erro ao editar Fornecedor:', error);
          alert('Erro ao alterar Fornecedor.');
        });
    } else {
      alert('Fornecedor não selecionado ou código inválido.');
    }
  }

  remover(): void {
    if (this.fornecedor.codigo) { // Verifica se o fornecedor possui um código válido
      this.servico.remover(this.fornecedor.codigo)
        .subscribe(retorno => {
          let posicao = this.fornecedores.findIndex(obj => obj.codigo === this.fornecedor.codigo);
          if (posicao !== -1) {
            this.fornecedores.splice(posicao, 1);
            this.fornecedor = new Fornecedor(); // Limpa o formulário
            this.btnCadastro = true; // Volta ao estado de cadastro
            this.tabela = true; // Mostra a tabela novamente
            alert('Fornecedor removido com sucesso!');
          } else {
            alert('Fornecedor não encontrado na lista.');
          }
        }, error => {
          console.error('Erro ao remover fornecedor:', error);
          alert('Erro ao remover fornecedor.');
        });
    } else {
      alert('fornecedor não selecionado ou código inválido.');
    }
  }

  cancelar(): void {
    this.fornecedor = new Fornecedor(); // Limpa o formulário, incluindo o endereço
    this.btnCadastro = true; // Volta ao estado de cadastro
    this.tabela = true;
  }
}

