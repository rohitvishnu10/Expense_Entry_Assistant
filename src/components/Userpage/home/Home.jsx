import React from "react"
import Cards from "../cards/Cards"
import Charts from "../charts/Charts"
import TableData from "../table/TableData"
import User from "../users/User"
import "./Home.css" // Import the CSS file for styling the Home component

const Home = () => {
  return (
    <>
      <section className='home'>
        <div className='container'>
          <div className='heading flexSB'>
            <h3>Welcome back !</h3>
          </div>
          <Cards/>
          <Charts />
          
        </div>
      </section>
    </>
  )
}

export default Home