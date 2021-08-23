import React, { useEffect, useState } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useHistory } from "react-router-dom"
import axios from 'axios'

const api = axios.create({
    baseURL: `https://afya-kwanza-backend.herokuapp.com/`
})

const ProtectedRoute = ({ Component }) => {
    const history = useHistory()
    const [profile, setProfile] = useState({})
    const getProfile = async () => {

        try {
            const res = await api.get("/admin/is-verified", {
                headers: { token: localStorage.tokenated }
            });

            return res.data
        } catch (err) {
            console.error(`An error occured: ${err.message}`);
        }
    }
  

    useEffect(() => {
   
        // // console.log("Stored token=>", localStorage.tokenated)
        !localStorage.tokenated && history.push('/login')

         const interval = setInterval(() => {
            (async () => {

                const check_profile = await getProfile()
                // console.log("Profile update==>", profile)
                setProfile(check_profile)
                if(!profile){
                    localStorage.removeItem('tokenated')
                    history.push('/login')
                }
                // console.log("Removed token==>",localStorage.tokenated)

            })()
        }, 10000);

        return () => clearInterval(interval)
    }, [profile])


    return (

        <>
            <Component />
        </>
    )
}

export default ProtectedRoute
