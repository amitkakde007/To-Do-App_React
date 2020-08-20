import React,{Component} from 'react'
import '../../containers/css/form.css'
import list from '../../containers/js/list'
import List from '../../containers/js/list'

class Form extends Component{
	constructor(props){
		super(props)
		this.state={
			title:'',
			id:'',
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
		this.setState({title:event.target.value})
	}
	titleUpdate=(id,title)=>{
		this.setState({
			title:title,
			id:id,
		})
	}
	formData=(event)=>{
		let url,httpVerb;
		let csrftoken = this.getCookie('csrftoken')
		url='http://localhost:8000/api/task-viewset/'
		httpVerb='POST'
		if (this.state.id!==''){
			url=`http://localhost:8000/api/task-viewset/${this.state.id}/`
		httpVerb='PUT'
		}
		fetch(url,{
			method:httpVerb,
			headers:{
				'Content-type':'application/json',
				'X-CSRFToken':csrftoken
			},
			body:JSON.stringify({
				'Title':this.state.title
			})
		}).then(this.refs.fetchData.listData(), this.setState({title:'',id:''}))
		event.preventDefault()
	}
	catchActiveId=(id)=>{
		let csrftoken = this.getCookie('csrftoken')
		fetch(`http://localhost:8000/api/task-viewset/${id}/`,{
			method:'DELETE',
			headers:{
				'Content-type':'application/json',
				'X-CSRFToken':csrftoken
			},
			body:JSON.stringify({
				'Title':this.state.title
			})
		}).then(this.refs.fetchData.listData(), this.setState({title:'',id:''}))
	}
	render(){
		const {title}=this.state
		return(
			<React.Fragment>
			<form id="formWrapper">
				<div className="flexWrapper">
					<div style={{flex: 6}}>
						<input id="title" className="form-control" type="text" value={title} name={title} placeholder="Add task" onChange={this.titleChange} />
					</div>
					<div style={{flex: 1}}>
						<input  className="btn btn-outline-primary" type="submit" onClick={this.formData}/>
	    			</div>
				</div>
			</form>
		<List titleHandler={this.titleUpdate} activeId={this.catchActiveId}ref='fetchData'></List>
			</React.Fragment>
		)
	}
}

export default Form