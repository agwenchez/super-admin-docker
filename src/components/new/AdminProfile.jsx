import React, { Fragment, useEffect, useState } from 'react';
import Breadcrumb from '../../layout/breadcrumb'
import { Container, Row, Col, Card, CardHeader, CardBody, CardFooter, Media, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios'
import Layout from "../AppWrapper";
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { withRouter , useHistory} from 'react-router';
import Avatar from 'react-avatar'

const api = axios.create({
  baseURL: `https://afya-kwanza-backend.herokuapp.com`
})


const AdminProfile = ({location}) => {

  const [data, setData] = useState({})
  // const [token, setToken] = useState('')
  const [user, setUser] = useState({})
  const [id, setId] = useState('')
  const [token, setToken] = useState('')
  const history = useHistory()


  const getProfile = async () => {
    setToken(localStorage.tokenated)
    // console.log("Stored token=>",token)
    try {
      const res = await api.get("/admin/is-verified", {
        headers: { token: token }
      });


      console.log("Admin from server=>", res.data.admin)
      setUser(res.data.admin)

    } catch (err) {
      console.error(err.message);
    }
  };


  const onChange = e => setData({...data, [e.target.name]: e.target.value})

//   const handleSubmit = async e =>{
//     e.preventDefault();

//     const {sacco_name, sacco_email,admin_email,admin_firstname,admin_lastname,admin_phonenumber} = data

//     try {
//       const res = await api.put(`/saccos/update/${id}`, {sacco_name, sacco_email,admin_email,admin_firstname,admin_lastname,admin_phonenumber})
//       toast.success(res.data.msg)
//       history.push('/dashboard/saccos')
//     } catch (error) {
//       toast.error(error)
//     }


//   }


  useEffect(() => {

    getProfile()
    // setId(location.state.id)
    // console.log("sacco id=>", id)

  }, [token])

 

  return (
    <Fragment>
      <Layout>
        <Breadcrumb parent="Dashboard" title="Admin Profile" />
        <Container fluid={true}>
          <div className="edit-profile" style={{marginTop:'3%'}}>
            <form >
              <Row>
                <Col xl="4">
                  <Card style={{ boxShadow: '5px 5px 20px #263238'}}>
                    <CardHeader>
                      <h4 className="card-title mb-0">Admin Profile</h4>
                      {/* <div className="card-options">
                      <a className="card-options-collapse" href="#javascript">
                        <i className="fe fe-chevron-up"></i>
                      </a>
                      <a className="card-options-remove" href="#javascript">
                        <i className="fe fe-x"></i>
                      </a>
                    </div> */}
                    </CardHeader>
                    <CardBody style={{ marginTop: "7%" }}>
                      <Row className="mb-4">
                        <div className="col-auto">
                         <Avatar maxInitials={1} size={60} round={true} name={user.name}  color={'blue'}/> 
                        </div>
                        <Col>
                          <h5 className="mb-1 mt-2">Name: {user.name}</h5>
                          <p className="mb-2">Role: super_admin</p>
                        </Col>
                      </Row>
                      {/* <FormGroup>
                        <Label className="form-label">Sacco Name</Label>
                        <Input className="form-control" type="text" placeholder="First Name" name="sacco_name" defaultValue={data.sacco_name} onChange={e => onChange(e)} autoFocus/>
                      </FormGroup>
                      <FormGroup>
                        <Label className="form-label">Sacco Email</Label>
                        <Input className="form-control" type="text" placeholder="Last Name" name="sacco_email" defaultValue={data.sacco_email}  onChange={e => onChange(e)}/>
                      </FormGroup> */}

                    </CardBody>
                  </Card>
                </Col>
                <Col xl="8">
                  <div className="card" style={{ boxShadow: '5px 5px 20px #263238'}}>
                    <CardHeader>
                      <h4 className="card-title mb-0">Super Admin Details</h4>
                      <div className="card-options">
                        <a className="card-options-collapse" href="#javascript">
                          <i className="fe fe-chevron-up"></i>
                        </a>
                        <a className="card-options-remove" href="#javascript">
                          <i className="fe fe-x"></i>
                        </a>
                      </div>
                    </CardHeader>
                    <CardBody>
                      <Row>
                        <Col sm="6" md="6" style={{ marginTop: "5%" }}>
                          <FormGroup>
                            <Label className="form-label">Admin Name</Label>
                            <Input className="form-control" type="text" readOnly="read-only" placeholder="First Name" name="admin_firstname" defaultValue={user.name}  onChange={e => onChange(e)}/>
                          </FormGroup>
                        </Col>
                        <Col sm="6" md="6" style={{ marginTop: "5%" }}>
                          <FormGroup>
                            <Label className="form-label">Admin Email</Label>
                            <Input className="form-control" type="email" readOnly="read-only" placeholder="Last Name" name="admin_lastname" defaultValue={user.email}  onChange={e => onChange(e)}/>
                          </FormGroup>
                        </Col>
                        {/* <Col sm="6" md="6">
                          <FormGroup>
                            <Label className="form-label">Admin email</Label>
                            <Input className="form-control" type="email" placeholder="Sacco Name" name="admin_email" defaultValue={data.admin_email}  onChange={e => onChange(e)}/>
                          </FormGroup>
                        </Col>
                        <Col sm="6" md="6">
                          <FormGroup>
                            <Label className="form-label">Phone Number</Label>
                            <Input className="form-control" type="text" placeholder="Phone Number" name="admin_phonenumber" defaultValue={data.admin_phonenumber} onChange={e => onChange(e)} />
                          </FormGroup>
                        </Col> */}

                        {/* <Col md="12">
                        <FormGroup>
                          <Label className="form-label">Address</Label>
                          <Input className="form-control" type="text" placeholder="Home Address" />
                        </FormGroup>
                      </Col>
                      <Col sm="6" md="4">
                        <FormGroup>
                          <Label className="form-label">City</Label>
                          <Input className="form-control" type="text" placeholder="City" />
                        </FormGroup>
                      </Col>
                      <Col sm="6" md="3">
                        <FormGroup>
                          <Label className="form-label">Postal Code</Label>
                          <Input className="form-control" type="number" placeholder="ZIP Code" />
                        </FormGroup>
                      </Col>
                      <Col md="5">
                        <FormGroup>
                          <Label className="form-label">Country</Label>
                          <Input type="select" name="select" className="form-control btn-square">
                            
                          </Input>
                        </FormGroup>
                      </Col> */}

                      </Row>
                    </CardBody>
                    {/* <CardFooter className="text-right">
                      <button className="btn btn-primary" type="submit">Update</button>
                    </CardFooter> */}
                  </div>
                </Col>
              </Row>
            </form>
          </div>
        </Container>
      </Layout>
    </Fragment>
  );
}

export default withRouter(AdminProfile);