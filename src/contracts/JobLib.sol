pragma solidity ^0.5.0;


contract JobLib{
    
    address owner;
    //add location
    // add skills
    // add date posted
    //add posted by
    struct Job {
        uint JobId;
        string position;
        string description;
        string company;
        string location;
        string skillsRequired;
        uint salary;
        uint applicationsCount;
        bool status;
        
        
    }
    uint  jobCount;
    uint  activeJobsCount;
    
    // jobId => job
    mapping(uint => Job) public jobs;
    //jobId => appicants
    mapping(uint => address[])  jobApplicants;
    
   
    
    
     function createJob(string memory _position, string memory _description, string memory _company,string memory _location, string memory _skillsRequired, uint _salary) public returns(uint)  {
        jobCount++;
        Job memory job = Job(jobCount,_position,_description,_company,_location, _skillsRequired, _salary,0,true);
        jobs[jobCount]=job;
        activeJobsCount++;
        
        
        //Job[] memory jobs = recruiterPostedJobs[msg.sender];
        //jobs.push(job);
       // recruiterPostedJobs[msg.sender]=jobs;
       // recuiterPostedJobsCount++;
       
       return jobCount;
        
    }
    
    function addJobApplicant(uint _jobId, address _applicant) public {
        Job memory job = jobs[_jobId];
        job.applicationsCount = job.applicationsCount+1;
        jobs[_jobId]=job;
        jobApplicants[_jobId].push(_applicant);
    }
    
    function getJobApplicants(uint _jobId) public view returns(address[] memory){
        return jobApplicants[_jobId];
    }
    function deleteJob(uint _jobId) public {
        require(jobs[_jobId].status,"Job is already deleted");
        delete jobApplicants[_jobId];
         Job memory job = jobs[_jobId];
         job.status=false;
         jobs[_jobId]=job;
         activeJobsCount--;
         
    } 
    
   // function getJobDetails(uint _id) public view returns(Job memory){
     //   return jobs[_id];
   // }
    
    function getJobCount() public view returns(uint){
        return jobCount;
    }
    
    function getJobApplicantsCount(uint _id) public view returns(uint){
        //require(jobs[_jobId].status,"This job is deleted")
        return jobs[_id].applicationsCount;
    }
 
}