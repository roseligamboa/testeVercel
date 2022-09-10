import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import PesquisaVaga from './PesquisaVaga';
import PesquisaCandidato from './PesquisaCandidato';

export default class PesquisaPai extends Component {
    constructor() {
        super();
        this.state = {
            exibirFormulario: false,
            exibirFormulario1:false,
        };
    }
    novo() {
        this.setState({
            exibirFormulario: true,
        });
    }
    novo1() {
        this.setState({
            exibirFormulario1: true,
        });
    }
    
    voltar() {
        this.setState({
            exibirFormulario: false,
        });
    }
    voltar1() {
        this.setState({
            exibirFormulario1: false,
        });
    }
    render() {
        return (
            <div>
                <div>
                    {this.state.exibirFormulario1 ? <PesquisaVaga
                        onVoltar1={() => this.voltar1()}
                         /> :
                        <Button onClick={() => this.novo1()} color="primary">
                            Pesquisar Vagas de Uma Empresa
                </Button>}
                </div>
                <div>
                    {this.state.exibirFormulario ? <PesquisaCandidato
                        onVoltar={() => this.voltar()} /> :
                        <Button onClick={() => this.novo()} color="primary">
                            Pesquisar Quais os Candidatos Para O Cargo
                </Button>}

                </div>

            </div>
        );
    }
}