import React, { Fragment, useState, useEffect, forwardRef, useSelector, useDispatch } from 'react';
import { Container } from 'reactstrap'
import { Grid, Button, Tooltip } from '@material-ui/core/'
import MaterialTable from "material-table";
import { AddBox, ArrowDownward, Check, ChevronLeft, ChevronRight, Clear, DeleteOutline, Edit, FilterList, FirstPage, LastPage, Remove, ViewColumn, SaveAlt, Search } from "@material-ui/icons";
import axios from 'axios';
import { useHistory, withRouter, Link } from "react-router-dom";
// import Alert from '@material-ui/lab/Alert';
import { toast } from 'react-toastify';
import Modal from './modal';
import Layout from "../AppWrapper"
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Avatar from 'react-avatar';
import ConfirmDelete from './ConfirmDelete';
import CustomizedProgressBars from './CircularProgress';
import { fetchSaccos } from '../../redux/saccos/action';


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

const SaccoTable = () => {
  const [data, setData] = useState([]); //table data
  const [riders, setRiders] = useState([])
  const [loading, setLoading] = useState(false)

  const history = useHistory();
  // const dispatch = useDispatch()

  // const saccos = useSelector(state => state.Saccos.saccos)
  // console.log('Saccos from redux saga=>', saccos)


  var columns = [
    // { render: rowData => rowData.tableData.id + 1 },
    // { title: "Avatar", render: rowData => <Avatar maxInitials={1} size={40} round={true} name={rowData === undefined ? " " : rowData.sacco_name} /> },
    { title: "Sacco Name", field: "sacco_name" },
    { title: "Admin FirstName", field: "admin_firstname" },
    { title: "Admin LastName", field: "admin_lastname" },
    {
      title: "Admin email",
      field: "admin_email",
      headerStyle: {
        paddingRight: "1%"
      }
    },
    { title: "Phone No", field: "admin_phonenumber" },
    { title: "Sacco Email", field: "sacco_email" },
    {
      cellStyle: {
        paddingLeft: "6%"
      },
      headerStyle: {
        paddingLeft: "6%"
      },
      render: rowData => (
        <Link
          to={{
            pathname: "/dashboard/saccos/edit",
            state: {
              sacco_name: rowData.sacco_name, id: rowData.sacco_id
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
      cellStyle: {
        paddingRight: "5%"
      },
      headerStyle: {
        paddingRight: "5%"
      },
      render: rowData => (<ConfirmDelete onDelete={() => handleDelete(rowData.sacco_id)} name={rowData.sacco_name} openDialog={openDialog} />)
    },

  ]

  let openDialog = false

  const handleDelete = async (id) => {
    try {
      const res = await api.delete(`/saccos/delete/${id}`)

      const dataDelete = [...riders];
      const afterDelete = dataDelete.filter(sacco => sacco.sacco_id !== id);

      setRiders([...afterDelete]);
      res.status == 200 && toast.success(res.data)

    } catch (error) {
      console.log("error occured=>", error.message)
      error.message == 'Request failed with status code 500' && toast.error('You cant delete a sacco that has members')
    }

  }


  useEffect(() => {
    const token = localStorage.tokenated
    setLoading(true)
    api.get('/saccos/all', {
       headers: { token: token }
      })
      .then(res => {
        // console.log("data =>", res.data)
        setRiders(res.data)
        setLoading(false)
      }
      ).catch(error => {
        console.log("Error", error)
      })


      // dispatch(fetchSaccos())
      // console.log("Saccos from Redux-saga", saccos)
  }, [])

  // const saccos = useSelector(state => state.saccos)
  // console.log('Saccos from redux saga=>', saccos)

  // const redirectToReport = (rowData) => {
  //   // const { history } = props;
  //   history.push({
  //     pathname: "/dashboard/saccos/profile", // re-route to this path
  //     state: { sacco_name: rowData.sacco_email, surname: rowData.admin_email } // your row data
  //   });
  // };

  return (
    <Layout>
      <Fragment>
        <Container fluid={true}>
          <div style={{ width: '100%' }}>

            <h3 style={{ paddingTop: '5%', marginBottom: '2.5%', textAlign: 'center' }}>Saccos Table</h3>
            <Grid container spacing={10}>
              <Grid item xs="2"></Grid>
              <Grid item xs="2"></Grid>
              <Grid item xs="2"></Grid>
              <Grid item xs="2"></Grid>
              <Grid item xs="2"></Grid>
              <Grid item xs="2">
                <Button onClick={() => { history.push('/dashboard/saccos/new') }} variant="contained" color="primary" >
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
                    title="Saccos"
                    style={{ zIndex: '0' }}
                    columns={columns}
                    data={riders}
                    icons={tableIcons}
                    options={{
                      exportButton: true,
                      // selection: true,
                      // filtering: true,
                      sorting: true,
                      actionsColumnIndex: -1,
                      search: true,
                      paginationType: 'normal',
                      pageSize: 10,
                      pageSizeOptions: [25, 50, 100, 200, 300, 400, 500, 600, 700]
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
      </Fragment>
    </Layout>
  );
}

export default withRouter(SaccoTable);