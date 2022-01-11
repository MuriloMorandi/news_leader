import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi';

import styles from './styles.module.scss';

export function SignInButton(){
    const isUserLoggerdIn = true;

    return isUserLoggerdIn ? (
        <button type="button" className={styles.SignInButton}>
            <FaGithub color="#04d361"/>
            Murilo Morandi
            <FiX color='#737380' className={styles.closeIcon}/>
        </button>
    )
    : (
        <button type="button" className={styles.SignInButton}>
            <FaGithub color="var(--yellow500)"/>
            Sing in with Github
        </button>
    )
}