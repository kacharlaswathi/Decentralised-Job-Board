import React, { Component } from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import PostJob from './PostJob';
import DisplayJob from './DisplayJob';

 class RecruiterHomePage extends Component {
  
   async componentWillMount()
   {
     // await this.loadJobs();
   }

    constructor(props) {
        super(props)
    
        this.state = {
             enablePostJob:false,
              enableSearch:false,
              searchText:""
             
        }
        this.form1 = null;
        //console.log("prop value",props.jobPortal)
    }

     async loadJobs(){
        let jobCount =await this.props.jobPortal.methods.getRecruiterPostedJobs().call();
     }
   
    changeValue = e => {
        console.log(e);
        this.setState({enablePostJob: e});
        console.log(this.state.enablePostJob)}

    formSubmit(){
        
            //event.preventDefault()
            this.setState(prevState => ({
                enablePostJob: !prevState.enablePostJob
                
              }));
        console.log(this.state.enablePostJob)
            //const content = this.postContent.value
            
            //this.props.createPost(content)
        }

        // changeValue(arg){
        //    this.setState({enablePostJob : arg})
        // }
    
    
    render() {
        return (
            <div className="container-fluid mt-5">
              <div className="row">
                <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '1000px' }}>
                  <div className="content mr-auto ml-auto">
                    <p>&nbsp;</p>
                    {(!this.state.enablePostJob) ?
                    <div>
                            <form onSubmit={(event) => {
                        event.preventDefault()
                        this.setState({
                          searchText:this.searchText.value,
                          enableSearch:true
                        })
                        this.refs.child.loadJobs();}}
                        >
                                <div className="row">
                                    <div className=" form-group col-lg-10">
                                        <input
                                            id="postContent"
                                            type="text"
                                            ref={(input) => { this.searchText = input }}
                                            className="form-control"
                                            placeholder="Search by Title"
                                            required />
                                    </div>
                                    <div className="form-group mr-sm-1">

                                        <button type="submit" className="btn btn-primary btn-block">Search Job Posts </button>
                                    </div>
                                </div>
                            </form> 
                            <div className="row">
                                <div className="form-group col-lg-10"></div>
                            <div className="form-group mr-sm-1">
                            <button  className="btn btn-primary btn-block" onClick={this.formSubmit.bind(this)}>Post Job + </button>
                            </div>
                            </div>
                            </div>

                            
                            :''
                        }
                    <p>&nbsp;</p>
                    {(this.state.enablePostJob) ? (<PostJob isEnabled = {this.state.enablePostJob} changeValue={this.changeValue}  jobPortal={this.props.jobPortal} jobLib={this.props.jobLib} account={this.props.account} />) : ''}
                    {/* { this.props.posts.map((post, key) => {
                      return(
                        <div className="card mb-4" key={key} >
                          <div className="card-header">
                            <img
                              className='mr-2'
                              width='30'
                              height='30'
                              src={`data:image/png;base64,${new Identicon(post.author, 30).toString()}`}
                            />
                            <small className="text-muted">{post.author}</small>
                          </div>
                          <ul id="postList" className="list-group list-group-flush">
                            <li className="list-group-item">
                              <p>{post.content}</p>
                            </li>
                            <li key={key} className="list-group-item py-2">
                              <small className="float-left mt-1 text-muted">
                                
                              </small>
                              <button
                                className="btn btn-link btn-sm float-right pt-0"
                                name={post.id}
                                onClick={(event) => {
                                  
                                  
                                }}
                              >
                                Apply Job
                              </button>
                            </li>
                          </ul>
                        </div>
                      )
                    })} */}
                    <DisplayJob jobPortal={this.props.jobPortal} jobLib={this.props.jobLib} account={this.props.account} history={this.props.history} searchText={this.state.searchText} enableSearch={this.state.enableSearch} ref="child" />
                  </div>
                </main>
              </div>
            </div>
          )
    }
}

export default RecruiterHomePage
