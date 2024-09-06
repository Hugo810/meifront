import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { FornecedorComponent } from './fornecedor/fornecedor.component';
import { InicioComponent } from './inicio/inicio.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' }, // Redireciona para a rota principal
  { path: 'inicio', component: InicioComponent },
  { path: 'cliente', component: ClienteComponent }, // Define a rota para o componente principal
  { path: 'fornecedor', component: FornecedorComponent }, // Define a rota para o componente principal
  // Adicione outras rotas conforme necessário
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
