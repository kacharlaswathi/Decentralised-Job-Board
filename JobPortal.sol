import "./JobLib.sol";
pragma solidity ^0.5.0;



contract JobPortal 
{
    address owner;
    JobLib jobLib;
    
    // add contact no
    struct Employee{
        string name;
        string email;
        address employeeAddress;
        string skillset;
        uint workExperienceCount;
        uint academicCount;
        uint jobsAppliedCount;
    }
    
    mapping(address => mapping(uint => WorkExperience)) public workExperienceDetails;
    mapping(address => mapping(uint => Academics)) public academicDetails;
    
    //add Location
    struct WorkExperience {
        string companyName;
       
        string role;
        uint salary;
        string fromDate;
        string ToDate;
        string duration;
        //string location;
        bool isCurrentEmployer;
    }
    //add Location
    struct Academics {
        string institutionName;
       
        string course;
        string fromDate;
        string toDate;
        //string location;
        string duration;
    }
    
    mapping(address => Employee) public registeredEmployees;
  
    
    
     struct Recruiter{
        string name;
        string companyName;
        address recruiterAddress;
        string email;
        uint jobCount;
       
    }
    
    modifier onlyRecruiter {
        require(isRecruiter[msg.sender],"The user should be recruiter");
        _;
    }
    
    modifier notRecruiter{
        require(isEmployee[msg.sender],"The user should be employee");
        _;
    }
    
    mapping(address => bool) public isRecruiter;
    mapping(address => bool) public isEmployee;
    mapping(address => Recruiter) public  registeredRecruiters;
     mapping(address => uint[]) public recruiterPostedJobs;
    mapping(address => uint[]) public employeeAppliedJobs;

    constructor(JobLib _jobLib) public{
        owner=msg.sender;
        jobLib=_jobLib;
    }
    
    // Events for Employee
    event EmployeeRegistered(string  _name, string  _email,address _employeeAddress);
    event UpdatedBasicProfile(string _name, string _email, address _employeeAddress);
    event AcademicsAdded(string  _institutionName, string  _course, string  _fromDate, string  _toDate, string  _duration);
    event AcademicsUpdated(uint _id,string  _institutionName, string  _course, string  _fromDate, string  _toDate, string  _duration);
    event ExperienceAdded(string  _companyName,string  _role,uint _salary, string  _fromDate, string  _toDate, string  _duration, bool _isCurrentEmployer);
    event ExperienceUpdated(uint _id, string  _companyName,string  _role,uint _salary, string  _fromDate, string  _toDate, string  _duration, bool _isCurrentEmployer);
    event JobApplied(uint _jobId, address _employee);
    
    // Events for Employer
    
    event RecruiterRegistered(string _name, string _companyName, address _recruiterAddress, string _email);
    event JobPosted(address _recruiterAddress,string _position, string _description, string _company, string _skillsRequired, uint _salary);
    event JobDeleted(uint _jobId, address _recruiter);
    
    
    //function registerUser(string memory _name,string memory _email,bool _isRecruiter) public  {
       // if(_isRecruiter){
        //    require(!isRecruiter[msg.sender],"User already registered as employer");
        //    registeredRecruiters[msg.sender]=Recruiter(_name,"",msg.sender,_email,0);
        //    isRecruiter[msg.sender]=true;
        
        //   emit RecruiterRegistered(_name,msg.sender,_email);
       // }
       // else{
       // require(!isEmployee[msg.sender],"User already registered as employee");
       // registeredEmployees[msg.sender] =  Employee(_name,_email,msg.sender,"",0,0,0);
       // //isRecruiter[msg.sender]=false;
       // isEmployee[msg.sender]=true;
        
       // emit EmployeeRegistered(_name,_email,msg.sender);
       // }
        
   // }
    
      function registerEmployee(string memory _name,string memory _email) public  {
        require(!isEmployee[msg.sender],"User already registered as employee");
        registeredEmployees[msg.sender] =  Employee(_name,_email,msg.sender,"",0,0,0);
        
        isEmployee[msg.sender]=true;
        
        emit EmployeeRegistered(_name,_email,msg.sender);
        
    }
    
    function updatebasicProfile(string memory _name, string memory _email) public {
        Employee memory employee= registeredEmployees[msg.sender];
        employee.name=_name;
        employee.email=_email;
        registeredEmployees[msg.sender]=employee;
        
        emit UpdatedBasicProfile(_name,_email,msg.sender);
    }
    
     function AddAcademics(string memory _institutionName, string memory _course, string memory _fromDate, string memory _toDate, string memory _duration) public notRecruiter{
        
        registeredEmployees[msg.sender].academicCount++;
        
        Academics memory academics = Academics(_institutionName, _course,_fromDate,_toDate,_duration);
        academicDetails[msg.sender][registeredEmployees[msg.sender].academicCount]=academics;
        
       
        
        emit AcademicsAdded(_institutionName,_course,_fromDate,_toDate,_duration);
        
    }
    
    function UpdateAcademics(uint _id, string memory _institutionName, string memory _course, string memory _fromDate, string memory _toDate, string memory _duration) public notRecruiter {
        Academics memory academics = Academics(_institutionName,_course,_fromDate,_toDate, _duration);
        academicDetails[msg.sender][_id]=academics;
        
        emit AcademicsUpdated(_id, _institutionName,_course,_fromDate,_toDate,_duration);
    }
    
    
   
    
   
     function AddExperience(string memory _companyName,  string memory _role,uint _salary, string memory _fromDate, string memory _toDate,  string memory _duration, bool _isCurrentEmployer) public notRecruiter{
        registeredEmployees[msg.sender].workExperienceCount++;
        
        WorkExperience memory workExperience = WorkExperience(_companyName,_role,_salary,_fromDate,_toDate , _duration, _isCurrentEmployer);
        
        workExperienceDetails[msg.sender][registeredEmployees[msg.sender].workExperienceCount]=workExperience;
        emit ExperienceAdded(_companyName,_role,_salary,_fromDate,_toDate,_duration,_isCurrentEmployer);
        
    }
    
    function UpdateExperience(uint _id,  string memory _companyName,string memory _role,uint _salary, string memory _fromDate, string memory _toDate, string memory _durartion, bool _isCurrentEmployer) public notRecruiter
    {
        WorkExperience memory workExperience = WorkExperience(_companyName,_role,_salary,_fromDate,_toDate, _durartion, _isCurrentEmployer);
        
         workExperienceDetails[msg.sender][_id]=workExperience;
        emit ExperienceUpdated(_id,_companyName,_role,_salary,_fromDate,_toDate,_durartion,_isCurrentEmployer);
    }
    
     
   
    
    function registerRecruiter(string memory _name, string memory _companyName,  string memory _email) payable public {
        require(!isRecruiter[msg.sender],"User already registered as employer");
        registeredRecruiters[msg.sender]=Recruiter(_name,_companyName,msg.sender,_email,0);
        isRecruiter[msg.sender]=true;
        
        emit RecruiterRegistered(_name,_companyName,msg.sender,_email);
    }
    
    function PostJob(string memory _position, string memory _description, string memory _company, string memory _location, string memory _skillsRequired, uint _salary) public onlyRecruiter{
       uint  jobId=jobLib.createJob(_position,_description,_company,_location, _skillsRequired,_salary);
       uint jobCount =registeredRecruiters[msg.sender].jobCount;
       jobCount++;
       registeredRecruiters[msg.sender].jobCount=jobCount;
      
       uint[] memory postedJobs = recruiterPostedJobs[msg.sender];
       uint[] memory tempJobs= new uint[](jobCount);
       
       for(uint i=0;i<jobCount-1;i++)
       {
           tempJobs[i]=postedJobs[i];
       }
       tempJobs[jobCount-1]=jobId;
      
       recruiterPostedJobs[msg.sender]=tempJobs;
        
        emit JobPosted(msg.sender,_position,_description,_company,_skillsRequired,_salary);
    }
    
 
     function ApplyJob(uint _id) public notRecruiter
    {
        
        jobLib.addJobApplicant(_id,msg.sender);
       uint jobCount= registeredEmployees[msg.sender].jobsAppliedCount;
       jobCount++;
       registeredEmployees[msg.sender].jobsAppliedCount=jobCount;
        
       
       uint[] memory appliedJobs = employeeAppliedJobs[msg.sender];
       uint[] memory tempJobs= new uint[](jobCount);
       
       for(uint i=0;i<jobCount-1;i++)
       {
           tempJobs[i]=appliedJobs[i];
       }
       tempJobs[jobCount-1]=_id;
       
       employeeAppliedJobs[msg.sender]=tempJobs;
        emit JobApplied(_id,msg.sender);
        
    }
    
    function getJobApplicants(uint _id) public view onlyRecruiter returns (address[] memory){
      
      return jobLib.getJobApplicants(_id);
    }
    
    function getRecruiterPostedJobs() public view returns (uint[] memory){
        return recruiterPostedJobs[msg.sender];
    }
    
     function getEmployeeAppliedJobs() public view returns (uint[] memory){
        return employeeAppliedJobs[msg.sender];
    }
    
    function deleteJob(uint _id) public  onlyRecruiter {
        jobLib.deleteJob(_id);
        emit JobDeleted(_id,msg.sender);
    }
  
}
