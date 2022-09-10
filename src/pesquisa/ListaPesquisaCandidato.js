import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export default class ListaPesquisaCandidato extends Component {

    render() {

        return <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell>EMAIL</TableCell>
                    <TableCell>TELEFONE</TableCell>
                    <TableCell>ESCOLARIDADE</TableCell>
                    <TableCell>EXPERIENCIA</TableCell>
                    
                    
                </TableRow>
            </TableHead>
            <TableBody>
                {this.props.listarCandidatos.map(
                    (empresa) => <TableRow key={empresa.nome}> 
                        <TableCell>{empresa.nome}</TableCell>
                        <TableCell>{empresa.email}</TableCell>
                        <TableCell>{empresa.telefone}</TableCell>
                        <TableCell>{empresa.escolaridade}</TableCell>
                        <TableCell>{empresa.experiencia}</TableCell>
                       
                        
                        <TableCell>
                        </TableCell>
                    </TableRow>
                )}


            </TableBody>
        </Table>;
    }
}