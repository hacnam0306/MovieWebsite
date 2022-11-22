
import styles from './Loading.module.scss'
import logo from '../../assets/logo/logo.png'
export const Loading = () => {


    return (
        <div className={styles.loading}>
            <img alt="logo" src={logo} />
        </div>
    )
}


export default Loading