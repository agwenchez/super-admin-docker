import React, { Fragment, useEffect, useState } from 'react';
import ThemeCustomizer from "../layout/theme-customizer"
import Layout from "./AppWrapper"
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "../components/dashboard/dashboard"
import Login from "../components/new/Login"
import Members from "../components/new/MembersTable"
import Saccos from "../components/new/SaccoTable"
import MembersRegistration from "../components/new/Formik/SaccoMemberRegistration"
import SaccoRegistration from "../components/new/Formik/SaccoRegistration"
import Axios from 'axios';
import SaccoMemberRegistration from '../components/new/Formik/SaccoMemberRegistration';
import ProtectedRoute from "../auth/ProtectedRoute"
import SaccoProfile from '../components/new/SaccoProfile';
import MemberEdit from './new/MemberEdit';
import AdminProfile from './new/AdminProfile';
import HospitalsTable from './new/HospitalsTable';
import HospitalRegistration from './new/Formik/HospitalRegistration';
import HospitalEdit from './new/HospitalEdit';
import DependantsTable from './new/DependantsTable';
import DependantsRegistration from './new/Formik/DependantsRegistration';
import DependantEdit from './new/DependantEdit';
import Transactions from './new/Transactions';
// import UserProfile from './users/userProfile';
import axios from 'axios'
import FileUploader from './new/FileUploader';
import FileUpload from './new/FileUpload';
import SaccoTransactions from './new/SaccoTransactions';


const api = axios.create({
  baseURL:`https://afya-kwanza-backend.herokuapp.com/`
})
const App = () => {


  return (
    
    <>
      <Router basename={'/afya/super-admin'}>
        <Switch>
          {/* <Route
            exact
            path="/login"
            render={() =>
              token === undefined || user === null ? (
                <Login />
              ) : (
                <Redirect to="/dashboard" />
              )
            }
          /> */}
          <Route exact path='/' render={() => <Redirect to="/dashboard" />} />
          <Route exact path='/login' component={Login}  render={() => localStorage.tokenated && <Redirect to="/dashboard" />}/>

          <Route path="/dashboard/members/import">
            <ProtectedRoute Component={FileUpload}/>
          </Route>

          <Route path="/dashboard/billing/sacco/transactions">
            <ProtectedRoute Component={SaccoTransactions}/>
          </Route>

          <Route path="/dashboard/billing/transactions">
            <ProtectedRoute Component={Transactions}/>
          </Route>

          <Route path="/dashboard/members/dependants/edit">
            <ProtectedRoute Component={DependantEdit}/>
          </Route>

          <Route path="/dashboard/members/dependants/new">
           <ProtectedRoute Component={DependantsRegistration}/>
          </Route>
          
          <Route path="/dashboard/saccos/new">
            <ProtectedRoute Component={SaccoRegistration}/>
          </Route>

          <Route path="/dashboard/hospitals/new">
            <ProtectedRoute Component={HospitalRegistration}/>
          </Route>

          <Route path="/dashboard/hospitals/edit">
            <ProtectedRoute Component={HospitalEdit}/>
          </Route>

          <Route path="/dashboard/hospitals">
            <ProtectedRoute Component={HospitalsTable}/>
          </Route>

          <Route path="/dashboard/admin/profile">    
            <ProtectedRoute Component={AdminProfile}/>
          </Route>

          <Route path="/dashboard/members/new">
            <ProtectedRoute Component={SaccoMemberRegistration}/>
          </Route>

          <Route path="/dashboard/members/edit">
            <ProtectedRoute Component={MemberEdit}/>
          </Route>

          <Route path="/dashboard/members/dependants">
            <ProtectedRoute Component={DependantsTable}/>
          </Route>


          <Route path="/dashboard/saccos/edit">
            <ProtectedRoute Component={SaccoProfile}/>
          </Route>
        
          <Route path="/dashboard/members">
            <ProtectedRoute Component={Members}/>
          </Route>
          
          <Route path="/dashboard/saccos">
            <ProtectedRoute Component={Saccos}/>
          </Route>
         
          <Route path="/dashboard">
            <ProtectedRoute Component={Dashboard}/>
          </Route>

          


          {/* <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/dashboard/saccos' component={Saccos} />
          <Route exact path='/dashboard/members' component={Members} />
          <Route exact path='/dashboard/members/new' component={MembersRegistration} />
          <Route exact path='/dashboard/saccos/new' component={SaccoRegistration} />  */}
        </Switch>
      </Router>
      <ToastContainer />
      <ThemeCustomizer />
    </>
  );
}
export default App;