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



});
ReactDOM.render(<MyPage />, document.getElementById('react'));