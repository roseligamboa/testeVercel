import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import ListaPesquisaVaga from './ListaPesquisaVaga';
import IconButton from '@material-ui/core/IconButton';



export default class PesquisaVaga extends Component {
    constructor(props) {
        super(props);
            this.state = {
                nome: "",
                vagas:[],
                carregar:true,
            }
    }
    setParam(param, valor) {
        this.setState({
            [param]: valor
        });
    }
    tratarErro(erro) {
        console.log(erro.response);
        if (erro.response.data.message)
            alert(erro.response.data.message);
        else
            alert(erro.response.data);
    }
 
    pesquisar(){
        let vaga = this.state.nome
        axios.get('/api/vagas/pesquisar/empresas/?nome='+vaga).then(
            (retorno) =>{this.setState({
                vagas:retorno.data,
                carregar:false
            })
        }
        ).catch((erro) => this.tratarErro(erro));
    }
    cancelar(){
        this.setState({
            nome:""
        });
    }
    render() {
        return (
            <Dialog
                open={true}
            >
                <DialogTitle>
                    <h3>Pesquisar Vagas de Uma Empresa</h3></DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Nome da Empresa"
                        fullWidth = "100%"
                        height = "100%"
                        value={this.state.nome}
                        onChange={(evento) => this.setParam('nome', evento.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <IconButton onClick={() => this.pesquisar()} color="primary">
                        Pesquisar
                    </IconButton>
                    <IconButton onClick={() => {this.props.onVoltar1() }} color="">
                         voltar 
                    </IconButton>
                    <IconButton onClick={() => {this.cancelar() }} color="secondary">
                        limpar
                    </IconButton>
                   
                </DialogActions>
                {this.state.carregar? <h5>carregando a lista ...</h5>:<ListaPesquisaVaga
                listarEmpresa = {this.state.vagas}/>}
                
            </Dialog>
        );
    }
}