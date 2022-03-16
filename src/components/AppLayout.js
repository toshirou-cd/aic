import React , {useState } from 'react'
import Navbar from './Navbar'
import Topbar from './Topbar/Topbar'
import useStyle  from '../hooks/useStyle'
import Notification from './Notification'

const AppLayout = ( props ) => {
    const { children, routerPath, navItems } = props;

//     // state for notify
//   const [notify, setNotify] = useState({
//     isOpen : true,
//     message : 'OKay ',
//     type : 'error',
//   })

    const classes = useStyle()
    return (
        <div className={classes.root}>
            <Topbar />
            <Navbar 
                    routerPath={routerPath}
                    items={navItems}
                    />
            <div className={classes.page}>
                <div className={classes.toolbar}></div>
                { children }
            </div>

            <Notification/>
        </div>
    )
}

export default AppLayout
