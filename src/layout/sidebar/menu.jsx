import {DirectionsBike, Home, Group} from '@material-ui/icons'
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
                title: 'Saccos', icon: Group, type: 'sub', active: false, children: [
                    { path: `/dashboard/saccos`, title: 'All Saccos', type: 'link' },
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
                title: 'Sacco Members', icon: DirectionsBike, type: 'sub', active: false, children: [
                    { path: `/dashboard/members`, title: 'All Sacco Members', type: 'link' },
                ]
            }
        ]
    }
]