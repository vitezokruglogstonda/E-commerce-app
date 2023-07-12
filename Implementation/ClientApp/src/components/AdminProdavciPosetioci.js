import React, { useState, useEffect } from 'react';
import { authHeader } from '../helpers';
import { forwardRef } from 'react';
import Avatar from 'react-avatar';
//import Grid from '@material-ui/core/Grid'

import MaterialTable from '@material-table/core';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import axios from 'axios'
//import Alert from '@material-ui/lab/Alert';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Update: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};


const AdminProdavciPoseotici = () => {
    var columns = [
        { title: "id", field: "id" },
        { title: "Slika", render: rowData => <Avatar maxInitials={1} size={40} round={true} name={rowData === undefined ? " " : rowData.naziv} /> },
        { title: "Naziv", field: "naziv" },
        { title: "Email", field: "mail" },
        { title: "Tip Korisnika", field: "tipKorisnika" },
        { title: "Online", field: "online" },
        { title: "Odobren", field: "odobren" }
    ]
    const [data, setData] = useState([]); //table data
    const [data2, setData2] = useState([]); //table data
    useEffect(() => {
        const fetchData = async () => {
            //ovde fali api za prodavce i pos
            axios.get(`https://localhost:5001/Admin/PreuzmiProdavce`,
                {
                    headers: authHeader()
                }
            ).then(response => {
                console.log(response)
                console.log(response.data)
                setData(response.data)
            })
                .catch(error => {
                    console.error('There was an error!', error);
                })
        }
        const fetchData2 = async () => {
            //ovde fali api za prodavce i pos
            axios.get(`https://localhost:5001/Admin/PreuzmiPosetioce`,
                {
                    headers: authHeader()
                }
            ).then(response => {
                console.log(response)
                console.log(response.data)
                setData2(response.data)
            })
                .catch(error => {
                    console.error('There was an error!', error);
                })
        }
        fetchData();
        fetchData2();
    }, [])

    const handleRowDelete = (oldData, resolve) => {
        if (oldData.tipKorisnika === "Prodavac") {
            axios.delete(`https://localhost:5001/Admin/IzbrisiProdavca/${oldData.id}`,
                {
                    headers: authHeader()
                }, oldData.id).then(response => {
                    console.log(response)
                    const dataDelete = [...data];
                    const index = oldData.tableData.id;
                    dataDelete.splice(index, 1);
                    setData([...dataDelete]);
                    resolve()
                })
                .catch(error => {
                    console.log(error);
                    console.error('There was an error!', error);
                    resolve()
                })
        }
        else {
            axios.delete(`https://localhost:5001/Admin/IzbrisiPosetioca/${oldData.id}`,
                {
                    headers: authHeader()
                }, oldData.id).then(response => {
                    console.log(response)
                    const dataDelete = [...data2];
                    const index = oldData.tableData.id;
                    dataDelete.splice(index, 1);
                    setData2([...dataDelete]);
                    resolve()
                })
                .catch(error => {
                    console.log(error);
                    console.error('There was an error!', error);
                    resolve()
                })
        }
    }




    return (
        <>
            <MaterialTable
                style={{ padding: '20px' }}
                title="Prodavci"
                columns={columns}
                data={data}
                icons={tableIcons}
                editable={{
                    onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                            handleRowDelete(oldData, resolve)
                        }),
                }}
                options={{

                    actionsColumnIndex: -1,

                }}
                localization={{
                    pagination: {
                        labelDisplayedRows: '{from}-{to} od {count}'
                    },
                    header: {
                        actions: 'Obrisi'
                    },
                    body: {
                        deleteTooltip: 'Obrisi',
                        editRow: {
                            deleteText: 'Da li zelite da obrisete ovaj nalog?',
                            saveTooltip: 'Da',
                            cancelTooltip: 'Ne'
                        },
                        emptyDataSourceMessage: 'Trenutno nema nijedan odobren nalog.',
                        filterRow: {
                            filterTooltip: 'Filter'
                        }
                    }
                }}
            />
            <MaterialTable
                style={{ padding: '20px' }}
                title="Posetioci"
                columns={columns}
                data={data2}
                icons={tableIcons}
                editable={{
                    onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                            handleRowDelete(oldData, resolve)
                        }),
                }}
                options={{

                    actionsColumnIndex: -1,

                }}
                localization={{
                    pagination: {
                        labelDisplayedRows: '{from}-{to} od {count}'
                    },
                    header: {
                        actions: 'Obrisi'
                    },
                    body: {
                        deleteTooltip: 'Obrisi',
                        editRow: {
                            deleteText: 'Da li zelite da obrisete ovaj nalog?',
                            saveTooltip: 'Da',
                            cancelTooltip: 'Ne'
                        },
                        emptyDataSourceMessage: 'Trenutno nema nijedan odobren nalog.',
                        filterRow: {
                            filterTooltip: 'Filter'
                        }
                    }
                }}
            />
        </>
    );
}
export default AdminProdavciPoseotici;