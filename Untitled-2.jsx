var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');
var client = require('./client');







var MyPage = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      Symptom: '',
      Hospital: 'SUT',
      Ambalance: 'A123',
      Doctor: 'Chanwit',
      diagnose:'',
      
      
      vegetables: [
        1
      ],
      selectedVegetable: 'Onion',
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
      that.setState({Symptom:d.symptom})

     })
     
    });
    
   
  },
  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  },
  handlediagnoseChange(e) {
    this.setState({diagnose: e.target.value});
  },

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  },

  handleVegetableChange(vegetable) {
    this.setState({selectedVegetable: vegetable});
  },

  

  renderRadioRow(row) {
    return (
     <Ons.ListItem>
    <ons-list-header>Patient</ons-list-header>
    <ons-list-item>  name :{this.state.username}</ons-list-item>
      <ons-list-item> Symptom :{this.state.Symptom}</ons-list-item>
    <ons-list-item>Hosptial :{this.state.Hospital}</ons-list-item>
    <ons-list-item> Ambulance :{this.state.Ambalance} </ons-list-item>
     <ons-list-item>Doctor :{this.state.Doctor} </ons-list-item>
     <ons-list-item>diagnose :{this.state.diagnose} </ons-list-item>
     </Ons.ListItem>
    )
  },
 handleClick(){
      if(this.state.diagnose){
             client({method: 'GET', path: '/vote/'+1+'/point/' + `${this.state.diagnose}`}).done(
             ons.notification.alert('OK!')
     )
    }else{
      ons.notification.alert('Data is null pls try Again ><')
    }
  },

  render: function() {
    this.componentDidMount
   
    return (
      <Ons.Page renderToolbar={this.renderToolbar}>
  
       <Ons.List
          dataSource={this.state.vegetables}
          renderRow={this.renderRadioRow}
        />
        <section style={{textAlign: 'center'}}>
          <p>
            
          </p>
          <p>
          
            <Ons.Input
              value={this.state.diagnose}
              onChange={this.handlediagnoseChange}
              modifier='underbar'
              float
              placeholder='Enter  diagnose :' />
          </p>
          <p>
            
          </p>
          <p>
            <Ons.Button onClick={this.handleClick}>Save</Ons.Button>
          </p>
        </section>

       
    
        
      </Ons.Page>
    );
  }
});

ons.ready(function() {
  ReactDOM.render(<MyPage />, document.getElementById('react'));
});