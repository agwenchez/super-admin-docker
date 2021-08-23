import React, { Fragment, useState, useEffect, forwardRef } from 'react';
import { Container } from 'reactstrap'
import MaterialTable from "material-table";
import { AddBox, ArrowDownward, Check, ChevronLeft, ChevronRight, Clear, DeleteOutline, Edit, FilterList, FirstPage, LastPage, Remove, ViewColumn, SaveAlt, Search } from "@material-ui/icons";
import axios from 'axios';
import { useHistory, withRouter, Link } from "react-router-dom";
// import Alert from '@material-ui/lab/Alert';
import { toast } from 'react-toastify';
import Layout from "../AppWrapper"
import EditIcon from '@material-ui/icons/Edit';
import ConfirmDelete from './ConfirmDelete';
import { Button, Grid, Tooltip, IconButton } from '@material-ui/core/';
import CustomizedProgressBars from './CircularProgress';

// import { Delete } from 'react-feather';


const tableIcons = {
  Add: forwardRef((props, ref) => <Button {...props} ref={ref} variant="contained" color="primary" >Add New</Button>),
  // Add: () => <Button variant="contained" color="primary" >Add New</Button> ,
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
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


const api = axios.create({
  baseURL: `https://afya-kwanza-backend.herokuapp.com/`
})


const HospitalsTable = () => {
  const [riders, setRiders] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null);


  var columns = [
    // { render: rowData => rowData.tableData.id + 1 },
    { title: "Hospital Name", field: "hospital_name" },
    { title: "Phone Number", field: "phonenumber" },
    { title: "Region", field: "region" },
    { title: "County", field: "county" },
    { title: "Location", field: "location" },
    { title: "Address", field: "address" },
    { title: "Service", field: "service" },
    {
      cellStyle: {
        paddingLeft: "9%"
      },
      headerStyle: {
        paddingLeft: "9%"
      },
      render: rowData => (
        <Link
          to={{
            pathname: "/dashboard/hospitals/edit",
            state: {
              id: rowData.hospital_id
            }
          }}
        > 
        <Tooltip title="Edit">
          <EditIcon style={{ color: 'black' }} />
        </Tooltip>
        </Link>
      )
    },
    {
     
      render: rowData => (<ConfirmDelete onDelete={() => handleDelete(rowData.hospital_id)} name={rowData.hospital_name} openDialog={openDialog} />)
    },

  ]

  let openDialog = false;

  const handleDelete = async (id) => {
    try {
      const res = await api.delete(`/hospitals/delete/${id}`)
      const dataDelete = [...riders];
      const afterDelete = dataDelete.filter(rider => rider.hospital_id !== id);

      setRiders([...afterDelete]);
      if (res.status == 200) {
        toast.success(res.data)
      }

    } catch (error) {
      console.log("error occured=>", error)
      toast.error(error)
    }

  }

  const getHospitals = async () => {

    try {
      setLoading(true)
      const res = await api.get('/hospitals/all', {
        headers: { token: localStorage.tokenated }
      })
      // console.log("Data from API==>", res.data)
      setLoading(false)
      setRiders(res.data)

    } catch (error) {
      console.log("Error==>", error.message)
    }
  }

  useEffect(() => {

    getHospitals()

  }, [])



  const history = useHistory();


  // console.log("State Data==>", riders)
  return (
    <Layout>
      <>
        <Container fluid={true}>
          <div style={{ width: '100%' }}>

            <h3 style={{ paddingTop: '5%', marginBottom: '2.5%', textAlign: 'center' }}>Hospitals Table</h3>
            <Grid container spacing={10}>
              <Grid item xs="2"></Grid>
              <Grid item xs="2"></Grid>
              <Grid item xs="2"></Grid>
              <Grid item xs="2"></Grid>
              <Grid item xs="2"></Grid>
              <Grid item xs="2">
                <Button onClick={() => { history.push('/dashboard/hospitals/new') }} variant="contained" color="primary" >
                  Add New
                </Button>
              </Grid>
            </Grid>

            {/* <Modal /> */}
            <Grid container spacing={1} style={{ marginBottom: '6%' }}>
              <Grid item xs={12}></Grid>
              <Grid item xs={12}>

                {loading ? (<CustomizedProgressBars />) :
                  (<MaterialTable
                    title="Hospitals"
                    style={{ zIndex: '0' }}
                    columns={columns}
                    data={riders}
                    icons={tableIcons}
                    onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
                    options={{
                      exportButton: true,
                      rowStyle: rowData => ({
                        backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : 'white'
                      }),
                      actionsColumnIndex: -1,
                      search: true,
                      paginationType: 'normal',
                      pageSize: 10,
                      pageSizeOptions: [ 25, 50, 100]
                    }}
                    // actions={[
                    //   {
                    //     tooltip: 'Remove All Selected Users',
                    //     icon: DeleteOutline,
                    //     onClick: (evt, data) => alert('You want to delete ' + data.length + ' rows')
                    //   }
                    // ]}

                  />)}
              </Grid>

            </Grid>
          </div>
        </Container>
      </>
    </Layout>
  );
}

export default withRouter(HospitalsTable)