import React from 'react'
import Header from '../../components/Header/Header'
import styles from './Home.modules.scss'
import MainBoard from './../../components/MainBoard/MainBoard';
const Home = () => {
    return (
        <div className={styles.home}>
            <Header />
            <MainBoard />
        </div>
    )
}

export default Home