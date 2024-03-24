import React from 'react';
import "./App.css";

function Home() {

    return (
        <main className='main-container'>
            <div className='main-title'>
                <h3>DASHBOARD</h3>
            </div>

            <div className='main-cards'>
                <div className='card' style="background-color: #FB2576;">
                    <div className='card-inner'>
                        <h3>EMPLOYEES</h3>
                        
                    </div>
                    <h1>300</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>CATEGORIES</h3>
                        
                    </div>
                    <h1>4</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>TOTAL SPENT</h3>
                        
                    </div>
                    <h1>₹330000</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>PENDING REQUESTS</h3> 
                    </div>
                    <h1>42</h1>
                </div>
            </div>

            
            
        </main>
    )
}

export default Home;
