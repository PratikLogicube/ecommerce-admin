import { getServerSession } from 'next-auth/next';
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]';

type Props = {
  session: object,
  products: []
}

const index = ({ products }: Props) => {

  console.log({products});
  
  return (
    <section>
      {/* {
        products.map((e) => <p key={e.id}>{ e.title }</p>)
      } */}
    </section>
  )
}

export default index;

export async function getServerSideProps(context: any) {
    const session = await getServerSession(context.req, context.res, authOptions)
    
    // if (!session) {
    //   return {
    //     redirect: {
    //       destination: '/',
    //       permanent: false
    //     }
    //   }
    // }
  
    const products = await fetch('https://fakestoreapi.com/products')
    .then(res=>res.json())

    return {
      props: {
        session,
        products
      }
    }
   
  }