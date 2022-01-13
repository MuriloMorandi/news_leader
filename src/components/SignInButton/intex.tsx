import { signIn, signOut, useSession } from 'next-auth/react';
import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi';

import styles from './styles.module.scss';

export function SignInButton(){
    const { data: session } = useSession();
    
    return session ? (
        <button type="button" className={styles.SignInButton}>
            <FaGithub color="#04d361"/>
            {session.user.name}
            <FiX color='#737380' className={styles.closeIcon} 
                onClick={ () => { signOut() } }/>
        </button>
    )
    : (
        <button type="button" className={styles.SignInButton} 
            onClick={ () => signIn('github') }
            >
            <FaGithub color="var(--yellow500)"/>
            Sing in with Github
        </button>
    )
}