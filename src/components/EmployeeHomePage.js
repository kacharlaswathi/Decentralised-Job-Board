import React, { Component } from 'react'
import DisplayAllJobs from './DisplayAllJobs'

 class EmployeeHomePage extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       enableSearch:false,
       searchText:""
    }
  }
  

    render() {
        return (
            <div className="container-fluid mt-5">
              <div className="row">
                <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '1000px' }}>
                  <div className="content mr-auto ml-auto">
                    <p>&nbsp;</p>
                      <form onSubmit={(event) => {
                        event.preventDefault()
                        this.setState({
                          searchText:this.searchText.value,
                          enableSearch:true
                        })
                        this.refs.child.loadAllJobs();
                      }}>
                        <div className="row">
                      <div className="form-group col-lg-10">
                        <input
                          id="postContent"
                          type="text"
                          ref={(input) => { this.searchText = input }}
                          className="form-control"
                          placeholder="Search by Company"
                          required />
                      </div>
                       <div className="form-group mr-sm-1">
                      <button type="submit" className="btn btn-primary btn-block">Search Jobs</button>
                      </div>
                      </div>
                    </form>
                    <p>&nbsp;</p>
                    <DisplayAllJobs jobPortal={this.props.jobPortal} jobLib={this.props.jobLib} account={this.props.account} searchText={this.state.searchText} enableSearch={this.state.enableSearch} ref="child"/>
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
                  </div>
                </main>
              </div>
            </div>
          )
    }
}

export default EmployeeHomePage
