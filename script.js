class ValidaFormulario {
    constructor(){
        this.formulario = document.querySelector('.formulario');
        
        this.eventos();

    }

    eventos(){
        this.formulario.addEventListener('submit', e => {
            this.handleSubmit(e);
        });
    }

    handleSubmit(e){
        e.preventDefault();
        const camposValidados = this.camposSaoValidos();
        const senhasValidas = this.senhasSaoValidas();
    }

    senhasSaoValidas(){

        let validar = true;
        
        const senha = this.formulario.querySelector('.senha');
        const repetirSenha = this.formulario.querySelector('.repetir-senha');

        

        if(senha.value !== repetirSenha.value){
            validar = false;
            this.criaErro(senha,'As senhas não são iguais.');
            this.criaErro(repetirSenha,'As senhas não são iguais.');
         }

         if(senha.value < 6 || senha.value >10 ){
             validar = false;
             this.criaErro(senha, 'Precisa conter entre 6 e 10 digitos.');
         }

        return validar;
        
    }

    camposSaoValidos(){
        let valid = true;

        for(let errorText of this.formulario.querySelectorAll('.error-text')){
            errorText.remove();
        }
        
        for(let campo of this.formulario.querySelectorAll('.validar')){
            const label = campo.previousElementSibling.innerHTML;
            
            if(!campo.value){
                this.criaErro(campo, `Campo "${label}" não pode estar em branco.`);
                valid = false;    
            }

            if(campo.classList.contains('cpf')){
                if(!this.validaCPF(campo)) valid = false;    
            }

            if(campo.classList.contains('usuario')){
                if(!this.validaUsuario(campo)) valid = false;
            }
            
        }

        return valid;
    }

    validaCPF(campo){
        const cpf = new ValidaCPF(campo.value);

        if(!cpf.valida()){
            this.criaErro(campo, 'CPF inválido');
            return false;
        }

        return true;
    }

    validaUsuario(campo){
        
        const usuario = campo.value;
        let valid = true;

        if(usuario.length < 3 || usuario.length > 12){
            this.criaErro(campo , 'Usuário precisa ter entre 3 e 12 caracteres.');
            valid = false;
        }

        if(!usuario.match(/[a-zA-Z0-9]+/g)){
            this.criaErro(campo, 'Nome de usuário precisa conter apenas letras e/ou números.');
        }

        return true;
    }

   

    criaErro(campo, msg){
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');
        campo.insertAdjacentElement('afterend', div);
    }
}

const valida = new ValidaFormulario();