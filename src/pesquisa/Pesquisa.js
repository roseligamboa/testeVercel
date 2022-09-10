import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

export default class Pesquisa extends Component {
    constructor(props) {
        super(props);
            this.state = {
                nome: "",
                vagas:[],
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
   
    pesquisar() {
        let vaga =this.state.nome
        axios.get('/api/vagas/pesquisar/empresas/?nome='+vaga ).then(
            (retorno) =>{this.setState({
                vagas: retorno.data
            });
           this.props.onVoltar() 
        } 
        ).catch((erro) => this.tratarErro(erro));
    }
   
    Cancelar(){
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
                    <h3>Cadastrar Empresa</h3></DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Nome"
                        fullWidth
                        value={this.state.nome}
                        onChange={(evento) => this.setParam('nome', evento.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.pesquisar()} color="primary">
                        Pesquisar
                    </Button>
                    <Button onClick={() => {this.props.onVoltar() }} color="secondary">
                        voltar
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}