import React ,{ Component } from 'react';
import Form from '../../containers/js/form'
import '../css/home.css'
//import axios from 'axios'

function Home(){
    return(
        <div className="container">
		    <div id="taskContainer" > 
                <Form />
		    </div>
	    </div>
    )
}

export default Home