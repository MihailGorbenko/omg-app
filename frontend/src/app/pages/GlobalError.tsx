import { useRouteError } from "react-router-dom"
import styles from '../styles/Errors/GlobalError.module.css'
import Image from 'react-bootstrap/Image'


export const GlobalError: React.FC = () => {
    const error: any = useRouteError()
    console.log(error);


    return (
        <div className={styles.container}>
            <Image fluid src="../../bug.png" className={styles['bug-image']} />
            <details>
                <summary>Error Report</summary>
                <p>
                   <code>
                    <pre >
                    {JSON.stringify(error,null,4)}
                    </pre>
                   </code>
                </p>
            </details>

        </div>
    )
}