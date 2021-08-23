import React, { Fragment } from 'react';
import Breadcrumb from '../../layout/breadcrumb'
import { Container, Row, Col, Card, CardHeader, CardBody, Form } from 'reactstrap'
import Dropzone from 'react-dropzone-uploader';
import { ToastContainer, toast } from 'react-toastify';
import { withRouter } from "react-router-dom";
import { Upload, PlusSquare } from 'react-feather';
import Layout from '../AppWrapper'

const Dropzones = (props) => {
    const getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }
    const handleChangeStatus = ({ meta, file }, status) => {
    }
    const handleSubmit = (files, allFiles) => {
        allFiles.forEach(f => f.remove())
        toast.success("Dropzone successfully submitted !");
    }
    const onFileUpload = () =>{
        toast.success("File uploaded succesfully")
    }
    return (
        <Fragment>
            <Layout>
                <Breadcrumb parent="Bouns Ui" title="Dropzone" />
                <Container fluid={true}>
                    <div className="media-body">
                        <div className="btn btn-outline-primary ml-2" onClick={onFileUpload}><Upload />{"Upload"}</div>
                    </div>
                   
                </Container>
            </Layout>
        </Fragment>
    );
}

export default withRouter(Dropzones);