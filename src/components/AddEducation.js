
import React, { Component } from 'react'
import web3 from './const.js'
import { toast } from 'react-toastify';
import _ from 'lodash';
 class AddEducation extends Component {
     constructor(props) {
         super(props)
     
         this.state = {
              isCurrentEmployee: false,
              educationDetails :[],
              institutionName:"",
              course:"",
              location:"",
              fromDate:"",
              toDate:""


             
         }
     }
     async componentWillReceiveProps(){
      if(this.props.jobPortal !=null && this.props.jobLib!=null){
      console.log("inside receive props",this.props.jobPortal)
     await this.loadAllAcademics()
      }
  }
     componentWillMount(){
      var me = this
      //this.loadAllExperience()
     }

     onCheckBoxChange(evt){
        
        // this.setState(prevState => ({
        //     isCurrentEmployee: !prevState.isCurrentEmployee
        //   }));
        console.log("checked",evt.target.checked)
        console.log("idx",evt.target.name)
        let idx=evt.target.name;
          const newEducationDetails = this.state.educationDetails.map((educationDetail, sidx) => {
            if (idx !== sidx) return educationDetail;
            return { ...educationDetail, isCurrentInstitution:evt.target.checked};
          });
        
          this.setState({ educationDetails: newEducationDetails },console.log("workExperience",this.state.educationDetails));
        };
        

         institutionNameChange(e){
           this.setState({institutionName:e.target.value})
         }

         courseChange(e){
          this.setState({course:e.target.value})
        }
        salaryChange(e){
          this.setState({salary:e.target.value})
        }
        fromDateChange(e){
          this.setState({fromDate:e.target.value})
        }
        toDateChange(e){
          this.setState({toDate:e.target.value})
        }
        addAcademics(){
          //this.setState({educationDetails:[]})
          this.setState((prevState) => ({
            educationDetails:[...prevState.educationDetails,{institutionName:"",course:"",location:"",fromDate:"",toDate:"",isCurrentInstitution:false}]
          }))
          // this.setState({
            
          //   educationDetails: this.state.educationDetails.concat([{InstitutionName:"",Course:"",Location:"",FromDate:"",ToDate:"",IsCurrentInstitution:false}])
          // })
        }

        async loadAllAcademics(){
          if(this.props.jobPortal!=null && this.props.jobLib!=null){
            console.log("account",this.props.account)
         let allExperience = await this.props.jobPortal.methods.academicDetails(this.props.account,1).call();
         console.log("allEducation",allExperience)
         this.setState({
          educationDetails:[...this.state.educationDetails,allExperience]
         })
          }
          let tempeducationDetails=[]
          tempeducationDetails=this.state.educationDetails;
          console.log("tempPosts",tempeducationDetails)
        let tempeducationDetails1= _.uniqBy(tempeducationDetails, function (e) {
return (e.institutionName);
});
this.setState({
  educationDetails:tempeducationDetails1
})
        }

        async formSubmit(e){
          e.preventDefault()
           console.log(this.props.jobPortal)
           let blockNumber = await web3.eth.getBlockNumber();
           console.log("blockNumber",blockNumber)
           let count=0;
           this.props.jobPortal.events.AcademicsAdded({fromBlock:Number(blockNumber)+1,toBlock:'latest'},(err,result) =>{
             
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

           await this.props.jobPortal.methods.AddAcademics(this.institutionName.value,this.course.value,this.fromDate.value,this.toDate.value,"9").send({from:this.props.account})
           
        }

        
    
     

    render() {
      let me=this
        return (
            <div className="container-fluid mt-5">
               <div className="row">
                       <div className="form-group col-lg-8">

                         
                       </div>
                     
                         
  
                          <div className="form-group col-lg-4">

                            <button  className="btn btn-primary btn-block pull-right" onClick={this.addAcademics.bind(this)}>Add Education + </button>
                          </div>

                         
                      
                      </div>
                      {this.state.educationDetails.map((educationDetail,key)=>{
                        return(
                          <form onSubmit={this.formSubmit.bind(this)}>
                              <div className="row">
                          <div className=" form-group col-lg-4">
                            <input id="institutionName" type="text" value= {this.state.institutionName ? this.state.institutionName : educationDetail.institutionName} onChange={this.institutionNameChange.bind(this)} className="form-control" placeholder="Institution Name" required />
                          </div>
        
                          <div className=" form-group col-lg-4">
                            <input id="course"  type="text"  value= {this.state.course ? this.state.course : educationDetail.course} className="form-control"  onChange={this.courseChange.bind(this)} placeholder="Course" required />
                          </div>
                          </div>
                          <div className="row">
                          <div className=" form-group col-lg-4">
                            <input id="location"  type="text"  value= {this.state.course ? this.state.course : educationDetail.course} className="form-control"  onChange={this.courseChange.bind(this)} placeholder="Location" required />
                          </div>
                          <div className=" form-group col-lg-4">
                            <input id="salary" type="text" value= {this.state.salary ? this.state.salary : educationDetail.salary} className="form-control" onChange={this.salaryChange.bind(this)} placeholder="Salary" required />
                          </div>
        
                          
                          </div>
                          <div className="row">
                          <div className=" form-group col-lg-4">
                            <input id="fromDate"  type="text"  value= {this.state.fromDate ? this.state.fromDate : educationDetail.fromDate} className="form-control" onChange={this.fromDateChange.bind(this)}  placeholder="From Date" required />
                          </div>
                          {!educationDetail.isCurrentInstitution ?
                          <div className=" form-group col-lg-4">
                            <input id="toDate" type="text" value= {this.state.toDate ? this.state.toDate : educationDetail.toDate} className="form-control" onChange={this.toDateChange.bind(this)} placeholder="To Date" required />
                          </div>
                          :''}
                         
                          
                          </div>
                          <div className="row">
                          {/* <div className="custom-control custom-checkbox">
                               <input type="checkbox" className="custom-control-input" id="defaultChecked2" name={key} checked={educationDetail.isCurrentInstitution } onChange={
                                 function () {
                                   console.log("key",key)
                                  let curData = me.state.educationDetails;
                                  console.log("curData",curData)
                                     // id = curData.findIndex(function(elem){ return elem.teamName == el.teamName});
                                    let id =key;
                                      curData[id].isCurrentInstitution = !curData[id].isCurrentInstitution;
              
                                  me.setState({educationDetails:curData})
                                }
                               }/>
                               <label className="custom-control-label" for="defaultChecked2">Current Institution</label>
                            </div> */}
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

export default AddEducation
