
import styles from '../styles/Loader/Loader.module.css'


export const GlobalLoader: React.FC = () => {
    return (
        <div className={styles['loader-background']}>
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
