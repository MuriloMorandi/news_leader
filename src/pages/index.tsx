import Head from 'next/head';
import { GetStaticProps } from 'next';

import { SubscribeButton } from 'components/SubscribrButton';
import styles from 'styles/home.module.scss'
import { stripe } from 'service/stripe';

interface HomeProps{
  product:{
    priceId: string;
    amount: string;
  }
}

export const getStaticProps  = async (params:GetStaticProps) => {
  const price = await stripe.prices.retrieve('price_1KGsi5DmWZ4Pfu9OAH6NLIlb')
  
  const props:HomeProps = {
    product: {
      priceId: price.id,
      amount: new Intl.NumberFormat('en-US', {
        style:'currency',
        currency: price.currency
      }).format(price.unit_amount / 100)
    }
  }

  return {
    props:props,
    revalidate: 60 * 2 //2 min
  }
}
export default function Home({ product }:HomeProps) {
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
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId}/>
        </section>
        
        <img src='/img/avatar.svg' alt='Girl coding'/>
        
      </main>
    </>
  )
}
