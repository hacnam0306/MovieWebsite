import imdb from '../../assets/logo/imdb.png'
import { AiOutlineSearch } from "react-icons/ai";
import styles from './Search.module.scss'
import { NavLink, useNavigate } from 'react-router-dom';
import { useSpring, animated } from 'react-spring'
import { useState } from 'react';
const Search = () => {
    const [searchInfo, setSearchInfo] = useState('')
    const navigate = useNavigate()
    const props = useSpring({ to: { opacity: 1, transform: 'translateX(0))' }, from: { opacity: 0, transform: 'translateX(-100%)' }, config: { duration: 2000 } })

    const handleSubmit = (event) => {
        event.preventDefault(searchInfo);
        if (searchInfo.length > 0) {
            navigate(`/search/${searchInfo}`)
        }
    }
    const handleChangeValue = (name, value) => {
        setSearchInfo(value)
    }

    return (
        <animated.div style={props} >
            <div className={`container-fluid ${styles.search}`}>
                <div className={`row ${styles.searchBoard}`}>
                    <div className="col-md-12 col-lg-6 col-sm-12  col-xs-12">
                        <ul>
                            <li>
                                <NavLink to="/all/28">Action</NavLink>
                            </li>
                            <li>
                                <NavLink to="/all/27">Horror</NavLink>
                            </li>
                            <li>
                                <NavLink to="/all/9648">Mystery</NavLink>
                            </li>
                            <li>
                                <NavLink to="/all/53">Thriller </NavLink>
                            </li>
                            <li>
                                <NavLink to="/all/37">Western </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-12 col-lg-6 col-sm-12 col-xs-12">
                        <form onSubmit={handleSubmit} className={styles.searchForm}>
                            <input autocomplete="off" name="searchInfo" onChange={(event) => {
                                let { name, value } = event.target;
                                handleChangeValue(name, value)
                            }} maxLength="30" type="text" className={` ${styles.searchInput}`} placeholder="Search New Movie.." />
                            <img alt="imdb" src={imdb} className={styles.logo} />
                            <button type='submit'><AiOutlineSearch /> Search</button>
                        </form>
                    </div>
                </div>
            </div>
        </animated.div >

    )
}

export default Search