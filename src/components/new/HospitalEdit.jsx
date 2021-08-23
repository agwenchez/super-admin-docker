import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Grid, Button, Paper } from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import Breadcrumb from '../../layout/breadcrumb';
import { useHistory, withRouter } from "react-router-dom";
import Layout from "../AppWrapper"
import { ContactlessOutlined } from '@material-ui/icons';


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

const services = [
    {
        name: 'In-patient'
    },
    {
        name: 'Out-patient'
    }
]

const regions = [
    {
        name: 'Nairobi'
    },
    {
        name: 'North Eastern'
    },
    {
        name: 'Central'
    },
    {
        name: 'Western'
    },
    {
        name: 'Nyanza'
    },
    {
        name: 'Eastern'
    },
    {
        name: 'Rift Valley'
    },
    {
        name: 'Coast'
    }
]


const counties = [
    {
        name: 'Nairobi'
    },
    {
        name: 'Nyandarua'
    },
    {
        name: 'Kiambu'
    },
    {
        name: 'Muranga'
    },
    {
        name: 'Nyeri'
    },
    {
        name: 'Kirinyaga'
    },
    {
        name: 'Makueni'
    },
    {
        name: 'Machakos'
    }
]

const HospitalEdit = ({ location }) => {

    const [data, setData] = useState({})
    const [id, setId] = useState("");
    const classes = useStyles()
    const history = useHistory()


    const getUser = async () => {

        // console.log("member id==>", location.state.id)
        setId(location.state.id)
        try {
            const res = await api.get(`/hospitals/findByID/${id}`)
            const hospital = res.data
            setData(hospital)

        } catch (error) {
            console.log("Error", error)
        }

    }

    useEffect(() => {

        getUser()

    }, [id])


    const onChange = e => setData({ ...data, [e.target.name]: e.target.value })

    const handleSubmit = async e => {
        e.preventDefault();

        const { county, hospital_name, address, phonenumber, alt_phonenumber, region, service, location } = data

        console.log("Data==>", data)
        // console.log("")
        try {
            const res = await api.put(`/hospitals/update/${id}`, { county, hospital_name, address, phonenumber,alt_phonenumber, region, service, location })
            // console.log("response object=>", res.data)  
            toast.success(res.data)
            history.push('/dashboard/hospitals')
        } catch (error) {
            console.log("Error==>", error)
            toast.error(error)
        }


    }

    return (
        <Layout>
            <>
                <Grid item xs="12">
                    <Breadcrumb parent="Hospitals" title="Edit Hospital" />
                </Grid>
                <div className={classes.root} style={{ boxShadow: '5px 5px 20px #263238' }}>
                    <Grid container spacing={3} >
                    <p style={{marginLeft:'6.5%', marginTop:'2%', marginBottom:'-1%'}}>Fields marked with *, are required fields</p>
                        <Grid item xs="12">
                            <form onSubmit={handleSubmit} className={classes.form}>
                                <Grid container spacing={3}>
                                    <Grid item xs="12" sm="6">
                                        <TextField
                                            id="hospital_name"
                                            name="hospital_name"
                                            label="HOSPITAL NAME"
                                            className={classes.textField}
                                            placeholder="Enter hospital name"
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            size="small"
                                            variant="outlined"
                                            value={data.hospital_name}
                                            onChange={e => onChange(e)}
                                            autoFocus
                                            required
                                        />

                                    </Grid>
                                    <TextField
                                            id="service"
                                            name="service"
                                            label="SERVICE"
                                            select
                                            className={classes.textField}
                                            placeholder="Select a service"
                                            margin="normal"
                                            style={{ marginTop:'3ch', marginLeft:'5.2em' }}
                                            SelectProps={{
                                                native: true,
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            size="small"
                                            variant="outlined"
                                            value={data.service}
                                            onChange={e => onChange(e)}
                                            required
                                        >

                                            {services.map((option) => (
                                                <option key={option.name} value={option.name}>
                                                    {option.name}
                                                </option>
                                            ))}
                                        </TextField>

                                </Grid>

                                <Grid container spacing={3}>
                                    <Grid item xs="12" sm="6">
                                        <TextField
                                            label="PHONE NUMBER"
                                            id="phonenumber"
                                            name="phonenumber"
                                            placeholder="Phone Number"
                                            style={{ marginTop: '2.3ch' }}
                                            className={classes.textField}
                                            margin="normal"
                                            size="small"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="outlined"
                                            value={data.phonenumber}
                                            onChange={e => onChange(e)}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs="12" sm="6">
                                        <TextField
                                            label="PHONE NUMBER 2"
                                            id="alt_phonenumber"
                                            name="alt_phonenumber"
                                            placeholder="Phone Number 2"
                                            style={{ marginTop: '2.3ch' }}
                                            className={classes.textField}
                                            margin="normal"
                                            size="small"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="outlined"
                                            value={data.alt_phonenumber}
                                            onChange={e => onChange(e)}
                                        />
                                    </Grid>

                                </Grid>

                                <Grid container spacing={3}>
                                    <Grid item xs="12" sm="6">
                                        <TextField
                                            id="region"
                                            name="region"
                                            label="REGION"
                                            placeholder="Enter region"
                                            select
                                            className={classes.textField}
                                            style={{ marginTop: '2.3ch' }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            SelectProps={{
                                                native: true,
                                            }}
                                            defaultValue={data.region}
                                            size="small"
                                            value={data.region}
                                            variant="outlined"
                                            onChange={e => onChange(e)}
                                            required
                                        >
                                            {regions.map((option) => (
                                                <option key={option.name} value={option.name}>
                                                    {option.name}
                                                </option>
                                            ))}
                                        </TextField>

                                    </Grid>
                                    <Grid item xs="12" sm="6">
                                        <TextField
                                            id="county"
                                            name="county"
                                            label="County"
                                            placeholder="Enter county"
                                            select
                                            className={classes.textField}
                                            style={{ marginTop: '2.3ch' }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            SelectProps={{
                                                native: true,
                                            }}
                                            // defaultValue={data.county}
                                            size="small"
                                            value={data.county}
                                            variant="outlined"
                                            onChange={e => onChange(e)}
                                            required
                                        >
                                            {counties.map((option) => (
                                                <option key={option.name} value={option.name}>
                                                    {option.name}
                                                </option>
                                            ))}
                                        </TextField>
                                    </Grid>

                                </Grid>
                                <Grid container spacing={3}>
                                    <Grid item xs>
                                        <TextField
                                            id="location"
                                            name="location"
                                            label="LOCATION"
                                            className={classes.textField}
                                            margin="normal" 
                                            style={{ marginTop: '2.3ch' }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            size="small"
                                            value={data.location}
                                            variant="outlined"
                                            onChange={e => onChange(e)}
                                            required
                                        />

                                    </Grid>
                                    <Grid item xs>
                                        <TextField
                                            label="ADDRESS"
                                            id="address"
                                            name="address"
                                            placeholder="Enter address"
                                            className={classes.textField}
                                            margin="normal"
                                            style={{ marginTop: '2.3ch' }}
                                            size="small"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="outlined"
                                            value={data.address}
                                            onChange={e => onChange(e)}
                                            required
                                        />
                                    </Grid>

                                </Grid>
                                {/* <Button
                        type="button"
                        className="outline"
                        onClick={formik.handleReset}
                        disabled={!formik.dirty || formik.isSubmitting}
                    >
                    Reset
                    </Button> */}
                                <Grid container style={{ width: '86%', margin: '0 7%' }}>
                                    <Grid item xs="3"></Grid>
                                    <Grid item xs="3"></Grid>
                                    <Grid item xs="3"></Grid>
                                    <Grid item xs="3">

                                        <div className={classes.div}>
                                            <Button type="submit" size="medium" variant="raised" className={classes.button}>
                                                Submit
                            </Button>
                                        </div>
                                    </Grid>
                                </Grid>
                            </form>
                        </Grid>
                    </Grid>

                </div>
            </>
        </Layout>
    );
}

export default withRouter(HospitalEdit)