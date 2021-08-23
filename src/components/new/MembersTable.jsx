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
import { Button, Grid, Tooltip } from '@material-ui/core/';
import CustomizedProgressBars from './CircularProgress';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';

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


const MembersTable = () => {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null);
  const [dependants, setDependants] = useState([])


  var columns = [
    // { render: rowData => rowData.tableData.id + 1 },
    {
      // cellStyle: {
      //   marginLeft: "-10%"
      // },
      // headerStyle: {
      //   marginLeft: "-10%"
      // },
      title: "Full Name", field: "full_name"
    },
    { title: "D.O.B", field: "date_of_birth" },
    { title: "ID No", field: "id_number" },
    { title: "Phone Number", field: "phonenumber" },
    { title: "Gender", field: "gender" },
    { title: "Sacco", field: "sacco" },
    { title: "Route Name", field: "route_name" },
    { title: "Email", field: "email" },
    {
      cellStyle: {
        paddingLeft: "2%"
      },
      headerStyle: {
        paddingLeft: "2%"
      },
      render: rowData => (
        <Link
          to={{
            pathname: "/dashboard/members/dependants",
            state: {
              id: rowData.id_number
            }
          }}
        >
          <Tooltip title="Dependant(s)">
            <PeopleOutlineIcon style={{ color: 'black' }} />
          </Tooltip>
        </Link>
      )
    },
    {
      cellStyle: {
        paddingLeft: "2%"
      },
      headerStyle: {
        paddingLeft: "2%"
      },
      render: rowData => (
        <Link
          to={{
            pathname: "/dashboard/members/edit",
            state: {
              id: rowData.member_id
            }
          }}
        >
          <Tooltip title="Edit">
            <EditIcon style={{ color: 'black' }} />
          </Tooltip>
        </Link>
      )
    },
    { render: rowData => (<ConfirmDelete onDelete={() => handleDelete(rowData.member_id)} name={rowData.full_name} openDialog={openDialog} />) }

  ]

  let openDialog = false;

  const handleDelete = async (id) => {
    try {
      const res = await api.delete(`/members/delete/${id}`)
      const dataDelete = [...members];
      const afterDelete = dataDelete.filter(member => member.member_id !== id);

      setMembers([...afterDelete]);
      if (res.status == 200) {
        toast.success(res.data)
      }

    } catch (error) {
      console.log("error occured=>", error)
      toast.error(error)
    }

  }

  const getMemmbers = async () => {

    try {
      setLoading(true)
      const res = await api.get('/members/all', {
        headers: { token: localStorage.tokenated}
      })
      // console.log("Data from API==>", res.data)
      setLoading(false)
      setMembers(res.data)

    } catch (error) {
      console.log("Error==>", error.message)
    }
  }

  useEffect(() => {

    getMemmbers()

  }, [])



  const history = useHistory();


  // console.log("State Data==>", members)
  return (
    <Layout>
      <>
        <Container fluid={true}>
          <div style={{ width: '100%' }}>

            <h3 style={{ paddingTop: '5%', marginBottom: '2.5%', textAlign: 'center' }}>Sacco Members Table</h3>
            <Grid container spacing={10}>
              <Grid item xs="2"></Grid>
              <Grid item xs="2"></Grid>
              <Grid item xs="2"></Grid>
              <Grid item xs="2"></Grid>
              <Grid item xs="2"></Grid>
              <Grid item xs="2">
                <Button onClick={() => { history.push('/dashboard/members/new') }} variant="contained" color="primary" >
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
                    title="Sacco Members"
                    style={{ zIndex: '0' }}
                    columns={columns}
                    data={members}
                    icons={tableIcons}
                    options={{
                      exportButton: true,
                      rowStyle: rowData => ({
                        backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : 'white'
                      }),
                      actionsColumnIndex: -1,
                      search: true,
                      paginationType: 'normal',
                      pageSize: 25,
                      pageSizeOptions: [50, 100]
                    }}
                  // detailPanel={[
                  //   {
                  //     tooltip: 'Show Name',
                  //     render: rowData => {

                  //       const getDependants = async (id) =>{
                  //         try {
                  //           let dependants = await api.get(`/dependants/all_dependants/${id}`)
                  //           dependants = dependants.data
                  //           console.log("Dependants from DB=>", dependants)
                  //           return dependants
                  //         } catch (error) {
                  //           console.log("error occured=>", error)
                  //         }
                  //       }

                  //       (async () =>{

                  //         const dependantsFromDB = await getDependants(rowData.id_number);
                  //         setDependants(dependantsFromDB)
                  //         // console.log("Dependants inside IIFE=>", dependants)

                  //       })()
                  //       console.log("Dependants from state=>", dependants)
                  //       return (
                  //         <div
                  //           style={{
                  //             fontSize: 100,
                  //             textAlign: 'center',
                  //             color: 'white',
                  //             backgroundColor: '#43A047',
                  //           }}
                  //         >
                  //           {rowData.full_name}
                  //         </div>
                  //       )
                  //     },
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

export default MembersTable