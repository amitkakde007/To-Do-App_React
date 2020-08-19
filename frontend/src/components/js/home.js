import React ,{ Component } from 'react';
import Form from '../../containers/js/form'
import List from '../../containers/js/list'
import '../css/home.css'
//import axios from 'axios'

function Home(){
    return(
        <div className="container">
		    <div id="taskContainer" > 
                <Form />
                <List />
		    </div>
	    </div>
    )
}

export default Home