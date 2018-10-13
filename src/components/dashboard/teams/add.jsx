import React, {Component} from 'react';
import Breadcrumbs from '../breadcrumbs/breadcrumbs'
import ApiService from '../../../services/api';
import NotificationService from '../../../services/notification';
import FormError from '../../form/form-error';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class TeamsAdd extends Component {
  constructor({props}) {
    super(props)

    this.state = {
      formErrors: {},
      defender: false,
      striker: false,
      name: '',
    }
  }

  render() {
    const breadcrumbs = [
      {
        label: 'dashboard',
      },
      {
        label: 'teams',
        link: '/teams'
      },
      {
        label: 'add',
        link: '/teams/add'
      },
    ]

    return (
      <div className="teams-add full-width-container">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <div className="content-container container-grey">
          <div className="row">
            <div className="col col-sm-3">
              <div className="panel panel-white">
                <p className="panel-title">Add a team</p>
                <form>
                  <div className="input-group">
                    <label>Name</label>
                    <input type="text" id="name" name="name" placeholder="Jon Doe" onChange={this.handleFormInputChange} />
                    {this.state.formErrors.name ? <FormError message={this.state.formErrors.name} /> : null}
                  </div>
                  <div className="input-group">
                    <label>Players</label>
                    {this.state.formErrors.players ? <FormError message={this.state.formErrors.players} /> : null}
                  </div>
                  <div className="players-container">
                    <div class="row">
                      <div class="col col-md-6">
                        <div class="player">
                          <p>Stephen</p>
                          <div class="positions-container">
                            <div className="position striker">
                              <FontAwesomeIcon icon="crosshairs" />
                            </div>
                            <div className="position defender">
                              <FontAwesomeIcon icon="shield-alt" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col col-md-6">
                        <div class="player">
                          <p>Joe</p>
                          <div class="positions-container">
                            <div className="position striker">
                              <FontAwesomeIcon icon="crosshairs" />
                            </div>
                            <div className="position defender">
                              <FontAwesomeIcon icon="shield-alt" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="input-group">
                    <button type="button" onClick={this.onSubmit}>Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  toggleStriker = () => {
    const newState = this.state;
    newState.formErrors.position = null;
    newState.striker = !this.state.striker;
    this.setState(newState)
  }

  toggleDefender = () => {
    const newState = this.state;
    newState.formErrors.position = null;
    newState.defender = !this.state.defender;
    this.setState(newState)
  }

  handleFormInputChange = (event) => {
    const id = event.target.id;
    const value = event.target.value;
    const newState = this.state;

    newState.formErrors[id] = null;
    newState[id] = value;
    this.setState({state: newState})
  }

  onSubmit = () => {
    if (!this.isFormValid()) {
      return;
    }

    ApiService.players.create({
      body: {
        name: this.state.name,
        striker: this.state.striker,
        defender: this.state.defender,
      }
    }).then(res => {
      localStorage.setItem('token', res.data.token);
      NotificationService.show('Player created successfully');
      this.props.history.push('/players')
    }, err => {
      NotificationService.error(err.response.data.message)
    })
  }

  isFormValid = () => {
    const newState = this.state;
    let stateSetFlag = false;

    for (const key of Object.keys(newState.formErrors)) {
      newState.formErrors[key] = null;
    }

    if (!this.state.name) {
      newState.formErrors.name = 'Name is required';
      stateSetFlag = true;
    }

    if (!this.state.striker && !this.state.defender) {
      newState.formErrors.position = 'Please select one or more positions';
      stateSetFlag = true;
    }

    if (stateSetFlag) {
      this.setState({state: newState})
      return false;
    }

    return true;
  }
}

export default TeamsAdd;
