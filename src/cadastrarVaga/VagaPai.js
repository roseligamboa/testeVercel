import React, { Component } from 'react';
import axios from 'axios';
import Vaga from './Vaga';
import ListarVaga from './ListarVaga';
import Button from '@material-ui/core/Button';

export default class Produtos extends Component {

    constructor() {
        super();
        this.state = {
            vagas: [],
            editarVaga: null
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
        this.ListarVagas();
    }
    ListarVagas() {
        this.setState({
            vagas: []
        });
        axios.get("/api/vagas/").then(
            (retorno) => this.setState({
                vagas: retorno.data
            })
        ).catch((erro) => this.tratarErro(erro));
    }

    confirmarEdicao(vaga) {
        axios.put("/api/vagas/" + vaga.id, vaga).then(
            () => {
                this.ListarVagas();
                this.limpar();
            }
        ).catch((erro) => this.tratarErro(erro));
    }


    adicionarVaga(vaga) {
        axios.post("/api/vagas/", vaga).then(
            (retorno) => {
                this.setState({
                    vagas: [...this.state.vagas, retorno.data]});
                this.limpar();
            }
        ).catch((erro) => this.tratarErro(erro));

    }
    excluir(vaga) {
        axios.delete("/api/vagas/" + vaga.id).then(
            () => this.ListarVagas()
        ).catch((erro) => this.tratarErro(erro));
    }

    editar(vaga) {
        this.setState({
            editarVaga: vaga,
            exibirFormulario: true
        });
    }


    limpar() {
        this.setState({
            editarVaga: null,
            exibirFormulario: false,
        });
    }
    novo() {
        this.setState({
            editarVaga: null,
            exibirFormulario: true,
        });
    }
    render() {
        return (
            <div><h3>LISTA DE VAGAS</h3>
                <ListarVaga
                    listarVagas={this.state.vagas}
                    onExcluir={(vaga) => this.excluir(vaga)}
                    onEditar={(vaga) => this.editar(vaga)} />
                <br></br>
                {this.state.exibirFormulario ? <Vaga
                    key={this.state.editarVaga ?
                        this.state.editarVaga.id : "novo"}
                    editar={this.state.editarVaga}
                    onCancelar={() =>this.limpar()}
                    onEditar={(vaga) => this.confirmarEdicao(vaga)}
                    onAdicionar={(vaga) => this.adicionarVaga(vaga)} /> :
                    <Button onClick={() => this.novo()}color="primary">
                    NOVA VAGA
                    </Button>}

            </div>
        );
    }
}
