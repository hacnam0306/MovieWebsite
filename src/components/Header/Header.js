import React, { useState } from 'react'
import logo from '../../assets/logo/logo.png'
import styles from './Header.module.scss'
import { AiOutlineSetting, AiOutlineBell, AiOutlineMenu } from "react-icons/ai";
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Move from './../Move/Move';

const Header = ({ transparent }) => {
    const [showMenu, setShowMenu] = useState(false)
    const { tvSeries, movieList } = useSelector(state => state.MovieReducer)

    return (

        <div className={transparent ? `${styles.header} transparent container-fluid` : `${styles.header} container-fluid`}>
            <div>
                <NavLink activeClassName="active" to='/'>
                    <img alt="logo" className={styles.logo} src={logo} />
                </NavLink>
            </div>
            <AiOutlineMenu className={styles.menu} size='34' color='white' onClick={() => setShowMenu(!showMenu)} />
            <ul className={showMenu ? ` ${styles.show}` : ''} >
                <li >
                    <NavLink activeClassName="active" to={`/series/${tvSeries[0]?.id}`}>TV Series</NavLink>
                </li>
                <li>

                    <NavLink activeClassName="active" to="/home">MainBoard</NavLink>
                </li>
                <li>
                    <NavLink activeClassName="active" to={`/movieTrending/${movieList[0]?.id}`} >Movies Trending</NavLink>
                </li>
                <li>
                    <NavLink activeClassName="active" to="/all/28" >All </NavLink>
                </li>
            </ul>
            <ul className={showMenu ? ` ${styles.show}` : ''}>
                <li>
                    <Move rotation={90}
                        timing={200}
                        springConfig={{ tension: 200, friction: 7 }}>
                        <NavLink to="/"><AiOutlineSetting color="white" size="18" /></NavLink>
                    </Move>
                </li>
                <li>
                    <Move x={5}>
                        <NavLink to="/"><AiOutlineBell color="white" size="18" /> </NavLink>
                    </Move>
                </li>
                <li>

                    <button className="btn ">Log In</button>
                </li>
            </ul>

        </div >
    )

}
export default Header