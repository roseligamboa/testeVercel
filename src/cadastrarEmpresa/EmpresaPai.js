import React, { Component } from 'react';
import axios from 'axios';
import Empresa from './Empresa';
import ListarEmpresa from './ListarEmpresa';
import Button from '@material-ui/core/Button';


export default class EmpresaPai extends Component {
    constructor() {
        super();
        this.state = {
            empresas: [],
            editarEmpresa: null,
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
        this.listarEmpresa();
    }
    
    listarEmpresa() {
        axios.get("/api/empresas/").then(
            (retorno) => this.setState({
                empresas: retorno.data
            })
        ).catch((erro) => this.tratarErro(erro));
    }
    adicionarEmpresa(empresa) {
        axios.post("/api/empresas/", empresa).then(
            (insere) => {
                this.setState({
                    empresas: [...this.state.empresas, insere.data]
                });
                this.limpar();
            }
        ).catch((erro)=>this.tratarErro(erro));
    }
    confirmarEdicao(empresa) {
        axios.put("/api/empresas/" + empresa.id, empresa).then(
            () => {
                this.listarEmpresa();
                this.limpar();
            }
        ).catch((erro)=>this.tratarErro(erro));
    }
    excluirEmpresa(empresa) {
        axios.delete("/api/empresas/" + empresa.id).then(
            () => this.listarEmpresa()
        ).catch((erro)=>this.tratarErro(erro));
    }
    editar(empresa) {
        this.setState({
            editarEmpresa: empresa,
            exibirFormulario: true,
        });
    }
    limpar() {
        this.setState({
            editarEmpresa: null,
            exibirFormulario: false,
        });
    }
    novo() {
        this.setState({
            editarEmpresa: null,
            exibirFormulario: true,
        });
    }
    render() {
        return (
            <div><h3>lista de empresa</h3>
                <ListarEmpresa
                    listarEmpresa={this.state.empresas}
                    onEditar={(empresa) => this.editar(empresa)}
                    onExcluirEmpresa={(empresa) => this.excluirEmpresa(empresa)} />
                <br /><br />
                {this.state.exibirFormulario ? <Empresa key={this.state.editarEmpresa ?
                    this.state.editarEmpresa.id : "novo"}
                    editar={this.state.editarEmpresa}
                    onCancelar={() =>this.limpar()}
                    onEditar={(empresa) => this.confirmarEdicao(empresa)}
                    onAdicionarEmpresa={(empresa) => this.adicionarEmpresa(empresa)} /> :
                    <Button onClick={() => this.novo()} color = "primary">
                    NOVA EMPRESA
                    </Button>}

            </div>
        );
    }
}