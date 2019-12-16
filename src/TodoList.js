import React, {Component} from 'react';
import logo from './logo.svg';
import Web3 from 'web3'


class TodoList extends Component {

  render(){
  return (
    
          <div id="content">
            <form onSubmit= {(event) =>{
                event.preventDefault()
                this.props.createTask(this.task.value);
            } }>
              <input id="newTask" ref={(input) => this.task=input} type="text" className="form-control" placeholder="Add task..." required />
              <input type="submit" hidden={true} />
            </form>
            <ul id="taskList" className="list-unstyled">
              { this.props.tasks.map((task,key) => {
                return(
              <div className="taskTemplate" className="checkbox" key={key}>
                <label>
                  <input type="checkbox" />
                  <span className="content">{task.content}</span>
                </label>
              </div>
                )})}
            </ul>
            <ul id="completedTaskList" className="list-unstyled">
            </ul>
          </div>
       
  );
}
}
export default TodoList;
