

import React, { Component } from 'react'

 class DisplayExperiences extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             workExperiences : []
        }
    }
    

    render() {
        return (
            <div className="container-fluid mt-5">
                 <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '1000px' }}>
                   <div className="content mr-auto ml-auto">
                       this.state.workExperiences.map((workExperience,key) => {
                           <form onSubmit={(event) => {
                            event.preventDefault()
                            const content = this.title.value
                            this.props.changeAddExperienceBool(!this.props.isEnabled)
                           // this.props.createPost(content)
                          }}>
                              <div className="row">
                          <div className=" form-group col-lg-4">
                            <input id="companyName" type="text" ref={(input) => { this.title = input }} className="form-control" placeholder="Company Name" required />
                          </div>
        
                          <div className=" form-group col-lg-4">
                            <input id="role"  type="text"  ref={(input) => { this.company = input }}  className="form-control"   placeholder="Role" required />
                          </div>
                          </div>
                          <div className="row">
                          <div className=" form-group col-lg-4">
                            <input id="location"  type="text"  ref={(input) => { this.location = input }}  className="form-control"   placeholder="Location" required />
                          </div>
                          <div className=" form-group col-lg-4">
                            <input id="salary" type="text" ref={(input) => { this.salary = input }} className="form-control" placeholder="Salary" required />
                          </div>
        
                          
                          </div>
                          <div className="row">
                          <div className=" form-group col-lg-4">
                            <input id="fromDate"  type="text"  ref={(input) => { this.location = input }}  className="form-control"   placeholder="From Date" required />
                          </div>
                          {!this.state.isCurrentEmployee ?
                          <div className=" form-group col-lg-4">
                            <input id="toDate" type="text" ref={(input) => { this.salary = input }} className="form-control" placeholder="To Date" required />
                          </div>
                          :''}
         
                         
                          
                          </div>
        
                          <div className="row">
                          <div className=" form-group col-lg-4">
                            <input id="duration"  type="text"  ref={(input) => { this.location = input }}  className="form-control"   placeholder="Duration" required />
                          </div>
                          <div className="custom-control custom-checkbox">
                               <input type="checkbox" className="custom-control-input" id="defaultChecked2" value={this.state.isCurrentEmployee} onChange={this.onCheckBoxChange.bind(this)}/>
                               <label className="custom-control-label" for="defaultChecked2">Current Employer</label>
                            </div>
                         
                          
                          </div>
                          
                          
                        <div className="row">
                        <div className="form-group col-lg-6" ></div>
                          <div className="form-group col-lg-2" >
                         
                          <button type="submit" className="btn btn-primary btn-block">Add</button>
                          </div>
                          </div>
                          
                        </form>
                       })
                   </div>
                 </main>

                
            </div>
        )
    }
}

export default DisplayExperiences
