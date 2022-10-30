import React, { Component } from 'react';
import Identicon from 'identicon.js';
import  { Redirect } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import { Route , withRouter} from 'react-router-dom'



class Navbar extends Component {
  
    async showProfile(e){
        let applicantAddress = e.target.name;
        console.log("applicantAddress",applicantAddress)
        let profile = await this.props.jobPortal.methods.registeredEmployees(applicantAddress).call();
        console.log("profile name",profile.name)
        if(profile.name==""){
          profile= await this.props.jobPortal.methods.registeredRecruiters(applicantAddress).call();
        }
        console.log("profile",profile)
        //this.props.history.push('/Profile');
        this.props.history.push({
            
                pathname : '/Profile',
                state :{
                    userProfile:profile,
                    account:this.props.account
                }
        });

    }

    async goToHomePage(){
      if(this.props.isRecruiter){
        this.props.history.push('./RecruiterHomePage')

      }
      else{
         this.props.history.push('./EmployeeHomePage')
      }
    }

    async switchRole(){
      if(this.props.isRecruiter){
        
        this.props.history.push('./EmployeeHomePage')
      }
      else{
         this.props.history.push('./RecruiterHomePage')
      }
      this.props.handleRole(!this.props.isRecruiter)
    }

  render() {
    return (
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        {/* <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="/"
          target="_blank"
          rel="noopener noreferrer"
        >
          DeHire
        </a> */}
        <button className="btn btn-default" style={{color:"white"}} onClick={this.goToHomePage.bind(this)}>DeHire</button>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <button className="btn btn-default" style={{color:"white"}} onClick={this.switchRole.bind(this)}>Switch Role</button>
            <small className="text-secondary">
              <small id="account">{this.props.account}</small>
            </small>

            { this.props.account ?
              // ? <img
              //   className='ml-2'
              //   width='30'
              //   height='30'
              //   name={this.props.account}
              //   src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
              //   onClick={this.showUserProfile.bind(this)}
              // />
            

               
              <input type="image" src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`} name={this.props.account} class="btTxt submit" id="saveForm" onClick={this.showProfile.bind(this)} />
              : <span></span>
            }
          </li>
        </ul>
      </nav>
    );
  }
}

export default withRouter(Navbar);