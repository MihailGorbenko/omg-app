
import styles from '../styles/Loader/Loader.module.css'


export const LoadingScreen: React.FC = () => {
    return (
        <div className={styles['loader-centred']}>
            <div className={styles['lds-spinner']} >
                <div></div>
                <div></div >
                <div></div>
                <div></div >
                <div></div>
                <div></div >
                <div></div>
                <div></div >
                <div></div>
                <div></div >
                <div></div>
                <div></div >
            </div>
        </div>

    )
}
