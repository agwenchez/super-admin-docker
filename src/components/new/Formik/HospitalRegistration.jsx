import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Grid, Button, Paper } from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import Breadcrumb from '../../../layout/breadcrumb';
import { useHistory, withRouter } from "react-router-dom";
import Layout from "../../AppWrapper"



const api = axios.create({
    baseURL: `https://afya-kwanza-backend.herokuapp.com/`
  })
  
const validationSchema = yup.object().shape({
    hospital_name: yup
        .string('Enter hospital name')
        .required('Hospital name is a required field'),
    county: yup
        .string('Enter county')
        .required('County is a required field'),
    address: yup
        .string('Enter your address')
        .required('Address is a required field'),
    phonenumber: yup
        .string('Enter phone number')
        .max(10, 'Phone number should be 10 characters max')
        .required('Phone number is a required field'),
    region: yup
        .string('Enter a region')
        .required('Region is a required field'),
    service: yup
        .string('Enter service')
        .required('Service is a required field'),
    location: yup
        .string('Enter location')
        .required('Location is a required field')
   
});



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


const services =[
    {
        name:''
    },
    {
        name:'In-patient'
    },
    {
        name:'Out-patient'
    }
]

const regions =[
    {
        name:''
    },
    {
        name:'Nairobi'
    },
    {
        name:'North Eastern'
    },
    {
        name:'Central'
    }, 
    {
        name:'Western'
    },
    {
        name:'Nyanza'
    }, 
    {
        name:'Eastern'
    }, 
    {
        name:'Rift Valley'
    }, 
    {
        name:'Coast'
    }
]


const counties =[
    {
        name:''
    },
    {
        name:'Nairobi'
    },
    {
        name:'Nyandarua'
    },
    {
        name:'Kiambu'
    }, 
    {
        name:'Muranga'
    },
    {
        name:'Nyeri'
    }, 
    {
        name:'Kirinyaga'
    }, 
    {
        name:'Makueni'
    }, 
    {
        name:'Machakos'
    }
]

