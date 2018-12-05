var React = require('react')
var PropTypes = require('prop-types')

function SelectLanguage(props) {
  var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

  return (
    <ul className='languages'>
      { languages.map( function(lang) {
        return (
          <li
            key={lang}
            onClick={props.onClick.bind(null, lang)}
            style={lang === props.selectedLanguage ? { color: '#d0021b'} : null }>
              {lang}
          </li>
        )
      }, this)}
    </ul>
  )
}

SelectLanguage.propTypes = {
  onClick: PropTypes.func.isRequired,
  selectedLanguage: PropTypes.string.isRequired,
}

class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'All'
    };

    this.updateLanguage = this.updateLanguage.bind(this);
  }

  updateLanguage(lang) {
    this.setState(function () {
      return {
        selectedLanguage: lang
      }
    });
  }

  render() {
    return (
      < SelectLanguage
        onClick={this.updateLanguage}
        selectedLanguage={this.state.selectedLanguage}
      />
    )
  }
}

module.exports = Popular;
