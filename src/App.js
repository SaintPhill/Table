import React, {Component} from 'react';
import Table from "./components/Table";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            littleData: 'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D',
            bigData: 'http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D',
            dataToLoad: null
        }
    }

    bigData = () => {
        this.setState({
            dataToLoad: this.state.bigData
        })
    };

    littleData = () => {
        this.setState({
            dataToLoad: this.state.littleData
        })
    };

    render() {
        if (this.state.dataToLoad) {
            return <Table data={this.state.dataToLoad}/>
        } else {
            return (
                <div>
                    <button onClick={this.bigData}>Загрузить большой объем данных</button>
                    <button onClick={this.littleData}>Загрузить маленький объем данных</button>
                </div>
            )
        }
    }
}

export default App;
