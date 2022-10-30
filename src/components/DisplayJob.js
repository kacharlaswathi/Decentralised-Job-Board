
import React, { Component } from 'react'
import Identicon from 'identicon.js';
import './DisplayJob.css';
import { Route , withRouter} from 'react-router-dom'
import web3 from './const.js'
import { toast } from 'react-toastify';
import _ from 'lodash';
 class DisplayJob extends Component {

    async componentWillReceiveProps(){
         if(this.props.jobPortal !=null && this.props.jobLib!=null){
         console.log("inside receive props",this.props.jobPortal)
        await this.loadJobs()
         }
     }

    async componentWillMount(){
        // this.setState({
        //     jobPortal:this.props.jobPortal,
        //     jobLib:this.props.jobLib,
        //     account:this.props.account
        // })
        await this.loadJobs()
      
        
        console.log("inside display job")
      }

      async deleteJob(e){
          let jobId = e.target.name;
          console.log("jobId", jobId)
          let blockNumber = await web3.eth.getBlockNumber();
          let count=0;
    this.props.jobPortal.events.JobDeleted({fromBlock:blockNumber+1,toBlock:'latest'},(err,result) =>{
      if(err){
        toast.error("Error while deleting job");
      }
      else{
        count++;
        if(count==1){
        toast.success("Successfully deleted job");
        //let job = await this.props.jobPortal.methods.jobs(jobId).call();
        let newJobPosts = this.state.jobPosts.slice() //copy the array
         console.log("newJobPosts",newJobPosts[jobId])
        newJobPosts[jobId-1].status = false //execute the manipulations
        console.log("newJobPst status",newJobPosts[jobId-1].status)
       
        this.setState({jobPosts: newJobPosts},console.log(this.state.jobPosts))
        }
      }
    })
          await this.props.jobPortal.methods.deleteJob(Number(jobId)).send({from:this.props.account}) 
          //window.parent.location = window.parent.location.href
          
           //window.parent.location = window.parent.location.href
      }

    constructor(props) {
        super(props)
    
        this.state = {
            jobPortal:this.props.jobPortal,
            jobLib:this.props.jobPortal,
             jobPosts:[],
             open:false,
             jobApplicants:[],
             tempCount:0,
             jobId:0
        }
        console.log(this.props)

        //this.loadJobs();
    }
    
    async showProfile(e){
        let applicantAddress = e.target.name;
        console.log("applicantAddress",applicantAddress)
        let profile = await this.props.jobPortal.methods.registeredEmployees(applicantAddress).call();
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
    
    async toggle(e) {
        this.setState({
          open: !this.state.open,
          jobApplicants:[],
          jobId:e.target.id
        });
     let jobId= e.target.id;
       let applicants = await this.props.jobPortal.methods.getJobApplicants(jobId).call();
       console.log("applicants",applicants);
       this.setState({
           jobApplicants:applicants
       })

      }

    async loadJobs(){
        if(this.props.jobPortal != null){
       // console.log("paramsjobposts",this.props.paramjobPosts)
        //event.preventDefault()
        //alert(this.props.account)
        this.setState({
            jobPosts:[]
        })
        let jobCount =await this.props.jobPortal.methods.getRecruiterPostedJobs().call();
          console.log("jobCount",jobCount.length)
        for(var i=0;i<jobCount.length;i++){
            let jobPost = await this.props.jobLib.methods.jobs(jobCount[i].toNumber()).call();
            this.setState({
                jobPosts: [...this.state.jobPosts, jobPost]
              })
        }
        console.log("jobPosts",this.state.jobPosts)
         
          let tempPosts=[]
         if(this.props.enableSearch){
          console.log("searchText", this.props.searchText)
            tempPosts=this.state.jobPosts
          this.setState({
            jobPosts:[]
          })
           tempPosts.map((tempPost,key) =>
           {
             console.log("tempPost",tempPost.position)
              if(tempPost.position.toLowerCase() == this.props.searchText.toLowerCase() ){
                this.setState({
                  jobPosts :[...this.state.jobPosts,tempPost]
                })
              }
           });
          // let tempPosts=[]
          // this.state.jobPosts.map((jobPost,key) =>{
          //      if(jobPost.co)
          // })
         }
                tempPosts=this.state.jobPosts;
            console.log("tempPosts",tempPosts)
          let tempPosts1= _.uniqBy(tempPosts, function (e) {
  return Number(e.JobId);
});
this.setState({
  jobPosts:tempPosts1
})
         console.log("jobPosts",this.state.jobPosts)
        }
    }
    render() {
        return (
            <div className="container-fluid mt-5">
                <div className="row">
                    <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '1000px' }}>
                    {/* <button data-toggle="collapse" data-target="#demo">Collapsible</button> */}


                        <div className="content mr-auto ml-auto">
                            {/* <button className="btn btn-success btn-block" onClick={this.loadJobs.bind(this)}> Load jobs</button> */}
                            
                            {this.state.jobPosts.map((jobPost, key) => {
                                if (jobPost.status) {
                                    return (

                                        <div className="card mb-4" key={key} >
                                            <div className="card-header">
                                                {jobPost.position}
                                                <small className="float-right mt-1 text-muted">
                                                        Location :{jobPost.location}
                                                    </small>
  
                                            </div>
                                            <div class="card-body">
                                                <h5 class="card-title">{jobPost.company}</h5>
                                                <p class="card-text">{jobPost.description}</p>
                                            </div>
                                            <ul id="postList" className="list-group list-group-flush">

                                                <li key={key} className="list-group-item py-2">
                                                    <button className="btn btn-link btn-sm float-left pt-0" id={jobPost.JobId} onClick={this.toggle.bind(this)}>
                                                        View applicants
                                                    </button>
                                                    <button
                                                        className="btn btn-link btn-sm float-right pt-0 "
                                                        name={jobPost.JobId}
                                                        onClick={this.deleteJob.bind(this)}
                                                    >
                                                        Delete Job
                                                     </button>
                                                </li>
                                                <li  className="list-group-item py-2">
                                                
                                                 <div id="demo" name ={jobPost.JobId} className={"collapse" + (this.state.open && jobPost.JobId==this.state.jobId ? ' in' : '')}>
                                                   <div>
                                                       <ul>
                                                           {
                                                               this.state.jobApplicants.map((jobApplicant,key) =>{
                                                               return (
                                                                   <li>
                                                                       <button
                                                        className="btn btn-link btn-sm float-left pt-0"
                                                        name={jobApplicant}
                                                        onClick={this.showProfile.bind(this)}
                                                    >
                                                        {jobApplicant}
                                                     </button>
                                                                   </li>

                                                               )
                                                           })}
                                                       </ul>
            
                                                         {/* Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
                                                         Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
                                                         */}
                                                    </div>
                                                </div>
                                                </li>
                                                </ul>
                                                
                                                
                                            
                                        </div>

                                    )
                                }
                            })}
                        </div>
                    </main>
                </div>
            </div>
        )
    }
}

export default withRouter(DisplayJob)
