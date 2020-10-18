import React, { Component } from 'react'
import './FilterMenu.scss'

class FilterMenu extends Component {

    constructor(props) {
        super(props);

        this.ref = React.createRef();

        this.onClickMethod = this.props.onClick;

        this.state = {
            entries: this.props.entries,
            display: this.props.entries,
        }
    }

    componentWillReceiveProps(newProps){
        console.log("ComponenetWillReceiveProps", newProps, this.props.entries);
        if (newProps.entries !== this.props.entries) {
            this.setState({
                entries: newProps.entries,
                display: newProps.entries,
            })
        }
    }

    filterFunction(event) {
        // Get typed input
        const user_input = event.target.value;
        if (user_input === '') {
            return;
        }

        // Get entry list
        const { entries } = this.state;

        // Filter entry list based on what hsa been typed
        const display = entries.filter(item => {
            const method_name = item.method_name.toLowerCase();
            return method_name.includes(user_input.toLowerCase());
        })

        // Repopulate the list based on what was typed.
        this.setState({
            display: display
        })
    }

    render () {
        return (
            <div className="dropdown">
                <div id="myDropdown" className="dropdown-content">
                    <input type="text" placeholder="Search..." onKeyUp={this.filterFunction.bind(this)}></input>
                    <select ref={this.ref} >
                        {this.state.display.map((entry) => (
                            <option onClick={this.onClickMethod} key={entry.method_id} value={entry.method_id}>{entry.method_name}</option>
                        ))}
                    </select>
                </div>
            </div> 
        )
    }
}

export default FilterMenu;