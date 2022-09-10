import React, { Component } from 'react';
import axios from 'axios';
import Candidato from './Candidato';
import ListarCandidato from './ListarCandidato';
import Button from '@material-ui/core/Button';


export default class CandidatoPai extends Component {
    constructor() {
        super();
        this.state = {
            candidatos: [],
           editarCandidatos: null,
        };
    }

    tratarErro(erro) {
        console.log(erro.response);
        if (erro.response.data.message)
            alert(erro.response.data.message);
        else
            alert(erro.response.data);
    }

    componentDidMount() {
        this.listarCandidato();
    }
    listarCandidato() {
        axios.get("/api/candidatos/").then(
            (retorno) => this.setState({
                candidatos: retorno.data
            })
        ).catch((erro) => this.tratarErro(erro));
    }
    adicionarCandidato(candidato) {
        axios.post("/api/candidatos/", candidato).then(
            (insere) => {
                this.setState({
                    candidatos: [...this.state.candidatos, insere.data]
                });
                this.limpar();
            }
        ).catch((erro)=>this.tratarErro(erro));
    }
    confirmarEdicao(candidato) {
        axios.put("/api/candidatos/" + candidato.id, candidato).then(
            () => {
                this.listarCandidato();
                this.limpar();
            }
        ).catch((erro)=>this.tratarErro(erro));
    }
    excluirCandidato(candidato) {
        axios.delete("/api/candidatos/" + candidato.id).then(
            () => this.listarCandidato()
        ).catch((erro)=>this.tratarErro(erro));
    }
    editar(candidato) {
        this.setState({
           editarCandidatos: candidato,
            exibirFormulario: true,
        });
    }
    limpar() {
        this.setState({
           editarCandidatos: null,
            exibirFormulario: false,
        });
    }
    novo() {
        this.setState({
           editarCandidatos: null,
            exibirFormulario: true,
        });
    }
    render() {
        return (
            <div><h3>lista de candidatos</h3>
                <ListarCandidato
                    listarCandidato={this.state.candidatos}
                    onEditar={(candidato) => this.editar(candidato)}
                    onExcluirCandidato={(candidato) => this.excluirCandidato(candidato)} />
                <br /><br />
                {this.state.exibirFormulario ? <Candidato key={this.state.editarCandidatos ?
                    this.state.editarCandidatos.id : "novo"}
                    editar={this.state.editarCandidatos}
                    onCancelar={() =>this.limpar()}
                    onEditar={(candidato) => this.confirmarEdicao(candidato)}
                    onAdicionarCandidato={(candidato) => this.adicionarCandidato(candidato)} /> :
                    <Button onClick={() => this.novo()} color = "primary">
                    NOVO CANDIDATO
                    </Button>}

            </div>
        );
    }
}