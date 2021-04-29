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
// import UserProfile from './users/userProfile';

const App = () => {
  const [token,setToken]= useState('')
  const logout = ()=>{
  
      setToken(localStorage.removeItem("tokenated"))
      window.location.href = '/login'
    
  }

  useEffect(()=>{
    setInterval(logout, 60000*45);
  },[token])


  return (
    
    <Fragment>
      {/* <Layout /> */}

      <Router basename={'/'}>
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
          <Route exact path='/login' component={Login} />
          <Route path="/dashboard/saccos/new">
            <ProtectedRoute Component={SaccoRegistration}/>
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

          



           {/* <Route
            exact
            path="/dashboard"
            render={() =>
              token === undefined || user === null ? (
                <Login />
              ) : (
                <Dashboard/>
              )
            }
          /> */}

          {/* <Route
            exact
            path="/dashboard/members"
            render={() =>
              token !== undefined || user !== null ? (
                <Members />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/dashboard/members/new"
            render={() =>
              token !== undefined || user !== null ? (
                <SaccoMemberRegistration />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/dashboard/saccos"
            render={() =>
              token !== undefined || user !== null ? (
                <Saccos />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/dashboard/saccos/new"
            render={() =>
              token !== undefined || user !== null ? (
                <SaccoRegistration />
              ) : (
                <Redirect to="/login" />
              )
            }
          /> */}


          {/* <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/dashboard/saccos' component={Saccos} />
          <Route exact path='/dashboard/members' component={Members} />
          <Route exact path='/dashboard/members/new' component={MembersRegistration} />
          <Route exact path='/dashboard/saccos/new' component={SaccoRegistration} />  */}
        </Switch>
      </Router>
      <ToastContainer />
      <ThemeCustomizer />
    </Fragment>
  );
}
export default App;