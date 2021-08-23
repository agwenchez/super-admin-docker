import {DirectionsBike, Home, Group } from '@material-ui/icons'
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import PaymentIcon from '@material-ui/icons/Payment';
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';
import NotificationsIcon from '@material-ui/icons/Notifications';

export const MENUITEMS = [
    {
        menutitle:"Home",
        menucontent:"",
        Items:[
            {
                title: 'Dashboard', icon: Home, type: 'sub', active: false, children: [
                    // { path: `/dashboard/default`, title: 'Default', type: 'link' },
                    { path: `/dashboard/`, title: 'Home', type: 'link' },
                ]
            }
        ]
    },
    {
        menutitle:"Saccos",
        menucontent:"",
        Items:[
            {
                title: 'Saccos', icon: AirportShuttleIcon, type: 'sub', active: false, children: [
                    { path: `/dashboard/saccos`, title: 'All Saccos', type: 'link' },
                    { path: `/dashboard/saccos/new`, title: 'Add New', type: 'link' },            
                    // { path: `/dashboard/saccos/profile`, title: 'Sacco Profile', type: 'link' }
                    
                ]
            }  
        ]
    },
    {
        menutitle:"Sacco Members",
        menucontent:"",
        Items:[
            {
                title: 'Sacco Members', icon: Group, type: 'sub', active: false, children: [
                    { path: `/dashboard/members`, title: 'All Sacco Members', type: 'link' },
                    { path: `/dashboard/members/import`, title: 'Import Members', type: 'link' },
                    { path: `/dashboard/members/new`, title: 'Add New', type: 'link' },
                ]
            }
        ]
    },
    {
        menutitle:"Hospitals",
        menucontent:"",
        Items:[
            {
                title: 'Hospitals', icon:  LocalHospitalIcon, type: 'sub', active: false, children: [
                    { path: `/dashboard/hospitals`, title: 'All Hospitals', type: 'link' },
                    { path: `/dashboard/hospitals/new`, title: 'Add New', type: 'link' },
                ]
            }
        ]
    },
    {
        menutitle:"Billing",
        menucontent:"",
        Items:[
            {
                title: 'Billing', icon: PaymentIcon, type: 'sub', active: false, children: [
                    { path: `/dashboard/billing/transactions`, title: 'Transaction Logs', type: 'link' },
                    { path: `/dashboard/billing/sacco/transactions`, title: 'Sacco Transactions', type: 'link' },
                ]
            }
        ]
    },
    // {
    //     menutitle:"Notifications",
    //     menucontent:"",
    //     Items:[
    //         {
    //             title: 'Notifications', icon: NotificationsIcon, type: 'sub', active: false, children: [
    //                 { path: `/dashboard/notifications/reminder/sms`, title: 'SMS Reminders', type: 'link' },
    //                 { path: `/dashboard/notifications/reminder/email`, title: 'Email Reminders', type: 'link' },
    //             ]
    //         }
    //     ]
    // }
]



// https://afya-kwanza-backend.herokuapp.com/transaction_update/7623-6990131-1/ws_CO_150720212206374389/Mbwakni/10
// https://afya-kwanza-backend.herokuapp.com/billing/transaction_update/60674-7110046-1/ws_CO_150720211953181353/Mbwakni/10