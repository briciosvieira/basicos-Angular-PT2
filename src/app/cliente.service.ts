import { Injectable } from '@angular/core';
import { cliente } from './cadastro/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  static REPOSITORIO_CLIENTES = "_CLIENTES";

  constructor() { }

  //Salvando cliente no local storage
  public salvar(cliente: cliente){
    const storage = this.obterLocalStorage();
    storage.push(cliente);

    localStorage.setItem(ClienteService.REPOSITORIO_CLIENTES, JSON.stringify(storage))
  }

  //atualizar Cliente
  atualizar(cliente: cliente){
    const storage = this.obterLocalStorage();
    storage.forEach(c => {
      if (c.id === cliente.id) {
        Object.assign(c, cliente)
      }
    })
    localStorage.setItem(ClienteService.REPOSITORIO_CLIENTES, JSON.stringify(storage))
  }

  //pesquisar clientes se já existem dentro do do localStorage
  public pesquisarClientes(nomeBusca: string): cliente[] {
    const clientes =  this.obterLocalStorage();

    if (!nomeBusca) {
      return clientes;
    }

    return clientes.filter(cliente => cliente.nome?.toLowerCase().includes(nomeBusca.toLowerCase()));
  }

  //obter dados do Localstorage privado para ser usado dentro do metodo salvar.
  private obterLocalStorage(): cliente[] {
    const repositorioClientes = localStorage.getItem(ClienteService.REPOSITORIO_CLIENTES);

    if(repositorioClientes){
      const clientes: cliente[] = JSON.parse(repositorioClientes)
      return clientes;
    }

    const clientes: cliente[] = [];
    localStorage.setItem(ClienteService.REPOSITORIO_CLIENTES, JSON.stringify(clientes));
    return clientes;
  }

  //buscar o o usuario igual ao id que eu estou passando
  buscarClientePorId(id: string): cliente | undefined {
    const cliente = this.obterLocalStorage();
    return cliente.find(cliente => cliente.id === id)
  }

  //deletar o usuario
  deletar(cliente: cliente){
    const storage = this.obterLocalStorage();

    const novaLista = storage.filter(c => c.id !== cliente.id);
    localStorage.setItem(ClienteService.REPOSITORIO_CLIENTES, JSON.stringify(novaLista));
  }
}
