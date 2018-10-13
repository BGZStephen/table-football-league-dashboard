import React, {Component} from 'react';
import ApiService from '../../../services/api';
import NotificationService from '../../../services/notification';
import Breadcrumbs from '../breadcrumbs/breadcrumbs'
import FormError from '../../form/form-error';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class PlayerEdit extends Component {
  constructor(props) {
    super(props)

    this.state = {
      formErrors: {name: null},
      player: {
        name: '',
        position: {
          striker: false,
          defender: false,
        }
      }
    }

    this.fetchPlayer();
  }

  render() {
    const breadcrumbs = [
      {
        label: 'dashboard',
      },
      {
        label: 'players',
        link: '/players'
      },
      {
        label: 'add',
        link: '/players/add'
      },
    ]

    return (
      <div className="players-add full-width-container">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <div className="content-container container-grey">
          <div className="row">
            <div className="col col-sm-3">
              <div className="panel panel-white">
                <p className="panel-title">Edit a player</p>
                <form>
                  <div className="input-group">
                    <label>Name</label>
                    <input type="text" id="name" name="name" placeholder="Jon Doe" value={this.state.player.name} onChange={this.handleFormInputChange} />
                    {this.state.formErrors.name ? <FormError message={this.state.formErrors.name} /> : null}
                  </div>
                  <div className="input-group">
                    <label>Position</label>
                    {this.state.formErrors.position ? <FormError message={this.state.formErrors.position} /> : null}
                  </div>
                  <div className="positions-container">
                    <div className={this.state.player.position.striker ? "position striker active" : "position striker"} onClick={this.toggleStriker}>
                      <FontAwesomeIcon icon="crosshairs" />
                      <p>Striker</p>
                    </div>
                    <div className={this.state.player.position.defender ? "position defender active" : "position defender"} onClick={this.toggleDefender}>
                      <FontAwesomeIcon icon="shield-alt" />
                      <p>Defender</p>
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
    newState.player.position.striker = !this.state.player.position.striker;
    this.setState(newState)
  }

  toggleDefender = () => {
    const newState = this.state;
    newState.formErrors.position = null;
    newState.player.position.defender = !this.state.player.position.defender;
    this.setState(newState)
  }

  handleFormInputChange = (event) => {
    const id = event.target.id;
    const value = event.target.value;
    const newState = this.state;

    newState.formErrors[id] = null;
    newState.player[id] = value;
    this.setState({state: newState})
  }

  onSubmit = () => {
    if (!this.isFormValid()) {
      return;
    }

    ApiService.players.update({
      body: this.state.player,
      params: {
        id: this.state.player._id
      }
    }).then(res => {
      localStorage.setItem('token', res.data.token);
      NotificationService.show('Player updated successfully');
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

    if (!this.state.player.name) {
      newState.formErrors.name = 'Name is required';
      stateSetFlag = true;
    }

    if (!this.state.player.position.striker && !this.state.player.position.defender) {
      newState.formErrors.position = 'Please select one or more positions';
      stateSetFlag = true;
    }

    if (stateSetFlag) {
      this.setState({state: newState})
      return false;
    }

    return true;
  }

  fetchPlayer = () => {
    const id =this.props.match.params.id;

    ApiService.players.get({
      params: {
        id,
      }
    })
    .then(res => {
      console.log(res)
      this.setState({player: res.data})
    }, err => {
      NotificationService.error(err.response.data.message)
    })
  }
}

export default PlayerEdit;
