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
    //Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
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


const AdminNeodobreni = () => {
    var columns = [
        { title: "id", field: "id"},
        { title: "Slika", render: rowData => <Avatar  size={60} round={true} src={`https://localhost:5001/Slike/Proizvod/${rowData.tipProizvoda}/${rowData.slika}`} /> },
        { title: "Naziv", field: "naziv" },
        { title: "Cena", field: "cena" },
        { title: "Tip proizvoda", field: "tipProizvoda" }
    ]
    const [data, setData] = useState([]); //table data

    useEffect(() => {
        const fetchData = async () => {
            axios.get(`https://localhost:5001/Admin/PreuzmiNeodobreneProizvode/`,
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
        fetchData();
    }, [])

    const handleRowOdobri = (oldData, resolve) => {

        axios.put(`https://localhost:5001/Admin/OdobriProizvod/${oldData.id}`,null,
            {
                headers: authHeader()
            }
        ).then(response => {
            console.log(response)
            const dataDelete = [...data];
            const index = oldData.tableData.id;
            dataDelete.splice(index, 1);
            setData([...dataDelete]);
            resolve()
        })
            .catch(error => {
                console.error('There was an error!', error);
                resolve()
            })
    }



    return (
       <>
       <MaterialTable
            style={{ padding: '20px' }}
              title="Neodobeni proizvodi"
              columns={columns}
              data={data}
              icons={tableIcons}
              editable={{
                onRowDelete: (oldData) =>
                  new Promise((resolve) => {
                    handleRowOdobri(oldData, resolve)
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
                    actions: 'Odobri'
                },
                body: {
                    deleteTooltip:'Odobri',
                    editRow: { 
                        deleteText: 'Da li zelite da odobrite ovaj proizvod?',
                        saveTooltip:'Da',
                        cancelTooltip:'Ne'
                    },
                    emptyDataSourceMessage: 'Trenutno nema nijedan neodobren proizvod.',
                    filterRow: {
                        filterTooltip: 'Filter'
                    }
                }
            }}
            />
            
       </>
    );
}
export default AdminNeodobreni;