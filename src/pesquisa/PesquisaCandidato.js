import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';

import ListaPesquisaCandidato from './ListaPesquisaCandidato';

export default class PesquisaCandidato extends Component {
    constructor(props) {
        super(props);
            this.state = {
                cargo: "",
                candidatos:[],
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
   
    pesquisar() {
        let cargo =this.state.cargo
        axios.get('/api/candidatos/pesquisar/vagas/?cargo='+cargo ).then(
            (retorno) =>{this.setState({
                candidatos:retorno.data,
                carregar:false,
            });
            
        } 
        ).catch((erro) => this.tratarErro(erro));
    }
   
    cancelar(){
        this.setState({
            cargo:""
        });
    }
    render() {
        return (
            <Dialog
                open={true}
            >
                <DialogTitle>
                    <h3>Pesquisar Candidatos Para O Cargo</h3></DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label=" digite o cargo"
                        fullWidth="100%"
                        value={this.state.cargo}
                        onChange={(evento) => this.setParam('cargo', evento.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <IconButton onClick={() => this.pesquisar()} color="primary">
                        Pesquisar
                    </IconButton>
                    <IconButton onClick={() => {this.props.onVoltar() }} color="black">
                        voltar
                    </IconButton>
                    <IconButton onClick={() => {this.cancelar() }} color="secondary">
                        limpar
                    </IconButton>
                    
                </DialogActions>
                { this.state.carregar?<h5>carregando a lista</h5>:<ListaPesquisaCandidato
                listarCandidatos = {this.state.candidatos}/>}
               
            </Dialog>
        );
    }
}