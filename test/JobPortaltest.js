const JobPortal = artifacts.require('./JobPortal.sol')
const JobLib = artifacts.require('./JobLib.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

  
  
  contract('JobPortal', (accounts) => {
    let jobPortal
    let jobLib
  
    before(async () => {
      jobLib = await JobLib.deployed()
      jobPortal = await JobPortal.deployed(jobLib.address)
    })
  
    describe('contracts deployment', async () => {
      it('deploys JobLib successfully', async () => {

        const jobLibAddress = await jobLib.address
        assert.notEqual(jobLibAddress, 0x0)
        assert.notEqual(jobLibAddress, '')
        assert.notEqual(jobLibAddress, null)
        assert.notEqual(jobLibAddress, undefined)
             
      })

      it('deploys JobPortal successfully', async () => {
       
        const jobPortalAddress = await jobPortal.address
        assert.notEqual(jobPortalAddress, 0x0)
        assert.notEqual(jobPortalAddress, '')
        assert.notEqual(jobPortalAddress, null)
        assert.notEqual(jobPortalAddress, undefined)

       

      })
  
     
    })

    describe('register users', async () => {
      it('register Recruiter', async () =>{
           await jobPortal.registerRecruiter("Recruiter1","RecruiterCompany1","RecruiterEmail1",{from : accounts[0]})
           let recruiterProfile = await jobPortal.registeredRecruiters(accounts[0])
           assert.notEqual(recruiterProfile.recruiterAddress,0x0)
           assert.equal(recruiterProfile.recruiterAddress,accounts[0])
           

           let booleanCheck = await jobPortal.isRecruiter(accounts[0])
           assert.notEqual(booleanCheck,false)
           assert.equal(booleanCheck,true)
      })

      it('register Employee', async () =>{
         await jobPortal.registerEmployee("Employee1","EmpoyeeEmail1",{from : accounts[0]})
         let recruiterProfile = await jobPortal.registeredRecruiters(accounts[0])
         assert.notEqual(recruiterProfile.recruiterAddress,0x0)
         assert.equal(recruiterProfile.recruiterAddress,accounts[0])
       
         let booleanCheck = await jobPortal.isEmployee(accounts[0])
           assert.notEqual(booleanCheck,false)
           assert.equal(booleanCheck,true)
         
    })
    })

    describe('Job test cases', async () => {
      it('post job', async () => {
         await jobPortal.PostJob("Blockchain Engineer","job description 1","Microsoft", "Bangalore","solidity, Ethereum,javascript", 1000000, {from : accounts[0]})

        let postedJobs = await jobPortal.getRecruiterPostedJobs({from:accounts[0]})

        console.log(postedJobs.length)
        assert.notEqual(postedJobs.length,0)
        assert.equal(postedJobs.length,1)

      })

      it('apply job', async() => {
           await jobPortal.ApplyJob(1,{from:accounts[0]})

        let appliedJobs = await jobPortal.getEmployeeAppliedJobs({from:accounts[0]})
        assert.notEqual(appliedJobs.length,0)
        assert.equal(appliedJobs.length,1)
      })

      it('delete job', async() => {
         await jobPortal.deleteJob(1,{from:accounts[0]})
         let postedJobs = await jobPortal.getRecruiterPostedJobs({from:accounts[0]})
         assert.ok(!postedJobs[0].status)
         

      })

      //fail

      it('delete a failed job', async() => {
        await jobPortal.deleteJob(1,{from:accounts[0]})
        
      })
    })

    describe('User details', async () => {
      it('Add Academics', async() => {
        await jobPortal.AddAcademics("Emurgo Academy","Blockchain","July 27, 2019" ," Dec 20,2019","4 months")

        let academicDetails = await jobPortal.academicDetails(accounts[0],1)
        //console.log(academicDetails)
        assert.notEqual(academicDetails.institutionName,"")
        assert.equal(academicDetails.institutionName,"Emurgo Academy")
      })

      it('Update Academics', async () => {
        await jobPortal.UpdateAcademics(1,"Emurgo Academy", "Ethereum Blockchain", "July 27, 2019"," Dec 20,2019","4 months")
         let academicDetails= await jobPortal.academicDetails(accounts[0],1)
         assert.notEqual(academicDetails.course,"Blockchain")
         assert.equal(academicDetails.course,"Ethereum Blockchain")
      })

      it('Add Work Experience', async() => {
        await jobPortal.AddExperience("Emurgo","Blockchain Engineer",100000,"July 27, 2019" ," Dec 20,2019","4 months",false)

        let experienceDetails = await jobPortal.workExperienceDetails(accounts[0],1)
        //console.log(academicDetails)
        assert.notEqual(experienceDetails.companyName,"")
        assert.equal(experienceDetails.companyName,"Emurgo")
      })

      it('Update Work Experience', async () => {
        await jobPortal.UpdateExperience(1,"Emurgo","Senior Blockchain Engineer",150000,"July 27, 2019" ," Dec 20,2019","4 months",false)
         let experienceDetails= await jobPortal.workExperienceDetails(accounts[0],1)
         assert.notEqual(experienceDetails.role,"Blockchain Engineer")
         assert.equal(experienceDetails.role,"Senior Blockchain Engineer")
      })
    })
  })