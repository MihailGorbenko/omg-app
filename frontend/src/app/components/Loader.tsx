import styles from '../styles/Loader/Loader.module.css'


export const Loader: React.FC = () => {
    return (
        <div className={styles['lds-spinner']}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    )
}


