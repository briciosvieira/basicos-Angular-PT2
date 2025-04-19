import { Component, OnInit, inject } from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout'
import {MatCardModule} from '@angular/material/card'
import { FormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectChange, MatSelectModule } from '@angular/material/select'
import { cliente } from './cliente';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import {NgxMaskDirective, provideNgxMask } from 'ngx-mask'
import {MatSnackBar} from '@angular/material/snack-bar';
import { BrasilAPIService } from '../brasil-api.service';
import { Estado, Municipio } from '../brasilapi.models';
import { CommonModule } from '@angular/common';

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
    MatSelectModule,
    CommonModule,
    NgxMaskDirective
  
  ],providers:[
    provideNgxMask()
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent implements OnInit {
  atualizando : boolean = false;
  criarCliente: boolean= false;
  snack: MatSnackBar = inject(MatSnackBar)
  estados: Estado [] =[];
  municipios: Municipio[]=[];

  constructor(
    private service: ClienteService,
    private brasilApiservice: BrasilAPIService,  
    private route: ActivatedRoute,
    private router: Router){

  }
  cliente: cliente = cliente.newCliente();

  save(){
    if (!this.atualizando) {
      this.criarCliente = true;
      this.service.salvar(this.cliente);
      this.cliente = cliente.newCliente();
      this.mostrarMensagemSnackBar("Usuário criado com sucesso")
      
    }else{
      this.service.atualizar(this.cliente);
      this.router.navigate(['/consulta']);
      this.mostrarMensagemSnackBar("Usuário atualizado com sucesso")
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

    this.carregarUFs()

  }

  limparCampo(){  
    this.router.navigate(['/cadastro']);
    this.cliente = cliente.newCliente()
  }

  
  //poupap que informar que uma ação foi realizada com sucesso.
  mostrarMensagemSnackBar(messagem: string){
    this.snack.open(messagem, "Ok", {
      duration: 3000
    })
  }

  // criando um metodo  para chamar a api e exibi-la
  carregarUFs(){
    this.brasilApiservice.listarUFs().subscribe({
      next: listaDeEstados => this.estados = listaDeEstados,
      error: erro => console.log('ocorreu um erro', erro)
    })
  }

  carregarMunicipios(event: MatSelectChange){
    const ufSelecionada = event.value;
    this.brasilApiservice.listarMunicipios(ufSelecionada).subscribe({
      next: listaDeMunicipios => this.municipios = listaDeMunicipios,
      error: erro => console.log('ocorreu um erro', erro)
      
    })
  }
}
