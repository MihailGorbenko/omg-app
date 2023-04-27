import styles from '../styles/ProgressBar/ProgressBar.module.css'


type Props = {
    progress: number
}

export const ProgressBar: React.FC<Props> = ({ progress }) => {


    return (
        <div className={styles['progress-bar']}>
            <div className={
                styles['progress-slider']}
                style={{ width: `${progress}%` }}></div>
        </div>
    )
}