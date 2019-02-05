import React from 'react'
import PropTypes from 'prop-types'
import './Description.css'

export default class Description extends React.PureComponent {

    render() {
        const {firstName, description, address} = this.props.user;
        return (
            <ul className='position'>
                <li>Выбран пользователь <b>{firstName}</b></li>
                <li>Описание:<textarea className='area' value={description}/></li>
                <li>Адрес проживания: <b>{address.streetAddress}</b></li>
                <li>Город: <b>{address.city}</b></li>
                <li>Провинция/штат: <b>{address.state}</b></li>
                <li>Индекс: <b>{address.zip}</b></li>
            </ul>
        );
    }
}

Description.propTypes = {
    user: PropTypes.object.isRequired
};