import React, { Component } from 'react'
import web3 from './const.js'
import { toast } from 'react-toastify';

 class PostJob extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       title:"",
       company:"",
       location:"",
       salary:"",
       description:"",
       blockNumber:0

    }
  }
  
  onTitleChange(e){
    this.setState({
      title: e.target.value
    })
  }

  onCompanyChange(e){
    this.setState({
      company:e.target.value
    })
  }

  onLocationChange(e){
    this.setState({
      location:e.target.value
    })
  }
   onSalaryChange(e){
    this.setState({
      salary:e.target.value
    })
  }
  onDescriptionChange(e){
    this.setState({
      description:e.target.value
    })
  }

  async createJobPost(event) {
    
    event.preventDefault()
    let blockNumber = await web3.eth.getBlockNumber();
    console.log("blockNumber",blockNumber)
    let count=0;
    this.props.jobPortal.events.JobPosted({fromBlock:Number(blockNumber)+1,toBlock:'latest'},(err,result) =>{
      
      if(err){
        toast.error("Error while posting job");
      }
      else{
        count++;
        if(count==1){
        toast.success("Successfully posted job");
      console.log("success",result);
      //this.setState({blockNumber:})
      this.props.changeValue(!this.props.isEnabled)
        }
      }
    })
    //this.props.changeValue(!this.props.isEnabled)
    console.log("events",this.props.jobPortal.JobPosted)
    console.log("description",this.state.description)
    //this.setState({ loading: true })
    //PostJob(string memory _position, string memory _description, string memory _company, string memory _location, string memory _skillsRequired, uint _salary)
    await this.props.jobPortal.methods.PostJob(this.state.title, this.state.description,this.state.company, this.state.location,"java,c,c++",this.state.salary).send({ from: this.props.account })
    
    
     
    console.log("success","success");
    
    
    

  }

//ref={(input) => { this.company = input }}
    render() {
        return (
            <div className="container-fluid mt-5">
                <form onSubmit={this.createJobPost.bind(this)}>
                          <div className="row">
                      <div className=" form-group col-lg-4">
                        <input id="title" type="text" value={this.state.title} onChange={this.onTitleChange.bind(this)} value={this.state.title} className="form-control" placeholder="Title" required />
                      </div>

                      <div className=" form-group col-lg-4">
                        <input id="company"  type="text"  value={this.state.company} onChange={this.onCompanyChange.bind(this)}  className="form-control"   placeholder="Company" required />
                      </div>
                      </div>
                      <div className="row">
                      <div className=" form-group col-lg-4">
                        <input id="location"  type="text"  value={this.state.location} onChange={this.onLocationChange.bind(this)}  className="form-control"   placeholder="Location" required />
                      </div>
                      <div className=" form-group col-lg-4">
                        <input id="salary" type="number" value={this.state.salary} onChange={this.onSalaryChange.bind(this)} className="form-control" placeholder="Salary" required />
                      </div>

                      
                      </div>
                      <div className="row">
 
                      <div className=" form-group col-lg-8">
                        <textarea id="description"  type="text" cols={40} rows={5} value={this.state.description} onChange={this.onDescriptionChange.bind(this)} className="form-control"   placeholder="Description" required />
                      </div>
                      </div>
                    <div className="row">
                    <div className="form-group col-lg-6" ></div>
                      <div className="form-group col-lg-2" >
                     
                      <button type="submit" className="btn btn-primary btn-block">Post Job</button>
                      </div>
                      </div>
                      
                    </form>
                    
            </div>
        )
    }
}

export default PostJob
