var React = require('react');

var ReactDOM = require('react-dom');

var ons = require('onsenui');

var Ons = require('react-onsenui');

var client = require('./client');

var MyPage = React.createClass({
  getInitialState: function() {
    return {
      search: '',
      username: '',
      todo:[]
    };
  },
  componentDidMount(){
    let todo=[]
    let todo2=[]
    console.log("Hi React");
    var that = this;
    var url = 'http://localhost:8080/api/patients/'
        fetch(url)
      .then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then(function(data) {
      // that.setState({ person: data.person });
      console.log(data._embedded.patients)
      todo=data._embedded.patients
       that.setState({todo}) 
       todo.map((d,idx)=>{
      that.setState({username:d.name})
      

     })
     
    });
    
   
  },

  renderToolbar() {
    return (
      <Ons.Toolbar>
        <div className='center'>Welcome</div>
      </Ons.Toolbar>
    );
  },

  handleClick: function() {
    if (this.state.search == this.state.username) {
      ons.notification.alert('found    complete is Patient :' +  this.state.username);
    }
    else {
      ons.notification.alert('Not found');
    }
  },
  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  },
  handleSearchChange(e) {
    this.setState({search: e.target.value});
    //console.log(e);
  },
  

  render: function() {
    return (
      <Ons.Page renderToolbar={this.renderToolbar}>
        <section style={{textAlign: 'center'}}>
          <p>
            <Ons.SearchInput
              value={this.state.search}
              onChange={this.handleSearchChange}
              float
              placeholder='Search' />
          </p>
          <p>
            <Ons.Button onClick={this.handleClick}>Search</Ons.Button>
          </p>
        </section>

      </Ons.Page>
    );
  }
});

ons.ready(function() {
  ReactDOM.render(<MyPage />, document.getElementById('react'));
});