import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default class Candidato extends Component {
    constructor(props) {
        super(props);
        if (this.props.editar) {
            this.state = {
                id: this.props.editar.id,
                nome: this.props.editar.nome,
                email: this.props.editar.email,
                telefone: this.props.editar.telefone,
                escolaridade: this.props.editar.escolaridade,
                experiencia: this.props.editar.experiencia,
                
            }
        } else {
            this.state = {
                nome: "",
                email: "",
                telefone: "",
                escolaridade: "",
                experiencia: "",
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
                email: this.state.email,
                telefone: this.state.telefone,
                escolaridade:this.state.escolaridade,
                experiencia:this.state.experiencia
            })

        } else {
            this.props.onAdicionarCandidato({
                nome: this.state.nome,
                email: this.state.email,
                telefone: this.state.telefone,
                escolaridade:this.state.escolaridade,
                experiencia:this.state.experiencia,
            });
        }
        this.setState({
            id: "",
            nome: "",
            email: "",
            telefone: "",
            escolaridade:"",
            experiencia:"",

        });
    }
    render() {
        return (
            <Dialog
                open={true}
            >
                <DialogTitle>{this.state.id ?
                    <h3> Editar Candidato {this.state.nome}  </h3> :
                    <h3>Cadastrar Candidato</h3>}</DialogTitle>
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
                        label="Email"
                        fullWidth
                        value={this.state.email}
                        onChange={(evento) => this.setParam('email', evento.target.value)}
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
                        label="Escolaridade"
                        fullWidth
                        value={this.state.escolaridade}
                        onChange={(evento) => this.setParam('escolaridade', evento.target.value)}
                    />
                     <TextField
                        autoFocus
                        margin="dense"
                        label="Experiencia"
                        fullWidth
                        value={this.state.experiencia}
                        onChange={(evento) => this.setParam('experiencia', evento.target.value)}
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