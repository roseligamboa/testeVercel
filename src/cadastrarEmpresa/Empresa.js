import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default class Empresa extends Component {
    constructor(props) {
        super(props);
        if (this.props.editar) {
            this.state = {
                id: this.props.editar.id,
                nome: this.props.editar.nome,
                cnpj: this.props.editar.cnpj,
                endereco: this.props.editar.endereco,
                telefone: this.props.editar.telefone,
                email:this.props.editar.email,  
            }
        } else {
            this.state = {
                nome: "",
                cnpj: "",
                endereco: "",
                telefone: "",
                email: "",
            }
        }

    }
    setParam(param, valor) {
        this.setState({
            [param]: valor
        });
    }
    enviar() {
        if (this.state.id) {
            this.props.onEditar({
                id: this.state.id,
                nome: this.state.nome,
                cnpj:this.state.cnpj,
                endereco:this.state.endereco,
                telefone: this.state.telefone,
                email: this.state.email,   
            })

        } else {
            this.props.onAdicionarEmpresa({
                nome: this.state.nome,
                cnpj:this.state.cnpj,
                endereco:this.state.endereco,
                telefone: this.state.telefone,
                email: this.state.email,
                
                
               
            });
        }
        this.setState({
            id: "",
            nome: "",
            cnpj:"",
            endereco:"",
            telefone: "",
            email: "",  
        });
    }
    render() {
        return (
            <Dialog
                open={true}
            >
                <DialogTitle>{this.state.id ?
                    <h3> Editar Empresa {this.state.nome}  </h3> :
                    <h3>Cadastrar Empresa</h3>}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Nome"
                        fullWidth
                        value={this.state.nome}
                        onChange={(evento) => this.setParam('nome', evento.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Cnpj"
                        fullWidth
                        value={this.state.cnpj}
                        onChange={(evento) => this.setParam('cnpj', evento.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Endereco"
                        fullWidth
                        value={this.state.endereco}
                        onChange={(evento) => this.setParam('endereco', evento.target.value)}
                    />
                     <TextField
                        autoFocus
                        margin="dense"
                        label="Telefone"
                        fullWidth
                        value={this.state.telefone}
                        onChange={(evento) => this.setParam('telefone', evento.target.value)}
                    />
                     <TextField
                        autoFocus
                        margin="dense"
                        label="Email"
                        fullWidth
                        value={this.state.email}
                        onChange={(evento) => this.setParam('email', evento.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.enviar()} color="primary">
                        {this.state.id ? "Confirmar" : "Adicionar"}
                    </Button>
                    <Button onClick={() => { this.props.onCancelar() }} color="secondary">
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}