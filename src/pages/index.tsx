import { SubscribeButton } from 'components/SubscribrButton';
import Head from 'next/head';
import styles from 'styles/home.module.scss'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | News Leader</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcomes</span>
          <h1>
            New about the <span> React</span> World.
          </h1>
          <p>
            Get acess to all the publications <br/>
            <span>for $9.90 month</span>
          </p>
          <SubscribeButton/>
        </section>
        
        <img src='/img/avatar.svg' alt='Girl coding'/>
        
      </main>
    </>
  )
}
