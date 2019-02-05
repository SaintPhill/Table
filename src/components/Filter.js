import React from 'react'
import PropTypes from 'prop-types'

export default class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchString: ''
        }
    }

    handleSearchInputChanges = () => {
        this.setState({
            searchString: this.searchInput.value
        })
    };

    render() {
        return (
            <form onSubmit={this.props.onSubmit}>
                <input
                    name='searchInput'
                    type="text"
                    ref={el => this.searchInput = el}
                    value={this.state.searchString}
                    onChange={this.handleSearchInputChanges}
                    placeholder="Search for names.."/>
                <button>Найти</button>
            </form>
        );
    }
}

Filter.propTypes = {
    onSubmit: PropTypes.func.isRequired
};