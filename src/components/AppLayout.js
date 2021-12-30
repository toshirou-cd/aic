import React from 'react'
import Navbar from './Navbar'
import Topbar from './Topbar/Topbar'
import useStyle  from '../hooks/useStyle'

const AppLayout = ( props ) => {
    const { children, routerPath, navItems } = props;
    const classes = useStyle()
    return (
        <div className={classes.root}>
            <Topbar />
            <Navbar 
                    routerPath={props.routerPath}
                    items={navItems}
                    />
            <div className={classes.page}>
                <div className={classes.toolbar}></div>
                { children }
            </div>
        </div>
    )
}

export default AppLayout
