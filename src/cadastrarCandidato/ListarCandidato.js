import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

export default class ListarCandidato extends Component {

    render() {

        return <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Nome</TableCell>
                    <TableCell>EMAIL</TableCell>
                    <TableCell>TELEFONE</TableCell>
                    <TableCell>ESCOLARIDADE</TableCell>
                    <TableCell>EXPERIENCIA</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {this.props.listarCandidato.map(
                    (candidato) => <TableRow key={candidato.id}> 
                         <TableCell>{candidato.id}</TableCell>
                        <TableCell>{candidato.nome}</TableCell>
                        <TableCell>{candidato.email}</TableCell>
                        <TableCell>{candidato.telefone}</TableCell>
                        <TableCell>{candidato.escolaridade}</TableCell>
                        <TableCell>{candidato.experiencia}</TableCell>
                        <TableCell>

                            <Button onClick={() => this.props.onExcluirCandidato(candidato)} color="primary">
                                Excluir
                            </Button>
                            <Button onClick={() => this.props.onEditar(candidato)} color="secondary">
                                Editar
                           </Button>
                        </TableCell>
                    </TableRow>
                )}


            </TableBody>
        </Table>;
    }
}