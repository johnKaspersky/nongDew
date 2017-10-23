var React = require('react');

var ReactDOM = require('react-dom');

var ons = require('onsenui');

var Ons = require('react-onsenui');

var client = require('./client');

var MyPage = React.createClass({
  getInitialState: function() {
    return {
      search: ''
    };
  },

  renderToolbar() {
    return (
      <Ons.Toolbar>
        <div className='center'>Welcome</div>
      </Ons.Toolbar>
    );
  },

  handleClick: function() {
    if (this.state.search === 'notify' || this.state.search === 'notification history') {
      ons.notification.alert('');
    }
    else {
      ons.notification.alert('Not found');
    }
  },

  handleSearchChange(e) {
    this.setState({search: e.target.value});
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