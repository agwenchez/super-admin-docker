import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Grid, Button, Paper } from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import Breadcrumb from '../../../layout/breadcrumb';
import { withRouter } from 'react-router';
import Layout from "../../AppWrapper"

const api = axios.create({
    baseURL: `https://afya-kwanza-backend.herokuapp.com/`
})

const validationSchema = yup.object().shape({
    sacco_name: yup
        .string('Enter a name')
        .required('Sacco Name is a required field'),
    sacco_email: yup
        .string('Enter a sacco email')
        .email('Enter a valid email')
        .required('Email is required'),
    admin_email: yup
        .string('Enter an admin email')
        .email('Enter a valid email')
        .required('Email is required'),
    admin_firstname: yup
        .string('Enter Admin First Name')
        .max(30, 'Admin name should be 30 characters max')
        .required('Admin First Name is a required field'),
    admin_lastname: yup
        .string('Enter Admin Last Name')
        .max(30, 'Admin name should be 30 characters max')
        .required('Admin Last Name is a required field'),
    admin_password: yup
        .string('Enter an admin password')
        .required('Admin password is a required field'),
    admin_phonenumber: yup
        .string('Enter phone number')
        .max(10, 'Phone number should be 10 characters max')
        .required('Phone number is a required field'),
});


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(10),
        borderRadius: '15px',
        backgroundColor: 'white',
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2)
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
}));

