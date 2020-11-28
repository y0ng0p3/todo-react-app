import React from 'react';

import { NavLink } from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ListIcon from '@material-ui/icons/List';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import styles from './Navbar.module.css';

const Navbar = () => {
    const [value, setValue] = React.useState(0);

    return (
        <nav className={styles.navbar}>
            <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                showLabels
            >
                <NavLink
                    exact 
                    activeClassName={styles.navbar__link__active} 
                    className={styles.navbar__link} 
                    to="/"
                >
                    <BottomNavigationAction label="List" icon={<ListIcon />} />
                </NavLink>

                <NavLink
                    exact 
                    activeClassName={styles.navbar__link__active} 
                    className={styles.navbar__link} 
                    to="/new"
                >
                    <BottomNavigationAction label="New" icon={<AddCircleIcon />} />
                </NavLink>

                {/* <BottomNavigationAction 
                    label={
                        <NavLink 
                            exact 
                            activeClassName={styles.navbar__link__active} 
                            className={styles.navbar__link} 
                            to="/"
                        >
                            List
                        </NavLink>
                    } 
                    icon={<ListIcon />} 
                />
                
                <BottomNavigationAction 
                    label={
                        <NavLink 
                            activeClassName={styles.navbar__link__active} 
                            className={styles.navbar__link} 
                            to="/new"
                        >
                            New
                        </NavLink>
                    } 
                    icon={<AddCircleIcon />} 
                />
 */}
            </BottomNavigation>

            {/* <NavLink
                exact
                activeClassName={styles.navbar__link__active}
                className={styles.navbar__link}
                to="/"
            >
                List
            </NavLink>
            <NavLink
                activeClassName={styles.navbar__link__active}
                className={styles.navbar__link}
                to="/new"
            >
                New
            </NavLink> */}
        </nav>
    );
}

export default Navbar;
