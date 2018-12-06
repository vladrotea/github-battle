var React = require('react')
var PropTypes = require('prop-types')

function PlayerPreview(props) {
  return (
    <div>
      <div className='column'>
        <img
          className='avatar'
          src={props.avatar}
          alt={'Avatar for ' + props.username}
        />
        <h2 className='username'>@{props.username}</h2>
        <button
          className='reset'
          onClick={props.onReset.bind(null, props.id)}
        >
          Reset
        </button>
      </div>
    </div>
  )
}

PlayerPreview.propTypes = {
  'id': PropTypes.string.isRequired,
  'avatar': PropTypes.string.isRequired,
  'username': PropTypes.string.isRequired,
  'onReset': PropTypes.func.isRequired,
}

class PlayerInput extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    var value = event.target.value;
    this.setState(function() {
      return {
        username: value,
      }
    })
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.onSubmit(
      this.props.id,
      this.state.username,
    )
}

  render() {
    return (
      <form className='column' onSubmit={this.handleSubmit}>
        <label className='header' htmlFor='username'>{this.props.label}</label>
        <input
          id='username'
          placeholder='github username'
          type='text'
          autoComplete='off'
          value={this.state.username}
          onChange={this.handleChange}
        />
        <button
          className='button'
          type='submit'
          disabled={!this.state.username}
        >
          Submit
        </button>
      </form>
    )
  }
}

PlayerInput.propTypes = {
  'id': PropTypes.string.isRequired,
  'label': PropTypes.string.isRequired,
  'onSubmit': PropTypes.func.isRequired,
}

class Battle extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneImage: null,
      playerTwoImage: null,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(id, username) {
    this.setState(function() {
      var newState = {};
      newState[id + 'Name'] = username
      newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=200'

      return newState;
    })
  }

  render() {
    var playerOneName = this.state.playerOneName
    var playerTwoName = this.state.playerTwoName
    var playerOneImage = this.state.playerOneImage
    var playerTwoImage = this.state.playerTwoImage

    return (
      <div className='row'>
        {!playerOneName && <PlayerInput id='playerOne' label='Player One' onSubmit={this.handleSubmit}/>}
        {playerOneImage !== null &&
            <PlayerPreview
              avatar={playerOneImage}
              username={playerOneName}
              onReset={this.handleReset}
              id='playerOne'
            />
        }

        {!playerTwoName && <PlayerInput id='playerTwo' label='Player One' onSubmit={this.handleSubmit}/>}
        {playerTwoImage !== null &&
            <PlayerPreview
              avatar={playerTwoImage}
              username={playerTwoName}
              onReset={this.handleReset}
              id='playerTwo'
            />
        }
      </div>
    )
  }
}

module.exports = Battle
