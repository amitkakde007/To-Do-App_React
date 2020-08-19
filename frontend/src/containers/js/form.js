import React,{Component} from 'react'
import '../../containers/css/form.css'
import axios from 'axios'

class Form extends Component{
	constructor(props){
		super(props)
		this.state={
			title:'',
		}
	}

	getCookie(name){
		let cookieValue = null;
		if (document.cookie && document.cookie !== '') {
			const cookies = document.cookie.split(';');
			for (let i = 0; i < cookies.length; i++) {
				const cookie = cookies[i].trim();
				// Does this cookie string begin with the name we want?
				if (cookie.substring(0, name.length + 1) === (name + '=')) {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	}

	titleChange=event=>{
		this.setState({
			title:event.target.value
		},console.log(this.state.title))
	}
	formSubmit=event=>{
		const csrftoken = this.getCookie('csrftoken');
		let createUrl='http://localhost:8000/api/task-viewset/'
		axios(createUrl,{
			method:'POST',
			headers:{
				'Content-type':'application/json',
				'X-CSRFToken':csrftoken,
			},
			body:JSON.stringify({'Title':event.target.value})
		})
	}
	render(){
		const {title}=this.state
		return(
			<form id="formWrapper">
				<div className="flexWrapper">
					<div style={{flex: 6}}>
						<input id="title" className="form-control" type="text" name={title} placeholder="Add task" onChange={this.titleChange} />
					</div>
					<div style={{flex: 1}}>
						<input  className="btn btn-outline-primary" type="submit" onClick={this.formSubmit}/>
	    			</div>
				</div>
			</form>
		)
	}
}

export default Form