import React, { Component } from 'react'
import  { Redirect } from 'react-router-dom'

 class Register extends Component {
     constructor(props) {
         super(props)
     
         this.state = {
             email:"",
             errMsg:null,
             checked:false
         }
     }
     showValidationErr(msg){
        this.setState({errMsg : msg})
    }

    clearValidationErr(){
        this.setState({errMsg :null})

    }
    onEmailChange(e) {
        this.setState({email: e.target.value});
        this.clearValidationErr();
      }

    submitRegister(e){
         e.preventDefault();
          console.log("checked",this.state.checked)
          if(this.state.checked)
          {
              this.registerRecruiter();
          }
          else
          {
              this.registerEmployee();

          }


          console.log(this.state.errMsg);
    }

    async registerEmployee(){
        await this.props.jobPortal.methods.registerEmployee("name","email").send({from:this.props.account});
      }
      async registerRecruiter(){
        let amount = window.web3.utils.toWei('0.1', 'Ether')
        await this.props.jobPortal.methods.registerRecruiter("name","company","email").send({from:this.props.account, value:amount});
      }
    

   

    onCheckBoxChange(e){
        
        this.setState((prevState) => ({
            checked: !prevState.checked
          }));

          
    
}

async alreadyRegistered(){
    console.log("already registered",this.state.checked)
    this.props.handleCheckboxChange(this.state.checked);
    if(this.state.checked)
    {
        const isRecruiter = await this.props.jobPortal.methods.isRecruiter(this.props.account).call();
        if(isRecruiter){
            {this.props.history.push('/RecruiterHomePage')}
 
        }
        else{
            alert("Recruiter not registered")
        }
        
    }
    else
    {
        const isEmployee = await this.props.jobPortal.methods.isEmployee(this.props.account).call();
        if(isEmployee){
            {this.props.history.push('/EmployeeHomePage')}
 
        }
        else{
            alert("Employee not registered")
        }

    }
}

     
    render() {
      
        return (

            <div  className="container-fluid mt-5">
                <p>&nbsp;</p>
                         <h1 style={{textAlign:"center"}}>Welcome to DeHire</h1>
                        
                  <h3 style={{textAlign:"center"}}>~ Land your Dream job ~
                   </h3>
                 
            <div style={{
                position: 'absolute', left: '50%', top: '50%',
                transform: 'translate(-50%, -50%)'
                 }}>
                     
            <div className="root-continer" >
                
                

                <div className="box-container">
                <div className="input-container">
                <div className="header">Register</div>
                <div className="box">
                    <form onSubmit={this.submitRegister.bind(this)}>
                    {/* <div className="input-group">
                        <label htmlFor="Email">Username</label>
                        <input type="text" name="name" id="name" ref={(input) => { this.name = input }} className="login-input" placeholder="Username" onChange={this.onEmailChange.bind(this)}/>
                        <small className="danger-error">{this.state.errMsg}</small>
                    </div> */}
                    <div className=" form-group">
                    <label htmlFor="Username">Username</label>
                    <input id="name" type="text" ref={(input) => { this.name = input }} className="form-control" placeholder="Username" required />
                    </div>
                    {/* <div className="input-group">
                        <label htmlFor="Email">Email</label>
                        <input type="text" name="Email" id="email" ref={(input) => { this.email = input }} className="login-input" placeholder="Email" onChange={this.onEmailChange.bind(this)}/>
                        <small className="danger-error">{this.state.errMsg}</small>
                    </div> */}
                    <div className=" form-group">
                    <label htmlFor="Email">Email</label>
                    <input id="email" type="email" ref={(input) => { this.email = input }} className="form-control" placeholder="Email" required />
                    </div>
                    
                    <div className="custom-control custom-checkbox" align="right">
                       <input type="checkbox" className="custom-control-input" id="defaultChecked2" value={this.state.checked} onChange={this.onCheckBoxChange.bind(this)}/>
                       <label className="custom-control-label" for="defaultChecked2">Recruiter</label>
                    </div>
                    
                    {this.state.checked ?
                    // <div className="input-group">
                    //     <label htmlFor="Company">Company</label>
                    //     <input type="text" name="company" id="company" ref={(input) => { this.company = input }} className="login-input" placeholder="Company" onChange={this.onEmailChange.bind(this)}/>
                    //     <small className="danger-error">{this.state.errMsg}</small>
                    // </div>
                    <div className=" form-group">
                    <label htmlFor="Company">Company</label>
                    <input id="compnay" type="text" ref={(input) => { this.company = input }} className="form-control" placeholder="Company" required />
                    </div>
                    :''}

                     <div className=" form-group ">
                         
                    <button type="submit" className="btn btn-success btn-block" >Register</button> 
                    </div>
                   
                    </form>
                </div>
                <div className="input-group">
                 {/* <a href="./EmployeeHomePage">Already Registered ? Go to Home Page</a> */}
                 <button className="btn btn-link btn-sm float-right pt-0" onClick={this.alreadyRegistered.bind(this)}>
                          Already Registered ? Go to Home page
                        </button>
                </div>

            </div>

                </div>
                
            </div>
            </div>
            </div>
        
        )
    }
}






export default Register