const SaccoRegistration = () => {
    const classes = useStyles();
    // const [data, setData] = React.useState({});

    const formik = useFormik({
        initialValues: {
            sacco_name: '',
            admin_email: "",
            sacco_email: "",
            admin_lastname: "",
            admin_firstname: "",
            role: "sacco_admin",
            admin_phonenumber: "",
            admin_password: ""
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                setSubmitting(true);
                const response = await api.post('/saccos/add', values)
                if (response.status === 201) {
                    toast.success(response.data)
                    resetForm()
                }
            } catch (error) {
                console.log("Some error occured=>", error.message)
                if (error.message === 'Request failed with status code 409') {
                    toast.error('Sacco with that name already exists')
                }else if(error.message === 'Request failed with status code 422'){
                    toast.error('Sacco admin with that email already exists')
                }else {
                    toast.error('Internal server error')
                }
                // resetForm()
            }

        },
    });


    return (
        <Layout>
            <Grid item xs="12">
                <Breadcrumb parent="Saccos" title="Sacco Registration" />
            </Grid>
            <div className={classes.root} style={{ boxShadow: '5px 5px 20px #263238', paddingBottom: '5%'}}>
                <Grid container spacing={3} >
                    {/* <h5 style={{borderBottom: '2px solid black'}}>Sacco Details</h5> */}
                    {/* <hr/> */}
                    <Grid item xs="12">
                        <form onSubmit={formik.handleSubmit} className={classes.form}>
                            <Grid container spacing={3}>
                                <Grid item xs="12" sm="6">
                                    <TextField
                                        id="sacco_name"
                                        name="sacco_name"
                                        label="SACCO NAME"
                                        className={classes.textField}
                                        placeholder="Enter sacco name"
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        size="small"
                                        variant="outlined"
                                        value={formik.values.sacco_name}
                                        onChange={formik.handleChange}
                                        error={formik.touched.sacco_name && Boolean(formik.errors.sacco_name)}
                                        helperText={formik.touched.sacco_name && formik.errors.sacco_name}
                                        autoFocus
                                    />

                                </Grid>
                                <Grid item xs="12" sm="6">
                                    <TextField
                                        label="SACCO EMAIL"
                                        id="sacco_email"
                                        name="sacco_email"
                                        placeholder="Enter sacco email"
                                        className={classes.textField}
                                        margin="normal"
                                        size="small"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.sacco_email}
                                        onChange={formik.handleChange}
                                        error={formik.touched.sacco_email && Boolean(formik.errors.sacco_email)}
                                        helperText={formik.touched.sacco_email && formik.errors.sacco_email}
                                    />
                                </Grid>

                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs="12" sm="6">
                                    <TextField
                                        label="ADMIN FIRST NAME"
                                        id="admin_firstname"
                                        name="admin_firstname"
                                        placeholder="Enter Admin First Name"
                                        style={{ marginTop: '2.3ch' }}
                                        className={classes.textField}
                                        margin="normal"
                                        size="small"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.admin_firstname}
                                        onChange={formik.handleChange}
                                        error={formik.touched.admin_firstname && Boolean(formik.errors.admin_firstname)}
                                        helperText={formik.touched.admin_firstname && formik.errors.admin_firstname}
                                    />
                                </Grid>
                                <Grid item xs="12" sm="6">
                                    <TextField
                                        label="ADMIN LAST NAME"
                                        id="admin_lastname"
                                        name="admin_lastname"
                                        placeholder="Enter Admin Last Name"
                                        style={{ marginTop: '2.3ch' }}
                                        className={classes.textField}
                                        margin="normal"
                                        size="small"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.admin_lastname}
                                        onChange={formik.handleChange}
                                        error={formik.touched.admin_lastname && Boolean(formik.errors.admin_lastname)}
                                        helperText={formik.touched.admin_firstname && formik.errors.admin_lastname}
                                    />

                                </Grid>

                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs="12" sm="6">
                                    <TextField
                                        label="ADMIN EMAIL"
                                        id="admin_email"
                                        name="admin_email"
                                        placeholder="Enter Admin Email"
                                        style={{ marginTop: '2.3ch' }}
                                        className={classes.textField}
                                        margin="normal"
                                        size="small"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.admin_email}
                                        onChange={formik.handleChange}
                                        error={formik.touched.admin_email && Boolean(formik.errors.admin_email)}
                                        helperText={formik.touched.admin_email && formik.errors.admin_email}
                                    />

                                </Grid>
                                <Grid item xs="12" sm="6">
                                    <TextField
                                        label="ADMIN PHONENUMBER"
                                        id="admin_phonenumber"
                                        name="admin_phonenumber"
                                        placeholder="Enter Admin phonenumber"
                                        style={{ marginTop: '2.3ch' }}
                                        className={classes.textField}
                                        margin="normal"
                                        size="small"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.admin_phonenumber}
                                        onChange={formik.handleChange}
                                        error={formik.touched.admin_phonenumber && Boolean(formik.errors.admin_phonenumber)}
                                        helperText={formik.touched.admin_phonenumber && formik.errors.admin_phonenumber}
                                    />
                                </Grid>

                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs="12" sm="6">
                                    <TextField
                                        label="ADMIN PASSWORD"
                                        id="admin_password"
                                        name="admin_password"
                                        placeholder="Enter Admin password"
                                        style={{ marginTop: '2.3ch' }}
                                        className={classes.textField}
                                        margin="normal"
                                        size="small"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.admin_password}
                                        onChange={formik.handleChange}
                                        error={formik.touched.admin_password && Boolean(formik.errors.admin_password)}
                                        helperText={formik.touched.admin_password && formik.errors.admin_password}
                                    />
                                </Grid>
                                <Grid item xs="12" sm="6">
                                    <TextField
                                        label="Role"
                                        id="role"
                                        name="role"
                                        style={{ marginTop: '2.3ch' }}
                                        className={classes.textField}
                                        margin="normal"
                                        size="small"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={
                                            { readOnly: true, }
                                        }
                                        variant="outlined"
                                        value={formik.values.role}
                                    // onChange={formik.handleChange}
                                    // error={formik.touched.admin_password && Boolean(formik.errors.admin_password)}
                                    // helperText={formik.touched.admin_password && formik.errors.admin_password}
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
        </Layout>
    );
}

export default withRouter(SaccoRegistration)