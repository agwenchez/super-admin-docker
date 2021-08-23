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
import CustomizedProgressBars from './CircularProgress';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { TextField, Grid, Button, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginTop: theme.spacing(4),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(10),
    borderRadius: '10px',
    backgroundColor: 'white',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),

  },
  textField: {
    marginLeft: theme.spacing(8),
    marginRight: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: "85%"
    },
    width: '45ch',
  },
  div: {
    // display:'flex'
    textAlign: 'right'
  },
  button: {
    margin: theme.spacing(1),
    color: 'black',
    backgroundColor: '#313F9F',
    border: '1px solid black',
    borderRadius: '10px',
    marginTop: '20%'
  },
  form: {
    paddingTop: theme.spacing(4)
  }
}))


const SaccoTransactions = () => {
  const [data, setData] = useState([])
  const [saccos, setSaccos] = useState([])
  const [sacco, setSacco] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null);
  const history = useHistory();
  const classes = useStyles();

  var columns = [
    { render: rowData => rowData.tableData.id + 1, width: '2%' },
    // { title: "Paybill", field: "paybill" },
    // { title: "Member ID No", field: "ID_number" },
    { title: "Phone Number", field: "phonenumber" },
    { title: "Amount", field: "amount" },
    { title: "MPESA code", field: "mpesa_confirmation_code" },
    { title: "Transaction Status", field: "transaction_status" },
    { title: "Sacco", field: "sacco" },
    { title: "Date", field: "date"},
    // {
    //     render: rowData => (
    //       <Link
    //         to={{
    //           pathname: `/dashboard/billing/transaction/${rowData.transaction_id}`,
    //           state: {
    //             id: rowData.id_number
    //           }
    //         }}
    //       >
    //         <Tooltip title="View Transaction">
    //           <VisibilityIcon />
    //         </Tooltip>
    //       </Link>
    //     )
    //   }
  ]


  const getSaccos = async () => {
    try {
      // setLoading(true)
      const res = await api.get('/saccos/all', {
        headers: { token: localStorage.tokenated }
      })
      // console.log("Data from API==>", res.data)
      // const data = res.data.filter(trans => trans.details !== "Cancelled")
      // console.log("Successfull only==>", data)
      const saccos = res.data
      saccos.unshift({ sacco_name: "" })
      setSaccos(saccos)
      // setLoading(false)

    } catch (error) {
      console.log("Error==>", error.message)
    }
  }

  const getSaccoTransaction = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const res = await api.get(`/billing/transaction/sacco/${sacco}`, {
        headers: { token: localStorage.tokenated }
      })
      console.log("Data from API==>", res.data)
      setData(res.data)
      setLoading(false)
    } catch (error) {
      console.log("Error==>", error.message)
    }
  }


  // const onChange = e => setData({...data, [e.target.name]: e.target.value})
  useEffect(() => {

    getSaccos()

  }, [])






  // console.log("State Data==>", members)
  return (
    <Layout>
      <>
        <Container fluid={true}>

          <div style={{ width: '100%' }}>

            <h3 style={{ paddingTop: '5%', marginBottom: '2.5%', textAlign: 'center' }}>Sacco Transactions Table</h3>

            <form onSubmit={getSaccoTransaction} style={{ display: 'flex', justifyContent: 'space-between' }}>
              {/* <label htmlFor="sacco_choice" style={{ marginBottom: '2.3ch' }}>Select a sacco</label> */}
              {/* <Grid item xs> */}
                <TextField
                  id="sacco"
                  name="sacco"
                  select
                  label="SELECT A SACCO"
                  className={classes.textField}
                  // placeholder = "Select a sacco"
                  style={{ marginBottom: '5ch', marginLeft: '0px' }}
                  SelectProps={{
                    native: true,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  size="small"
                  defaultValue={""}
                  value={sacco}
                  onChange={e=> setSacco(e.target.value) }
                  // error={formik.touched.sacco && Boolean(formik.errors.sacco)}
                  // helperText={formik.touched.sacco && formik.errors.sacco}
                  variant="outlined"
                >

                  {saccos.map((option) => (
                    <option key={option.sacco_name} value={option.sacco_name}>
                      {option.sacco_name}
                    </option>
                  ))}

                </TextField>
              {/* </Grid> */}
              <input
                style={{ marginRight: '50%', marginLeft: '2%', height:'15%' }}
                type='submit'
                value='Load Transactions'
                className='btn btn-outline-primary'
              />
              {/* <div className="btn btn-outline-primary" onClick={()=>{ console.log("Still working on it")}}>{"Upload"}</div> */}
            </form>


            <Grid container spacing={1} style={{ marginBottom: '6%' }}>
              <Grid item xs={12}>

                {loading ? (<CustomizedProgressBars />) :
                  (<MaterialTable
                    title="Transations"
                    style={{ zIndex: '0' }}
                    columns={columns}
                    data={data}
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

                  />)}
              </Grid>

            </Grid>
          </div>
        </Container>
      </>
    </Layout>
  );
}

export default withRouter(SaccoTransactions)