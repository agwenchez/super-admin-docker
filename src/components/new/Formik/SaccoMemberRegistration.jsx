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
    baseURL: `https://afya-kwanza-backend.herokuapp.com`
  })
  
const validationSchema = yup.object().shape({
    name: yup
        .string('Enter a name')
        .required('Name is a required field'),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    phonenumber: yup
        .string('Enter phone number')
        .max(10, 'Phone number should be 10 characters max')
        .required('Phone number is a required field'),
    sacco: yup
        .string('Select a sacco')
        .required('Sacco is a required field'),
    location: yup
        .string('Enter location')
        .required('Location is a required field'),
    insurance_plan: yup
        .string('Enter insurance plan')
        .required('Insurance plan is a required field')
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



const SaccoMemberRegistration = () => {
    const classes = useStyles();
    const [saccos, setSaccos] = useState([]);
    const [data, setData] = useState([]);
    useEffect(() => {
      
        // setSaccos(JSON.parse(localStorage.saccos));
        // console.log(("saccos=>", saccos))
    api.get('/saccos/all')
    .then(res => {
        // console.log("data =>", res.data)
      
        const saccos = res.data
        saccos.unshift({sacco_name:""})
        // console.log("Saccos ushifted==>", saccos)
        setData(res.data)
        // localStorage.setItem('saccos', JSON.stringify(res.data))
        // console.log("saccos localstorage =>",localStorage.saccos)

    }
    ).catch(error => {
        console.log("Error", error)
    })
    }, [])

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phonenumber: '',
            sacco: '',
            location: '',
            insurance_plan: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {

            try {
                setSubmitting(true);
                const response = await api.post('/members/add', values)
                console.log("response object", response)
                toast.success(response.data)
                resetForm()
            } catch (error) {
                console.log("Some error occured=>", error.message)
                console.log("error status=>", error.status)
                alert(error)
                // resetForm()
            }

        },
    });


    //   console.log("here are the mf values=>", formik.values);
    return (
        <Layout>
            <>
                <Grid item xs="12">
                    <Breadcrumb parent="Members" title="Sacco Member Registration" />
                </Grid>
                <div className={classes.root} style={{ boxShadow: '5px 5px 20px #263238'}}>
                    <Grid container spacing={3} >
                        <Grid item xs="12">
                            <form onSubmit={formik.handleSubmit} className={classes.form}>
                                <Grid container spacing={3}>
                                    <Grid item xs="12" sm="6">
                                        <TextField
                                            id="name"
                                            name="name"
                                            label="NAME"
                                            className={classes.textField}
                                            placeholder="Enter name"
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            size="small"
                                            variant="outlined"
                                            value={formik.values.name}
                                            onChange={formik.handleChange}
                                            error={formik.touched.name && Boolean(formik.errors.name)}
                                            helperText={formik.touched.name && formik.errors.name}
                                            autoFocus
                                        />

                                    </Grid>
                                    <Grid item xs="12" sm="6">
                                        <TextField
                                            label="EMAIL"
                                            id="email"
                                            name="email"
                                            placeholder="Email"
                                            className={classes.textField}
                                            margin="normal"
                                            size="small"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="outlined"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            error={formik.touched.email && Boolean(formik.errors.email)}
                                            helperText={formik.touched.email && formik.errors.email}
                                        />
                                    </Grid>

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
                                            value={formik.values.phonenumber}
                                            onChange={formik.handleChange}
                                            error={formik.touched.phonenumber && Boolean(formik.errors.phonenumber)}
                                            helperText={formik.touched.phonenumber && formik.errors.phonenumber}
                                        />
                                    </Grid>
                                    <Grid item xs="12" sm="6">
                                        <TextField
                                            id="sacco"
                                            name="sacco"
                                            select
                                            label="Sacco"
                                            className={classes.textField}
                                            // value={saccos}
                                            style={{ marginTop: '2.3ch' }}
                                            SelectProps={{
                                                native: true,
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            size="small"
                                            defaultValue={""}
                                            value={formik.values.sacco}
                                            onChange={formik.handleChange}
                                            error={formik.touched.sacco && Boolean(formik.errors.sacco)}
                                            helperText={formik.touched.sacco && formik.errors.sacco}
                                            variant="outlined"
                                        >

                                            {data.map((option) => (
                                                <option key={option.sacco_name} value={option.sacco_name}>
                                                    {option.sacco_name}
                                                </option>
                                            ))}

                                        </TextField>
                                    </Grid>

                                </Grid>
                                <Grid container spacing={3}>
                                    <Grid item xs>
                                        <TextField
                                            label="LOCATION"
                                            id="location"
                                            name="location"
                                            placeholder="Location"
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
                                        />
                                    </Grid>
                                    <Grid item xs>
                                        <TextField
                                            label="INSURANCE PLAN"
                                            id="insurance_plan"
                                            name="insurance_plan"
                                            placeholder="Insurance plan"
                                            className={classes.textField}
                                            margin="normal"
                                            size="small"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="outlined"
                                            value={formik.values.insurance_plan}
                                            onChange={formik.handleChange}
                                            error={formik.touched.insurance_plan && Boolean(formik.errors.insurance_plan)}
                                            helperText={formik.touched.insurance_plan && formik.errors.insurance_plan}
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

export default SaccoMemberRegistration;