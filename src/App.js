import React, {Component} from 'react';
import logo from './logo.svg';
import Web3 from 'web3'
import './App.css';
import {TODO_LIST_ADDRESS,TODO_LIST_ABI} from './config';
import TodoList from './TodoList';


class App extends Component {

  componentDidMount()
  {
    this.loadBlockChainData();

  }

  constructor(props){
    super(props);
    this.state ={ account: '', taskCount:0,tasks:[],loading :true}
    this.createTask=this.createTask.bind(this);
  }

  async loadBlockChainData(){
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    const network = await web3.eth.net.getNetworkType()
    const accounts = await web3.eth.getAccounts();
    this.setState({account : accounts[0]});
    console.log(this.state.account)
    const todolist = new web3.eth.Contract(TODO_LIST_ABI,TODO_LIST_ADDRESS)
     
    this.setState({todolist});
    console.log("todolist",todolist);
    const taskCount= await todolist.methods.taskCount().call();
    console.log(taskCount)
    this.setState({taskCount})
    for(var i=1;i<=taskCount;i++)
    {
      const task = await todolist.methods.tasks(i).call()
      this.setState(
        {
          tasks : [...this.state.tasks,task]
        }
      )
    }
    this.setState({loading:false})
    console.log("tasks",this.state.tasks)
  }

  async createTask(content) {
    this.setState({loading:true})
    
    await this.state.todolist.methods.createTask(content).send({from: this.state.account});
    
  

  }
  render(){
  return (
    <div className="container">
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="http://www.dappuniversity.com/free-download" target="_blank"> Todo List</a>
      <ul className="navbar-nav px-3">
        <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
          <small><a className="nav-link" href="#"><span id="account"></span></a></small>
        </li>
      </ul>
    </nav>
    <div className="container-fluid">
      <div className="row">
        <main role="main" className="col-lg-12 d-flex justify-content-center">
          { this.state.loading 
            ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div> 
            : <TodoList tasks={this.state.tasks} createTask={this.createTask}/>}
         
        </main>
      </div>
    </div>
     
    </div>
  );
}
}
export default App;
