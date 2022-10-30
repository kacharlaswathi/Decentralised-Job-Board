
import React, { Component } from 'react'
import web3 from  './const.js'
import { toast } from 'react-toastify';
import _ from 'lodash';

 class DisplayAllJobs extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             jobPosts:[],
             appliedJobs:[],
             tempCount:0
        }
    }
    
      componentWillReceiveProps(){
         if(this.props.jobPortal !=null && this.props.jobLib!=null){
         console.log("inside receive props",this.props.jobPortal)
         this.loadAllJobs()
         }
     }

     async componentWillMount(){
        // this.setState({
        //     jobPortal:this.props.jobPortal,
        //     jobLib:this.props.jobLib,
        //     account:this.props.account
        // })
        await this.loadAllJobs()
        console.log("inside display All job")
      }
    async loadAllJobs(){
      if(this.props.jobPortal != null){
        //event.preventDefault()
        //alert(this.props.account)

        this.setState({
          jobPosts:[]
        })
        let jobCount =await this.props.jobLib.methods.getJobCount().call();
          console.log("jobCount",jobCount.toNumber())

          let appliedJobs= await this.props.jobPortal.methods.getEmployeeAppliedJobs().call();
          console.log("appliedJobs", appliedJobs.length)
          this.setState({
              appliedJobs
          })
        for(var i=1;i<=jobCount.toNumber();i++){
            let jobPost = await this.props.jobLib.methods.jobs(i).call();
            this.setState({
                jobPosts: [...this.state.jobPosts, jobPost]
              })
        }
        console.log("jobPosts",this.state.jobPosts)
         let tempPosts=[]
        if(this.props.enableSearch){
          console.log("searchText", this.props.searchText)
          
           tempPosts=this.state.jobPosts
         
          console.log("tempPosts1",tempPosts)

          this.setState({
            jobPosts:[]
          })
           tempPosts.map((tempPost,key) =>
           {
             //console.log("tempPost",tempPost.company)
              if(tempPost.company.toLowerCase() == this.props.searchText.toLowerCase() ){
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
        console.log("search job",this.state.jobPosts)
      }
        
    }

    async applyJob(e){
        let jobId= e.target.name;
        //console.log("jobId",jobId)
          console.log("jobId", jobId)
          let blockNumber = await web3.eth.getBlockNumber();
          let count=0;
           this.props.jobPortal.events.JobApplied({fromBlock:blockNumber+1,toBlock:'latest'},(err,result) =>{
      if(err){
        toast.error("Error while applying job");
      }
      else{
        count++;
        if(count==1){
        toast.success("Successfully applied job");
        //let job = await this.props.jobPortal.methods.jobs(jobId).call();
       
       
        this.setState({appliedJobs :[...this.state.appliedJobs,jobId]},console.log(this.state.appliedJobs))
        }
      }
    })
        await this.props.jobPortal.methods.ApplyJob(Number(jobId)).send({from:this.props.account});
        console.log("sucess")
        //await this.loadAllJobs();
    }
    render() {
        return (
            <div className="container-fluid mt-5">
            <div className="row">
                <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '1000px' }}>
                    <div className="content mr-auto ml-auto">
                        {/* <button className="btn btn-success btn-block" onClick={this.loadAllJobs.bind(this)}> Load jobs</button>
                    <p>&nbsp;</p> */}
          { this.state.jobPosts.map((jobPost, key) => {
              if(jobPost.status){
                let fullDescription = jobPost.salary + "\n"+jobPost.description;
               // console.log("fullDescription",fullDescription)
            return(
              <div className="card mb-4" key={key} >
                <div className="card-header">
                  {jobPost.position}
                  
                </div>

                <div class="card-body">
                   <h5 class="card-title">Company : {jobPost.company}</h5>
                   <p class="card-text">
                   {fullDescription.split("\n").map((i,key) => {
                     if(key==0){
            return <div key={key}>Salary : {i}</div>;
                     }
                     else{
                     return <div key={key}> {i}</div>;
                     }
        })}</p>
                </div>
                <ul id="postList" className="list-group list-group-flush">
                  
                  <li key={key} className="list-group-item py-2">
                    <small className="float-left mt-1 ">
                    Location :{jobPost.location}
                    </small>
                    { 
                      this.state.appliedJobs.some(v => (Number(v) == jobPost.JobId )) ?
                    <label className=" float-right pt-0">Applied</label>
                    :
                    <button
                    className="btn  btn-link float-right pt-0"
                    name={jobPost.JobId}
                    onClick={this.applyJob.bind(this)}
                  >
                    Apply Job
                  </button> }
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

export default DisplayAllJobs
