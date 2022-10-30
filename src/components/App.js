import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link,withRouter } from 'react-router-dom';
import Web3 from 'web3';
import JobPortal from '../abis/JobPortal.json'
import JobLib from '../abis/JobLib.json'
import './App.css';
import Register from './Register';
import './Register.css'
import Navbar from './Navbar'
import RecruiterHomePage from './RecruiterHomePage'
import EmployeeHomePage from './EmployeeHomePage'
import PostJob from './PostJob'
import Profile from './Profile'
import AddEducation from './AddEducation'
import DisplayJob from './DisplayJob'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {

  async componentWillMount() {
    
    await this.loadWeb3()
    await this.loadBlockchainData()
    //await this.loadJobs()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
  
    console.log("account",this.state.account)

    // Network ID
    const networkId = await web3.eth.net.getId()
    const jobLibNetworkData = JobLib.networks[networkId]
    const jobPortalNetworkData = JobPortal.networks[networkId]
    console.log(jobLibNetworkData.address);
    console.log(jobPortalNetworkData.address);
    if(jobPortalNetworkData) {
      const jobPortal = web3.eth.Contract(JobPortal.abi, jobPortalNetworkData.address)
      const jobLib = web3.eth.Contract(JobLib.abi, jobLibNetworkData.address)
      this.setState({ jobPortal: jobPortal })
      this.setState({ jobLib : jobLib})
      console.log("jobPortal",this.state.jobPortal)
      console.log("jobLib",this.state.jobLib)
      
      this.setState({ loading: false})

      //await this.state.jobPortal.methods.

    } else {
      window.alert('DeHire contract not deployed to detected network.')
    }
  }

  // async loadJobs(){
  //   console.log("inside App")
  //   let jobCount =await this.state.jobPortal.methods.getRecruiterPostedJobs().call();
  //    console.log("jobCount",jobCount.length)
  //       for(var i=0;i<jobCount.length;i++){
  //           let jobPost = await this.state.jobLib.methods.jobs(jobCount[i].toNumber()).call();
  //           this.setState({
  //               jobPosts: [...this.state.jobPosts, jobPost]
  //             })
  //       }
  //       console.log("jobPosts",this.state.jobPosts)
  // }

  // async registerEmployee(){
  //   await this.state.jobPortal.methods.registerEmployee().send({from:this.state.account});
  // }
  // async registerRecruiter(){
  //   await this.state.jobPortal.methods.registerRecruiter().send({from:this.state.account});
  // }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      jobPortal:null,
      jobLib:null,
      profile:null,
      posts: [],
      loading: true,
      isRecruiter:false,
      jobPosts:[]
    }
    this.handleRole= this.handleRole.bind(this);
    console.log("props",this.props.history)
    //{this.props.history.push('/Profile')}
  }

  async handleRole(checked){
    console.log("handleRole",checked)
     this.setState({
       isRecruiter:checked
     }, console.log("isRecruiter",this.state.isRecruiter))
    if(checked){
      let profile = await this.state.jobPortal.methods.registeredRecruiters(this.state.account).call();
      this.setState({profile:profile})
    }
    else{

    let profile = await this.state.jobPortal.methods.registeredEmployees(this.state.account).call();
    this.setState({profile})
    
    }

    console.log("profile",this.state.profile )
    
  }

  render() {
    //const profile = this.state.profile;
    return (
      <Router>
      <div className='App' >
         <Navbar jobPortal={this.state.jobPortal} jobLib={this.state.jobLib} account={this.state.account} isRecruiter={this.state.isRecruiter} handleRole={this.handleRole}/>
         <p>&nbsp;</p>
         <ToastContainer autoClose={5000}/>
        
        
      </div>
      <Switch>
             <Route exact path='/' render={(props) => <Register {...props} jobPortal={this.state.jobPortal} jobLib={this.state.jobLib} account={this.state.account}  handleCheckboxChange={this.handleRole}/>}/> 
              <Route exact path='/RecruiterHomePage' render={(props) => <RecruiterHomePage {...props} jobPortal={this.state.jobPortal} jobLib={this.state.jobLib} account={this.state.account} />}/> 
              <Route exact path='/EmployeeHomePage' render={(props) => <EmployeeHomePage {...props} jobPortal={this.state.jobPortal} jobLib={this.state.jobLib} account={this.state.account} />}/> 
              <Route exact path='/PostJob' component = {PostJob}/> 
              <Route exact path='/Profile' render={(props) => <Profile {...props} jobPortal={this.state.jobPortal} jobLib={this.state.jobLib} account={this.state.account} />}/> 
              <Route exact path='/AddEducation' component={AddEducation} />
              <Route exact path='/DisplayJob' component={DisplayJob} />
              
          </Switch>
      </Router>
    );
  }
}

export default App;
