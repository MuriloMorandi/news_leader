import styles from './styles.module.scss';

export function Header(props:any) {
    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/img/logo.svg" alt="Logo News Leader"/>
                <nav>
                    <a className={styles.active}>Home</a>
                    <a id='active'>Posts</a>
                </nav>
            </div>
        </header>
    )
}