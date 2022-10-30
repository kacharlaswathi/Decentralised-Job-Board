import React, { Component } from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Tabs, Tab} from 'react-bootstrap';
import AddEducation from './AddEducation';
import AddExperience from './AddExperience';
 class Profile extends Component {

    constructor(props) {
        super(props)

        this.state = {
             key:1,
             enableAddEducation: false,
             enableAddExperience: false
        }
    }

    handleSelect =(key) => {
        console.log('selected' + key);
        this.setState({ key });
      }

      AddExperience(){
        this.setState(prevState => ({
            enableAddExperience: !prevState.enableAddExperience
          }));
      }

    formSubmit(){
        
        //event.preventDefault()
        this.setState(prevState => ({
            enableAddEducation: !prevState.enableAddEducation
          }));
    //console.log(this.state.enableAddEducation)
        //const content = this.postContent.value
      
        //this.props.createPost(content)
    }

    changeAddExperienceBool = e => {
        console.log(e);
        this.setState({enableAddExperience: e});
        console.log(this.state.enableAddExperience)}

      changeValue = e => {
        console.log(e);
        this.setState({enableAddEducation: e});
        console.log(this.state.enableAddEducation)}

    render() {
        return (
           
            <div className="center-div container-fluid mt-5 " >
                
                <div className="row">

             <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '1000px' }}>
                <div className="content mr-auto ml-auto ">
                    <div className="row">
                        <div className="col-sm-10"><h3>&nbsp;&nbsp;{this.props.location.state.userProfile.name}</h3></div>
                        {/* <div class="col-sm-2"><a href="/users" class="pull-right"><img title="profile image" class="img-circle img-responsive" src="http://www.gravatar.com/avatar/28fd20ccec6865e2d5f0e1f4446eb7bf?s=100" /></a></div> */}
                   </div>
                    <div className="row">
                    <div className="col-sm-3">


                        <div className="text-center">
                          <img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" className="avatar img-circle img-thumbnail" alt="avatar" />


                       </div><br />

                    </div>
                    <div className="col-sm-9">
            {/* <ul className="nav nav-tabs">
                <li className="nav-item"><a className="nav-link active" data-toggle="tab" href="#home">Personal Info</a></li>
                <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#messages">Education</a></li>
                <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#settings">Experience</a></li>
              </ul> */}
          <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="controlled-tab-example">
          <Tab eventKey={1} title="Personal Info">
          
            <div className="container tab-pane active" id="home">

                  <form className="form" action="##" method="post" id="registrationForm1">
                      <p>&nbsp;</p>
                      <div className="row">

                          <div className=" form-group col-lg-6">
                              <label ><h4>First name</h4></label>
                              <input type="text" className="form-control" name="first_name" id="first_name" placeholder="first name" title="enter your first name if any." value={this.props.location.state.userProfile.name}/>
                          </div>



                          <div className=" form-group col-lg-6">
                            <label ><h4>Last name</h4></label>
                              <input type="text" className="form-control" name="last_name" id="last_name" placeholder="last name" title="enter your last name if any." value={this.props.location.state.userProfile.name}/>
                          </div>

                      </div>

                      <div className="row">

                          <div className="form-group col-lg-6">
                              <label ><h4>Phone</h4></label>
                              <input type="text" className="form-control" name="phone" id="phone" placeholder="enter phone" title="enter your phone number if any." value="123456789"/>
                          </div>

                          <div className="form-group col-lg-6">
                             <label ><h4>Mobile</h4></label>
                              <input type="text" className="form-control" name="mobile" id="mobile" placeholder="enter mobile number" title="enter your mobile number if any." value="123456789"/>
                          </div>
                      </div>
                      <div className="row">

                          <div className="form-group col-lg-6">
                              <label ><h4>Email</h4></label>
                              <input type="email" className="form-control" name="email" id="email" placeholder="you@email.com" title="enter your email." value={this.props.location.state.userProfile.email}/>
                          </div>


                          <div className="form-group col-lg-6">
                              <label ><h4>Location</h4></label>
                              <input type="text" className="form-control" id="location" placeholder="somewhere" title="enter a location" value="Bangalore"/>
                          </div>
                      </div>

                      <div className="form-group">
                           <div className="col-lg-12">
                                <br />
                              	<button className="btn btn-lg btn-success" type="submit"><i className="glyphicon glyphicon-ok-sign"></i> Save</button>
                               	{/* <button className="btn btn-lg" type="reset"><i className="glyphicon glyphicon-repeat"></i> Reset</button> */}
                            </div>
                      </div>
              	</form>



             </div>
             </Tab>
             <Tab eventKey={2} title="Education">
                 <p>&nbsp;</p>
             <div className="container tab-pane" id="messages">


             {/* {(!this.state.enableAddEducation) ?

                    <div className="row">
                       <div className="form-group col-lg-8">

                         
                       </div>
                     
                         
  
                          <div className="form-group col-lg-4">

                            <button  className="btn btn-primary btn-block pull-right" onClick={this.formSubmit.bind(this)}>Add Education + </button>
                          </div>

                         
                      
                      </div>
                      :''} */}
                     <AddEducation jobPortal={this.props.jobPortal} jobLib= {this.props.jobLib} account= {this.props.account}/>








             </div>
             </Tab>
             <Tab eventKey={3} title="Work Experience">
             <p>&nbsp;</p>
             <div className="container tab-pane" id="settings">
             


                       <AddExperience jobPortal={this.props.jobPortal} jobLib= {this.props.jobLib} account= {this.props.account} />


              </div>
              </Tab>
        </Tabs>
          </div>
                    </div>
                </div>
                </main>
                </div>
            </div>
        )
    }
}

export default Profile
