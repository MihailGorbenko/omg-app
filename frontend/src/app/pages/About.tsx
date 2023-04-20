import styles from '../styles/About/About.module.css'

const About: React.FC = () => {
    return (
        <div className={styles.container}>
            <h1>OmgApp</h1>
            <p>OmgApp is a Web development study project developed by <a href='https://github.com/MihailGorbenko'>Mihail Gorbenko</a> with the aim of enhancing proficiency in modern web technologies and design patterns.</p>
            <p>The application is built on Typescript, a strongly typed superset of JavaScript, and utilizes the following cutting-edge web libraries:</p>
            <ul>
                <li>React, a powerful JavaScript library for building interactive user interfaces.</li>
                <li>React-Router, a routing library that allows for easy navigation between different components of the app.</li>
                <li>RTK/RTKQuery, a state management solution for Redux that simplifies the creation of efficient and scalable web applications.</li>
                <li>Express, a popular Node.js framework for building robust and scalable web applications, is used as a backend for the app.</li>
            </ul>
            <p>User registration and authentication are handled by a third-party <a href='https://github.com/MihailGorbenko/authentication-service'>Authorization/Authentication service</a> , providing secure and reliable user authentication and access control. The project configuration is managed with Create-React-App, a pre-configured toolchain for building modern React applications.</p>
            <p>The app is deployed using Docker, Docker-Compose, and Traefik, providing a reliable and scalable containerization solution for modern web applications.</p>
            <h2>Features</h2>
            <p>OmgApp provides a rich set of features, including:</p>
            <ul>
                <li>User registration with secure password hashing and validation.</li>
                <li>User login with token-based authentication for secure access control.</li>
                <li>Password reset using user email with secure email handling and validation.</li>
                <li>Profile picture selection with image upload and processing, including thumbnail creation (<b>Not implemented</b>).</li>
                <li>Post creation in Feed with image upload (<b>Not implemented</b>).</li>
                <li>Post liking with real-time updates and notifications (<b>Not implemented</b>).</li>
            </ul>
            <p>To access the project on GitHub, please visit <a href="https://github.com/MihailGorbenko/omg-app">https://github.com/MihailGorbenko/omg-app</a>.</p>
            </div>
    )
}

export default About