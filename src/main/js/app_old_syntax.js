var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');
var client = require('./client');
var index = 1;

var MyPage = React.createClass({
  getInitialState: function () {
    return {
      username: '',
      Symptom: '',
      Hospital: 'SUT',
      Ambalance: 'A123',
      Doctor: '',
      diagnose: '',
      search: ' ',


      vegetables: [
        1
      ],
      selectedVegetable: 'Onion',
      todo: []

    };
  },

  renderToolbar: function (route, navigator) {

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

  handleClick: function (navigator) {
    ons.notification.confirm('Do you really want to go back?')
      .then((response) => {
        if (response === 1) {
          navigator.popPage();
          index=1;
        }
        
      });
  },

  componentDidMount() {
    let todo = []

    console.log("Hi React");
    var that = this;
    var url = 'http://localhost:8080/api/patients/'
    fetch(url)
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function (data) {
        // that.setState({ person: data.person });
        console.log(data._embedded.patients)
        todo = data._embedded.patients
        that.setState({ todo })
        todo.map((d, idx) => {
          that.setState({ username: d.name })
          that.setState({ Symptom: d.symptom })
        })

      });


  },





  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  },
  handlediagnoseChange(e) {
    this.setState({ diagnose: e.target.value.trim() });

  },

  handleSearchChange(e) {
    this.setState({ search: e.target.value.trim() });
  },


  handleVegetableChange(vegetable) {
    this.setState({ selectedVegetable: vegetable });
  },

  pushPage: function (navigator) {
    navigator.pushPage({
      title: `ใบสรุปผล `,
      hasBackButton: true
    

    });

    index=1;
  },

  pushPage: function (navigator) {
    navigator.pushPage({
      title: `ผลการค้นหา `,

      hasBackButton: true

    });

    index++;
  },





  renderPage: function (route, navigator) {
    this.componentDidMount



    if (index == 1) {
      return (
        <Ons.Page key={route.title} renderToolbar={this.renderToolbar.bind(this, route, navigator)}>
          <section style={{ textAlign: 'center' }}>
            <p>
              <Ons.SearchInput
                value={this.state.search}
                onChange={this.handleSearchChange}
                float
                placeholder='Search' />

            </p>
            <p>
            </p>


          </section>
          <section style={{ margin: '16px', textAlign: 'center' }}>
            <Ons.Button onClick={this.pushPage.bind(this, navigator)}>Next</Ons.Button>
          </section>
        </Ons.Page>
      );
    }
    else if (index === 2) {
      if (this.state.search === this.state.username) {
        console.log(index)
        return (
          <Ons.Page key={route.title} renderToolbar={this.renderToolbar.bind(this, route, navigator)}>
            <Ons.ListItem>ชื่อคนไข้ :{this.state.username}</Ons.ListItem>
            <Ons.ListItem>อาการป่วย : {this.state.Symptom}</Ons.ListItem>
            <Ons.ListItem> หมอที่ดูแล :{this.state.Doctor} </Ons.ListItem>
            <Ons.ListItem> วินิจฉัยอาการ :{this.state.diagnose} </Ons.ListItem>
            <section style={{ textAlign: 'center' }}>
              <p>
                <Ons.Input
                  value={this.state.diagnose}
                  onChange={this.handlediagnoseChange}
                  modifier='underbar'
                  float
                  placeholder='กรุณากรอกข้อมุล' />
              </p>
            </section>
            <section style={{ margin: '16px', textAlign: 'center' }}>
              <Ons.Button onClick={this.handleClick_SAVE}>Save</Ons.Button>
            </section>

            <section style={{ margin: '16px', textAlign: 'center' }}>
              <Ons.Button onClick={this.pushPage.bind(this, navigator)}> ดูใบบันทึกการส่งตัว </Ons.Button>
            </section>
          </Ons.Page>

        );
      } else {
        return (

          <Ons.Page key={route.title} renderToolbar={this.renderToolbar.bind(this, route, navigator)}>
            <Ons.ListHeader>ไม่มีคนไข้ในระบบ (ชื่อของsearch) :{this.state.search}</Ons.ListHeader>
            <section style={{ margin: '16px', textAlign: 'center' }}>
              <Ons.BackButton onClick={this.handleClick.bind(this, navigator)}>Back</Ons.BackButton>
            </section>
          </Ons.Page>

        );
      }
    } else if (index === 3) {
      
      return (<Ons.Page key={route.title} renderToolbar={this.renderToolbar.bind(this, route, navigator)}>

        <Ons.ListHeader>ชื่อคนไข้ :{this.state.username}</Ons.ListHeader>
        <Ons.ListHeader>อาการป่วย:{this.state.Symptom} </Ons.ListHeader>
        
      </Ons.Page>
      );



    }

  },

  handleClick_SAVE() {
    if (this.state.diagnose) {
      // ons.notification.alert('Save')
      client({ method: 'GET', path: '/vote/' + 1 + '/point/' + `${this.state.diagnose}` }).done(
        ons.notification.alert('SAVE Done')
      )



    } else {
      ons.notification.alert('Data is null pls try Again ><')
    }

  },



  render: function () {
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