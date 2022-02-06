import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {
    Link
  } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Loading } from './loading';
import { axiosInstance } from './providers/providers';
import { Box } from '@mui/system';
import { Delete } from './delete';
import { useHistory } from 'react-router-dom';
export default function List(){

    const [cargando, setCargando] = React.useState(true)
    const [rows, setRows]= React.useState(true)
    const [openModalDelete, setOpenModalDelete] = React.useState(false)
    const [idPerson, setIdPerson] = React.useState(false)
    let history = useHistory();
    React.useEffect(() => {
        setCargando(true)
        axiosInstance.get('list/')
        .then(json => {
            setRows(json.data)
            setCargando(false)
        })
        .catch(e => {
            console.log(e)
        })
    }, [setCargando]);
    

    const handleOpenModalDelete = (id) => {
        setIdPerson(id)
        setOpenModalDelete(true)
    }

    const handleDelete = () => {
        let url = `delete/${idPerson}`
        axiosInstance.delete(url)
        .then((res) => {
            setOpenModalDelete(false)
            setRows(res.data)
            setCargando(false)
            
        })
        .catch((e)=>{
            console.log(e)
            setCargando(false)
        });
    }

    return(
        <React.Fragment>
            {cargando == true ? <Loading/> : 
                <React.Fragment>
                    <Box sx={{
                        height: 'calc(100vh - 64px)',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <Grid container justifyContent='center' alignItems='center'>
                            <Grid item xs={6}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="left">Id</TableCell>
                                    <TableCell align="left">Nombre de la Empresa</TableCell>
                                    <TableCell align="left">Dirección</TableCell>
                                    <TableCell align="left">NIT</TableCell>
                                    <TableCell align="left">Telefono</TableCell>
                                    <TableCell align="left">Acciones</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                        {row.name}
                                        </TableCell>
                                        <TableCell align="left">{row.id}</TableCell>
                                        <TableCell align="left">{row.name}</TableCell>
                                        <TableCell align="left">{row.address}</TableCell>
                                        <TableCell align="left">{row.nit}</TableCell>
                                        <TableCell align="left">{row.phone}</TableCell>
                                        <TableCell align="left">
                                            <Link
                                                color="textPrimary"
                                                to={'/edit/'+row.id}
                                            >
                                                <IconButton>
                                                 <EditIcon></EditIcon>
                                                </IconButton>
                                                
                                            </Link>
                                            <IconButton onClick={() => handleOpenModalDelete(row.id)}>
                                                <DeleteIcon></DeleteIcon>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                    ))}
                                    <TableRow>
                                        <TableCell colSpan={7} align="right">
                                            <Link
                                                to={'/'}
                                            >
                                            <IconButton>
                                                <AddCircleOutlineIcon></AddCircleOutlineIcon>
                                            </IconButton>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                                </Table>
                            </TableContainer>
                            </Grid>
                        </Grid>
                    </Box>
                    {openModalDelete == true ? 
                        <Delete  
                        open={openModalDelete}
                        setOpen={setOpenModalDelete}

                        handleDelete={handleDelete}
                        />
                    : ''}
                </React.Fragment>
            } 
        </React.Fragment>
    )
}