import { Component, OnInit, Query } from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout'
import {MatCardModule} from '@angular/material/card'
import { FormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { cliente } from './cliente';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  imports: [
    FlexLayoutModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent implements OnInit {
  atualizando : boolean = false;
  criarCliente: boolean= false;

  constructor(
    private service: ClienteService, 
    private route: ActivatedRoute,
    private router: Router){

  }
  cliente: cliente = cliente.newCliente();

  save(){
    if (!this.atualizando) {
      this.criarCliente = true;
      this.service.salvar(this.cliente);
      this.cliente = cliente.newCliente();
      
    }else{
      this.service.atualizar(this.cliente);
      this.router.navigate(['/consulta']);
    }
  }

  //popular os campos existentes quando clicar em editar o usuario lá na consulta
  ngOnInit(): void {
    this.route.queryParamMap.subscribe((query: any) => {
      const params = query['params']
      const id = params['id']

      if(id){
        let clienteEncontrado= this.service.buscarClientePorId(id);
          if (clienteEncontrado) {
              this.atualizando = true;
              this.cliente = clienteEncontrado
          }
      }
    })
  }

  limparCampo(){  
    this.router.navigate(['/cadastro']);
    this.cliente = cliente.newCliente()
  }

}
