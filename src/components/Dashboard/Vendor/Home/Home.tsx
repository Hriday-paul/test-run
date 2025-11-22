import React from 'react'
import AddStats from './AddStats'
import Payments from './Payments'

function Home() {
  return (
    <div>
        {/* ------------stats------------ */}
        <AddStats />

        <Payments />

    </div>
  )
}

export default Home