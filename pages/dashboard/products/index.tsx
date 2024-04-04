import Link from 'next/link'
import React from 'react'

type Props = {}

const index = (props: Props) => {
  return (
      <div>
          <Link href='products/addProduct'>add product</Link>
    </div>
  )
}

export default index