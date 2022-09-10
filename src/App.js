import React, { Component } from 'react';
import UsuarioPai from './cadastraUsuario/UsuarioPai';
import CandidatoPai from './cadastrarCandidato/CandidatoPai';
import EmpresaPai from './cadastrarEmpresa/EmpresaPai';
import VagaPai from './cadastrarVaga/VagaPai';
import PesquisaPai from './pesquisa/PesquisaPai'
import {BrowserRouter as Router,Route,NavLink} from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import { MenuList } from '@material-ui/core';

class App extends Component {
  constructor() {
    super();
    this.state = {
      selecionado: "",
      menu: [

        {
          nome: "USUARIO",
          componente: UsuarioPai
        },
        {
          nome: "CANDIDATO",
          componente: CandidatoPai
        },
        {
          nome: "EMPRESA",
          componente: EmpresaPai
        },
        {
          nome:"VAGA",
          componente: VagaPai
        },
        {
          nome:"PESQUISA",
          componente:PesquisaPai
        }
         
       
      ]
    };
    
  }
  
  
  render() {
    
    return <Router><div>
      <nav>
      <MenuList>
          {this.state.menu.map((menu, indice) =>
            <MenuItem><NavLink key={menu.nome} to={"/" + indice} activeClassName="selecionado">
              {menu.nome}</NavLink>
            </MenuItem>
          )}
           </MenuList>
        </nav>
        
      {this.state.menu.map(
        (menu, indice) => <Route path={"/" + indice} component={menu.componente} />
      )}
     
    </div></Router>;
  }
}
export default App;


