import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export default class ListaPesquisaVaga extends Component {

    render() {

        return <Table >
            <TableHead>
                <TableRow>
                    <TableCell>CARGO</TableCell>
                    <TableCell>DATA DA VAGA</TableCell>
                    <TableCell>CIDADE</TableCell>
                    <TableCell>ESTADO</TableCell>
                    <TableCell>DESCRIÇÃO</TableCell>
                    
                    
                </TableRow>
            </TableHead>
            <TableBody>
                {this.props.listarEmpresa.map(
                    (empresa) => <TableRow key={empresa.nome}> 
                        <TableCell>{empresa.cargo}</TableCell>
                        <TableCell>{empresa.dataInclusao}</TableCell>
                        <TableCell>{empresa.cidade}</TableCell>
                        <TableCell>{empresa.estado}</TableCell>
                        <TableCell>{empresa.descricao}</TableCell> 
                        <TableCell>
                        </TableCell>
                    </TableRow>
                )}


            </TableBody>
        </Table>;
    }
}