import React from 'react'
import './Table.css'
import {loadUsers} from "./Api";
import Description from "./Description";
import Filter from "./Filter";
import loading from "../Loading.svg";

export default class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: '',
            image: 'upper',
            pageIndex: 0,
            count: 50,
            data: null,
            columns: ["id", 'firstName', 'lastName', 'email', 'phone'],
            selectedUser: null,
            loaded: false
        }
    }

    componentWillMount() {
        loadUsers(this.props.data)
            .then(json => {
                this.setState({
                    data: json,
                    loaded: true
                })
            })
    };

    onFilterClick = e => {
        e.preventDefault();
        this.setState({
            filter: e.target.searchInput.value
        })
    };

    filterData = () => {
        let arr = this.state.data.slice();
        return arr.filter((element) => {
            let found = false;
            for (let key in element) {
                if (typeof element[key] === "string" && element[key].includes(this.state.filter)) {
                    found = true;
                    break;
                }
            }
            return found;
        });
    };

    sort = () => {
        let image = this.state.image === 'upper' ? 'down' : 'upper';
        let result = this.state.data.slice();
        if (this.state.image === 'upper') {
            result.sort((a, b) => b.id - a.id)
        } else result.sort((a, b) => a.id - b.id);

        this.setState({
            data: result,
            image: image
        })
    };

    showRow = (index) => {
        let arr = this.state.data.slice();
        let body = arr.splice(index, 1);
        let object = body[0];
        this.setState({
            selectedUser: object
        })
    };


    handleChangeValue = index => {
        this.setState({pageIndex: parseInt(index.target.innerHTML) - 1});
    };

    getLinks() {
        let length = Math.ceil(this.state.data.length / this.state.count);
        let links = [];

        for (let i = 1; i <= length; i++) {
            let active = (i === this.state.pageIndex) ? 'active' : '';
            links.push(<a href="!#" key={i} className={active} onClick={this.handleChangeValue}>{i}</a>);
        }

        return links;
    }

    render() {
        if (this.state.loaded) {
            let fullInformation = this.state.selectedUser ? <Description user={this.state.selectedUser}/> : null;
            const visibleData = this.filterData();
            let links = this.getLinks();
            const start = this.state.pageIndex * this.state.count;
            const end = start + this.state.count;
            const workersForRender = visibleData.slice(start, end).map((worker, index) => {
                const {id, firstName, lastName, email, phone} = worker;
                return (
                    <tr key={index} onClick={this.showRow.bind(null, index)}>
                        <td>{id}</td>
                        <td>{firstName}</td>
                        <td>{lastName}</td>
                        <td>{email}</td>
                        <td>{phone}</td>
                    </tr>
                )
            });
            const head = this.state.columns.map((column, i) => {
                return (
                    <td key={i}>{column} {i === 0 ? <div className={this.state.image}/> : null}</td>
                )
            });
            return (
                <div className="text-center">
                    <table className="myTable">
                        <thead>
                        <tr onClick={this.sort}>
                            {head}
                        </tr>
                        </thead>
                        <tbody>
                        {workersForRender}
                        </tbody>
                    </table>
                    {fullInformation}
                    <div className='links'>{links}</div>
                    <Filter onSubmit={this.onFilterClick}/>
                </div>)
        } else {
            return (
                <img alt={"Loading..."} className="loader" src={loading}/>
            )
        }
    }
}