import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
export default class Vaga extends Component {

    constructor(props) {
        super(props);
        if (this.props.editar) {
            this.state = {
                id: this.props.editar.id,
                cargo: this.props.editar.cargo,
                cidade: this.props.editar.cidade,
                estado: this.props.editar.estado,
                descricao: this.props.editar.descricao,
                candidatoId: this.props.editar.candidato ?
                    this.props.editar.candidato.id : "",
                empresaId: this.props.editar.empresa ?
                    this.props.editar.empresa.id : "",
                usuarioId: this.props.editar.usuario ?
                    this.props.editar.usuario.id : "",
            };
        }
        else {
            this.state = {
            cargo: "",
            cidade:"",
            estado:"",
            descricao:"",
            candidatoId: "", 
            empresaId: "", 
            usuarioId: "", };
        }
        this.state.candidatos = [];
        this.state.empresas = [];
        this.state.usuarios = [];
        this.state.vagas = [];

    }

    componentDidMount() {
        this.listaCandidatos();
        this.listaEmpresas();
        this.listaUsuarios();
        this.listaVagas();
    }


    listaCandidatos() {
        axios.get("/api/candidatos/").then(
            (resultado) => {
                this.setState({ candidatos: resultado.data });
            }
        );
    }


    listaEmpresas() {
        axios.get("/api/empresas/").then(
            (resultado) => {
                this.setState({ empresas: resultado.data });
            }
        );
    }


    listaUsuarios() {
        axios.get("/api/usuarios/").then(
            (resultado) => {
                this.setState({ usuarios: resultado.data });
            }
        );
    }

     
    listaVagas() {
        axios.get("/api/vagas/").then(
            (resultado) => {
                this.setState({ vagas: resultado.data });
            }
        );
    }


    setParam(param, valor) {
        this.setState({
            [param]: valor
        });
    }

    enviar() {
        let candidato = this.state.candidatos.find(
            (candidatoNoArray) => candidatoNoArray.id === this.state.candidatoId
        );
        let empresa = this.state.empresas.find(
            (empresaNoArray) => empresaNoArray.id === this.state.empresaId
        );
        let usuario = this.state.usuarios.find(
            (usuarioNoArray) => usuarioNoArray.id === this.state.usuarioId
        );
        if (this.state.id) {
            this.props.onEditar({
                id: this.state.id,
                cargo: this.state.cargo,
                cidade: this.state.cidade,
                estado: this.state.estado,
                descricao: this.state.descricao,
                candidato: candidato,
                empresa:empresa,
                usuario: usuario,
            });
        } else {
            this.props.onAdicionar({
                id: this.state.id,
                cargo: this.state.cargo,
                cidade: this.state.cidade,
                estado: this.state.estado,
                descricao: this.state.descricao,
                candidato: candidato,
                empresa:empresa,
                usuario: usuario,
            });

        }
        this.setState({
            cargo: "", 
            cidade: "",
            estado:"",
            descricao:"",
            candidatoId: "", 
            empresaId: "",
            usuarioId: "",
        });
    }

    render() {

        return (
            <Dialog
                open={true}
            >
                <DialogTitle>{this.state.id ?
                    <h3> Editar Vaga de {this.state.cargo}  </h3> :
                    <h3>Cadastrar Vaga</h3>}</DialogTitle>
                <DialogContent>

                    <TextField
                        autoFocus
                        margin="dense"
                        label="Cargo"
                        fullWidth
                        value={this.state.cargo}
                        onChange={(evento) => this.setParam('cargo', evento.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Cidade"
                        fullWidth
                        value={this.state.cidade}
                        onChange={(evento) => this.setParam('cidade', evento.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="estado"
                        fullWidth
                        value={this.state.estado}
                        onChange={(evento) => this.setParam('estado', evento.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="descricão"
                        fullWidth
                        value={this.state.descricao}
                        onChange={(evento) => this.setParam('descricao', evento.target.value)}
                    />

                    <TextField
                        select
                        autoFocus
                        fullWidth
                        label="empresa"
                        value={this.state.empresaId}
                        onChange={(evento) => this.setParam("empresaId", evento.target.value)}
                        margin="normal">

                        {this.state.empresas.map(
                            (empresa) => <option value={empresa.id}>{empresa.nome}</option>)}
                    </TextField>

                    <TextField
                        select
                        autoFocus
                        fullWidth
                        label="Usuario"
                        value={this.state.usuarioId}
                        onChange={(evento) => this.setParam("usuarioId", evento.target.value)}
                        margin="normal">

                        {this.state.usuarios.map(
                            (usuario) => <option value={usuario.id}>{usuario.nome}</option>
                            )}
                    </TextField>

                    <TextField
                        select
                        autoFocus
                        fullWidth
                        label="Candidato"
                        value={this.state.candidatoId}
                        onChange={(evento) => this.setParam("candidatoId", evento.target.value)}
                        margin="normal">

                        {this.state.candidatos.map(
                            (candidato) => <option value={candidato.id}>{candidato.nome}</option>
                               )}
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.enviar()} color="primary">
                        {this.state.id ? "Confirmar" : "Adicionar"}
                    </Button>
                    <Button onClick={() => { this.props.onCancelar() }} color="secondary">
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog >
        );
    }
}
