import React, { Component } from 'react'
import '../../containers/css/list.css'

class List extends Component{
    constructor(props){
        super(props)
        this.state={
            queryData:[],
        }
    }
    listData=()=>{
        fetch('http://localhost:8000/api/task-viewset/')
            .then(response=>response.json())
        .then(data=>{
            this.setState(
                {queryData:data}
            )
        })
    }
    componentDidMount(){
        this.listData()
    }
    render(){
        const {queryData}=this.state
        const items=queryData.map(data=>
                <div key={data.id} id="data-row-${data.id}" className="taskWrapper flexWrapper">
                    <div style={{flex:7}}>
                        <span> {data.Title}</span>
                    </div>
                    <div style={{flex:1}}>
                        <button onClick={()=>this.props.titleHandler(data.id,data.Title)}  className="btn btn-sm btn-outline-secondary edit">Edit</button>
                    </div>
                    <div style={{flex:1}}>
                        <button onClick={()=>this.props.activeId(data.id)} className="btn btn-sm btn-outline-danger delete"> Delete</button>
                    </div>
                </div>
            )
    return(
        <React.Fragment>
            {items}
        </React.Fragment>
        )
    }
}

export default List