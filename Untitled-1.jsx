var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');
var client = require('./client');
var index = 1;

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

  renderToolbar: function(route, navigator) {
    
    const backButton = route.hasBackButton
      ? <Ons.BackButton onClick={this.handleClick.bind(this, navigator)}>Back</Ons.BackButton>
      : null;
    return (
      <Ons.Toolbar>
        <div className='left'>{backButton}</div>
        <div className='center'>{route.title}</div>
      </Ons.Toolbar>
            
    );

    
   
  },

  handleClick: function(navigator) {
    ons.notification.confirm('Do you really want to go back?')
      .then((response) => {
        if (response === 1) {
          navigator.popPage();
          index--;
        }
      });
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

  
  Cancel_OnClick(){
    
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
  
 
  pushPage: function(navigator) {
    navigator.pushPage({
      title: `ใบวินิจฉัย `,
      hasBackButton: true
    
    });
    if(index===2){
    //  index--;
    }
    index++;
  },
  pushPage: function(navigator) {
    navigator.pushPage({
      title: `ใบบันทึกการส่งตัว `,
      hasBackButton: true
     
    });
    if(index===3){
      index--;
    }
    index++;
  },

  renderPage: function(route, navigator) {
      this.componentDidMount
    if(index==1){
      return (
          <Ons.Page key={route.title} renderToolbar={this.renderToolbar.bind(this, route, navigator)}>
          <Ons.ListHeader>ประวัติคนไข้: </Ons.ListHeader>
          <section style={{textAlign: 'center'}}>
            <p>
               <Ons.ListItem>
    <ons-list-header>Patient</ons-list-header>
    <ons-list-item>  name :{this.state.username}</ons-list-item>
      <ons-list-item> Symptom :{this.state.Symptom}</ons-list-item>
    
     </Ons.ListItem>
            </p>
            </section>
          
          <Ons.ListHeader>รหัสสมาชิก: </Ons.ListHeader>
          <section style={{textAlign: 'center'}}>
            <p>
              <Ons.Input
                value={this.state.nameId}
                onChange={this.handleNameIdChange}
                modifier='underbar'
                float
                placeholder='รหัสสมาชิก' />
            </p>
            </section>
            
            <Ons.ListHeader>วินิจฉัย : </Ons.ListHeader>
            <section style={{textAlign: 'center'}}>
            <p>
              <Ons.Input
                value={this.state.roomId}
                onChange={this.handleRoomIdChange}
                modifier='underbar'
                float
                placeholder='รหัสใบจองห้อง' />
            </p>
            </section>
            
          <section style={{margin: '16px', textAlign: 'center'}}>
            <Ons.Button onClick={this.pushPage.bind(this, navigator)}>Next</Ons.Button>
          </section>
        </Ons.Page>
      );
      }else 
      var a = this.state.handleNameChange
      var b = this.state.handleNameIdChange
      var h = this.state.handleRoomIdChange
     return (
        <Ons.Page key={route.title} renderToolbar={this.renderToolbar.bind(this, route, navigator)}>
        <Ons.ListHeader>ชื่อ-สกุล {this.state.Name}:</Ons.ListHeader>
        <Ons.ListHeader>รหัสสมาชิก : {this.state.NameId}</Ons.ListHeader>
        <Ons.ListHeader>รหัสใบจองห้อง :{this.state.RoomId} </Ons.ListHeader>
          <section style={{margin: '16px', textAlign: 'center'}}>
            <Ons.Button onClick={this.Cancel_OnClick.bind(this)}>
              สำเร็จ
            </Ons.Button>
          </section>
        </Ons.Page>
      );

        return (
      <Ons.Page key={route.title} renderToolbar={this.renderToolbar.bind(this, route, navigator)}>
        <p style={{textAlign: 'center'}}>
        
       <p>
           <Ons.ListHeader>ชื่อ-สกุล : {a}</Ons.ListHeader>
        
           <Ons.ListHeader>รหัสสมาชิก :{b} </Ons.ListHeader>
           
           <Ons.ListHeader>รหัสใบจองห้อง : {h}</Ons.ListHeader>

          </p>
        
     
      </p>
     
      </Ons.Page>
      );
  },


  render: function() {
    return (
      <Ons.Navigator
        swipeable
        renderPage={this.renderPage}
        initialRoute={{
          title: 'History Patient',
          hasBackButton: false
          
        }}
      />
    );
  }
});
ReactDOM.render(<MyPage />, document.getElementById('react'));