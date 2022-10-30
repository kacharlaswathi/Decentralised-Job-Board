

import React, { Component } from 'react'
import web3 from './const.js'
import { toast } from 'react-toastify';
import _ from 'lodash';

 class AddExperience extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
          experienceDetails :[],
          isChecked:false,
          companyName:"",
          role:"",
          salary:"",
          fromDate:"",
          toDate:"",
          duration:""
           
        }
    }
    async componentWillReceiveProps(){
      if(this.props.jobPortal !=null && this.props.jobLib!=null){
      console.log("inside receive props",this.props.jobPortal)
     await this.loadAllExperience()
      }
  }
     componentWillMount(){
      var me = this
      //this.loadAllExperience()
     }

     companyNameChange(e){
       this.setState({
         companyName: e.target.value
       })
     }
     salaryChange(e){
      this.setState({
        salary: e.target.value
      })
    }
    fromDateChange(e){
      this.setState({
        fromDate: e.target.value
      })
    }
    toDateChange(e){
      this.setState({
        toDate: e.target.value
      })
    }
    durationChange(e){
      this.setState({
        duration: e.target.value
      })
    }
    roleChange(e){
      this.setState({
        role: e.target.value
      })
    }

     onCheckBoxChange(evt){
        
        // this.setState(prevState => ({
        //     isCurrentEmployee: !prevState.isCurrentEmployee
        //   }));
        console.log("checked",evt.target.checked)
        console.log("idx",evt.target.name)
        let idx=evt.target.name;
          const newExperienceDetails = this.state.experienceDetails.map((experienceDetail, sidx) => {
            if (idx !== sidx) return experienceDetail;
            return { ...experienceDetail, isCurrentEmployer:evt.target.checked};
          });
        
          this.setState({ experienceDetails: newExperienceDetails },console.log("workExperience",this.state.experienceDetails));
        };
        

        addExperience(){
          
          console.log("Add experience")
          //this.setState({experienceDetails:[]})
          this.setState((prevState) => ({
            experienceDetails:[...prevState.experienceDetails,{companyName:"",role:"",salary:"",fromDate:"",toDate:"",duration:"",isCurrentEmployer:false}]
          }))
          // this.setState({
            
          //   educationDetails: this.state.educationDetails.concat([{InstitutionName:"",Course:"",Location:"",FromDate:"",ToDate:"",IsCurrentInstitution:false}])
          // })
        }

        async loadAllExperience(){
          if(this.props.jobPortal!=null && this.props.jobLib!=null){
            console.log("account",this.props.account)
         let allExperience = await this.props.jobPortal.methods.workExperienceDetails(this.props.account,1).call();
         console.log("allExperience",allExperience)
         this.setState({
          experienceDetails:[...this.state.experienceDetails,allExperience]
         })
          }
          let tempexperienceDetails=[]
          tempexperienceDetails=this.state.experienceDetails;
          console.log("tempPosts",tempexperienceDetails)
        let tempexperienceDetails1= _.uniqBy(tempexperienceDetails, function (e) {
return (e.companyName);
});
this.setState({
  experienceDetails:tempexperienceDetails1
})
        }

        async formSubmit1(e){
          e.preventDefault()
           console.log(this.props.jobPortal)
           let blockNumber = await web3.eth.getBlockNumber();
           console.log("blockNumber",blockNumber)
           let count=0;
           this.props.jobPortal.events.ExperienceAdded({fromBlock:Number(blockNumber)+1,toBlock:'latest'},(err,result) =>{
             
             if(err){
               toast.error("Error while adding education details");
             }
             else{
               count++;
               if(count==1){
               toast.success("Successfully added education details");
             console.log("success",result);
             
             //this.setState({blockNumber:})
             //this.props.changeValue(!this.props.isEnabled)
            //  this.setState({
            //    educationDetails:[...this.state.educationDetails:{institutionName}]
            //  })
               }
             }
           })

           await this.props.jobPortal.methods.AddExperience(this.state.companyName,this.state.role,this.state.salary,this.state.fromDate,this.state.toDate,this.state.duration,this.isCurrentEmployer).send({from:this.props.account})
           
        }

       render() {
        let me=this
          return (
              <div className="container-fluid mt-5">
                 <div className="row">
                         <div className="form-group col-lg-8">
  
                           
                         </div>
                       
                           
    
                            <div className="form-group col-lg-4">
  
                              <button  className="btn btn-primary btn-block pull-right" onClick={this.addExperience.bind(this)}>Add Experience + </button>
                            </div>
  
                           
                        
                        </div>
                        {this.state.experienceDetails.map((experienceDetail,key)=>{
                          return(
                            <form onSubmit={this.formSubmit1.bind(this)}>
                                <div className="row">
                            <div className=" form-group col-lg-4">
                              <input id="companyName1" type="text"  value= {this.state.companyName ? this.state.companyName : experienceDetail.companyName} onChange={this.companyNameChange.bind(this)} className="form-control" placeholder="Company Name" required />
                            </div>
          
                            <div className=" form-group col-lg-4">
                              <input id="role"  type="text"  value={this.state.role ? this.state.role : experienceDetail.role} className="form-control"  onChange={this.roleChange.bind(this)} placeholder="Role" required />
                            </div>
                            </div>
                            <div className="row">
                            <div className=" form-group col-lg-4">
                              <input id="salary1"  type="number"   value={this.state.salary ? this.state.salary : experienceDetail.salary} className="form-control" onChange={this.salaryChange.bind(this)}  placeholder="Salary" required />
                            </div>
                            <div className=" form-group col-lg-4">
                              <input id="fromDate1" type="text" value={this.state.fromDate ? this.state.fromDate : experienceDetail.fromDate} className="form-control" onChange={this.fromDateChange.bind(this)} placeholder="From Date" required />
                            </div>
          
                            
                            </div>
                            <div className="row">
                            <div className=" form-group col-lg-4">
                              <input id="toDate1"  type="text"  value={this.state.toDate ? this.state.toDate : experienceDetail.toDate} className="form-control"  onChange={this.toDateChange.bind(this)} placeholder="To Date" required />
                            </div>
                            {!experienceDetail.isCurrentEmployer ?
                            <div className=" form-group col-lg-4">
                              <input id="duration1" type="text"  value={this.state.duration ? this.state.duration : experienceDetail.duration} onChange= {this.durationChange.bind(this)} className="form-control" placeholder="Duration" required />
                            </div>
                            :''}
                           
                            
                            </div>
                            <div className="row">
                            <div className="custom-control custom-checkbox">
                                 <input type="checkbox" className="custom-control-input" id="defaultChecked2" name={key} checked={experienceDetail.isCurrentEmployer } onChange={
                                   function () {
                                     console.log("key",key)
                                    let curData = me.state.experienceDetails;
                                    console.log("curData",curData)
                                       // id = curData.findIndex(function(elem){ return elem.teamName == el.teamName});
                                      let id =key;
                                        curData[id].isCurrentEmployer = !curData[id].isCurrentEmployer;
                
                                    me.setState({experienceDetails:curData})
                                    me.setState({isChecked:curData[id].isCurrentEmployer})
                                  }
                                 }/>
                                 <label className="custom-control-label" for="defaultChecked2">Current Employer</label>
                              </div>
                            </div>
                            
                          <div className="row">
                          <div className="form-group col-lg-6" ></div>
                            <div className="form-group col-lg-2" >
                           
                            <button type="submit" className="btn btn-primary btn-block">Save</button>
                            </div>
                            </div>
                            
                          </form>
          )})}
              
                  
          </div>
          )
      }
}

export default AddExperience