const HospitalRegistration = () => {
    const classes = useStyles();
    const [data, setData] = useState([]);



    const formik = useFormik({
        initialValues: {
            hospital_name: '',
            county:'',
            address: '',
            phonenumber: '',
            alt_phonenumber: '',
            region:'',
            location:'',
            service:''
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            
            console.log("Form values==>", values)
            try {
                setSubmitting(true);
                const response = await api.post('/hospitals/add', values, {
                    headers: { token: localStorage.tokenated }
                  })
                console.log("response object", response)
                toast.success(response.data)
                resetForm()
            } catch (error) {
                error.message === 'Network Error' && toast.error("Kindly check your network connection!")
                error.message === 'Request failed with status code 409' && toast.error("Another hosptal with address already exists")
                error.message === 'Request failed with status code 500' && toast.error("Internal Server error")
            }

        },
    });


    //   console.log("here are the mf values=>", formik.values);
    return (
        <Layout>
            <>
                <Grid item xs="12">
                    <Breadcrumb parent="Hospitals" title="Hospital Registration" />
                </Grid>
                <div className={classes.root} style={{ boxShadow: '5px 5px 20px #263238'}}>
                    <Grid container spacing={3} >
                        <p style={{marginLeft:'6.5%', marginTop:'2%', marginBottom:'-1%'}}>Fields marked with *, are required fields</p>
                        <Grid item xs="12">
                            <form onSubmit={formik.handleSubmit} className={classes.form}>
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
                                            value={formik.values.hospital_name}
                                            onChange={formik.handleChange}
                                            error={formik.touched.hospital_name && Boolean(formik.errors.hospital_name)}
                                            helperText={formik.touched.hospital_name && formik.errors.hospital_name}
                                            autoFocus
                                            required                                        
                                        />

                                    </Grid>
                                    <Grid item xs="12" sm="6">
                                    <TextField
                                            id="service"
                                            name="service"
                                            label="SERVICE"
                                            select
                                            className={classes.textField}
                                            placeholder="Select a service"
                                            margin="normal"
                                            defaultValue={""}
                                            SelectProps={{
                                                native: true,
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            size="small"
                                            variant="outlined"
                                            value={formik.values.service}
                                            onChange={formik.handleChange}
                                            error={formik.touched.service && Boolean(formik.errors.service)}
                                            helperText={formik.touched.service && formik.errors.service}
                                            required
                                        >

                                            {services.map((option) => (
                                                <option key={option.name} value={option.name}>
                                                    {option.name}
                                                </option>
                                            ))}
                                        </TextField>

                                    </Grid>

                                </Grid>
       
                                <Grid container spacing={3}>
                                    <Grid item xs="12" sm="6">
                                        <TextField
                                            label="PHONE NUMBER"
                                            id="phonenumber"
                                            name="phonenumber"
                                            placeholder="Enter phone Number"
                                            style={{ marginTop: '2.3ch' }}
                                            className={classes.textField}
                                            margin="normal"
                                            size="small"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="outlined"
                                            value={formik.values.phonenumber}
                                            onChange={formik.handleChange}
                                            error={formik.touched.phonenumber && Boolean(formik.errors.phonenumber)}
                                            helperText={formik.touched.phonenumber && formik.errors.phonenumber}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs="12" sm="6">
                                    <TextField
                                            label="PHONE NUMBER 2"
                                            id="alt_phonenumber"
                                            name="alt_phonenumber"
                                            placeholder="Enter alternative phone Number"
                                            style={{ marginTop: '2.3ch' }}
                                            className={classes.textField}
                                            margin="normal"
                                            size="small"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="outlined"
                                            value={formik.values.alt_phonenumber}
                                            onChange={formik.handleChange}
                                            error={formik.touched.alt_phonenumber && Boolean(formik.errors.alt_phonenumber)}
                                            helperText={formik.touched.alt_phonenumber && formik.errors.alt_phonenumber}
                                        />
                                        
                                    </Grid>

                                </Grid>
                                <Grid container spacing={3}>
                                    <Grid item xs>
                                    <TextField
                                            label="LOCATION"
                                            id="location"
                                            name="location"
                                            placeholder="Enter location"
                                            className={classes.textField}
                                            margin="normal"
                                            size="small"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="outlined"
                                            value={formik.values.location}
                                            onChange={formik.handleChange}
                                            error={formik.touched.location && Boolean(formik.errors.location)}
                                            helperText={formik.touched.location && formik.errors.location}
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
                                            size="small"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="outlined"
                                            value={formik.values.address}
                                            onChange={formik.handleChange}
                                            error={formik.touched.address && Boolean(formik.errors.address)}
                                            helperText={formik.touched.address && formik.errors.address}
                                            required
                                        />
                                    </Grid>

                                </Grid>
                                <Grid container spacing={3}>
                                    <Grid item xs>
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
                                            size="small"
                                            variant="outlined"
                                            value={formik.values.region}
                                            onChange={formik.handleChange}
                                            error={formik.touched.region && Boolean(formik.errors.region)}
                                            helperText={formik.touched.region && formik.errors.region}
                                            required
                                        >
                                             {regions.map((option) => (
                                                <option key={option.name} value={option.name}>
                                                    {option.name}
                                                </option>
                                            ))}
                                        </TextField>
                                       
                                    </Grid>
                                    <Grid item xs>
                                    <TextField
                                            id="county"
                                            name="county"
                                            select
                                            label="COUNTY"
                                            className={classes.textField}
                                            placeholder ='Enter county'
                                            style={{ marginTop: '2.3ch' }}
                                            SelectProps={{
                                                native: true,
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            size="small"
                                            value={formik.values.county}
                                            onChange={formik.handleChange}
                                            error={formik.touched.county && Boolean(formik.errors.county)}
                                            helperText={formik.touched.county && formik.errors.county}
                                            variant="outlined"
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
                                            <Button type="submit" disabled={formik.isSubmitting} size="medium" variant="raised" className={classes.button}>
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

export default withRouter(HospitalRegistration);