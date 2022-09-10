import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

export default class ListarEmpresa extends Component {

    render() {

        return <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Nome</TableCell>
                    <TableCell>CNPJ</TableCell>
                    <TableCell>ENDEREÇO</TableCell>
                    <TableCell>TELEFONE</TableCell>
                    <TableCell>EMAIL</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {this.props.listarEmpresa.map(
                    (empresa) => <TableRow key={empresa.id}> 
                         <TableCell>{empresa.id}</TableCell>
                        <TableCell>{empresa.nome}</TableCell>
                        <TableCell>{empresa.cnpj}</TableCell>
                        <TableCell>{empresa.endereco}</TableCell>
                        <TableCell>{empresa.telefone}</TableCell>
                        <TableCell>{empresa.email}</TableCell>
                        <TableCell>

                            <Button onClick={() => this.props.onExcluirEmpresa(empresa)} color="primary">
                                Excluir
                            </Button>
                            <Button onClick={() => this.props.onEditar(empresa)} color="secondary">
                                Editar
                           </Button>
                        </TableCell>
                    </TableRow>
                )}


            </TableBody>
        </Table>;
    }
}