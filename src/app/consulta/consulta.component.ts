import {  Component, ViewChild, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { cliente } from '../cadastro/cliente';
import { ClienteService } from '../cliente.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-consulta',
  imports: [
    MatInputModule,
    MatCardModule,
    FlexLayoutModule,
    MatIconModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule
  

  ],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss'
})
export class ConsultaComponent implements OnInit {

  constructor(
    private service: ClienteService,
    private router: Router
  ){ }

  nomeBusca: string = '';
  listaClientes: cliente[] =[];
  displayedColumns: string[] = ['id', 'nome', 'cpf','dataNascimento','email','acoes'];

  
  dataSource = new MatTableDataSource<cliente>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(){
    this.listaClientes = this.service.pesquisarClientes('');
    this.dataSource = new MatTableDataSource(this.listaClientes);
  }

  pesquisar(){
    this.listaClientes = this.service.pesquisarClientes(this.nomeBusca)
    this.dataSource.data = this.listaClientes;
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  //criando rota pra quando editar ele passar na url o id
  preparaParaEditar(id: string){
    this.router.navigate(['/cadastro'],{queryParams: {"id": id } })
  }

  //botão que perguntar se tem certeza se vai deletar
  preparaDeletar(cliente: cliente){
    cliente.deletando = true;
  }

  //botão que deleta definitivamente
  deletar(cliente: cliente){
    this.service.deletar(cliente);
    this.ngOnInit();
   
  }

}
