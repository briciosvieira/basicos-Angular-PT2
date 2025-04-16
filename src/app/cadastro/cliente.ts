import { v4 as uuid } from 'uuid'

export class cliente{

    id?:string
    nome?:string
    email?:string
    cpf?:string
    dataNascimento?:string
    telefone?:string
    deletando: boolean = false;
    
    static newCliente(){
        let cliente1 = new cliente();

        cliente1.id = uuid();

        return cliente1;
    }
}