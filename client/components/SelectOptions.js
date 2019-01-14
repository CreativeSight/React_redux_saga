import React from 'react';
import './Styles.css';
import Select from 'react-select';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchAll, fetchUsersStats, deleteUser, clearData } from '../actions';


class SelectOptions extends React.Component {
    
    state = {
        selectedOption: [],
        authors: []
    }
    
    //Fetch authors
    componentDidMount = () => {
        axios.get('http://developersgym.pl/rest/authors.php')
        .then((response) => {
            this.createOptions(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    //Create select options
    createOptions = authorsData => {

        //Build object in array
        let options = [];
        let userId = 0;
            for(let key in authorsData) {
                options = [...options, {value : key, label : authorsData[key], id: userId}]
                userId++;
            }

        //Add 'All' option
        options = [...options, {value: 'all', label: 'All', id: userId}];
        
        //Set and display options
        this.setState((state) => {
            return {
                ...state,
                authors: options
            }
        })
    }

    //Set selected options visible inside Multiselect - helper function
    setSelectedOption = (options) => {
        this.setState((state) => {
            return {
                ...state, 
                selectedOption: options
            } 
        })
    }

    //Select current selected option [Multiselect returns array of options]
    singleSelectItem = (selectedOptions) => {
        let lastSelected = this.state.selectedOption;
        let newSelection = selectedOptions;
        let currentSelectedOption = lastSelected
                 .filter(x => !newSelection.includes(x))
                 .concat(newSelection.filter(x => !lastSelected.includes(x)));

        return currentSelectedOption;
    }

    //Option choosen by user
    handleChange = (selectedOption) => {

        const allAuthors = [{value: 'all', label: 'All'}];

        //Get current single option    
        const currentOption = this.singleSelectItem(selectedOption);

        //check 'AllAuthors' is selected
        const selectAll = selectedOption.some(el => el.value === 'all')

        //Main function check what action must be dispatched after user select
        if(!selectedOption.length){
            this.setSelectedOption(selectedOption)
            this.props.clearData()
        } else if(selectAll){
            this.setSelectedOption(allAuthors);
            this.props.fetchAll(currentOption[0].id)
        } else if(selectedOption.length < this.state.selectedOption.length) {
            this.setSelectedOption(selectedOption)
            this.props.deleteUser(currentOption[0].id)
        } else {
            this.setSelectedOption(selectedOption)
            this.props.fetchUsersStats(currentOption[0].value, currentOption[0].id)
        }
    }

    render() {
        const { selectedOption } = this.state;

        return (
            <Select 
                className='mainSelect'
                value={selectedOption}
                onChange={this.handleChange}
                options={this.state.authors}
                isMulti
            />
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAll: (id) => {
            dispatch(fetchAll(id))
        },
        fetchUsersStats: (endpoint, id) => {
            dispatch(fetchUsersStats(endpoint, id))
        },
        deleteUser: (id) => {
            dispatch(deleteUser(id))
        },
        clearData: () => {
            dispatch(clearData())
        }
    }
}

export default connect(null, mapDispatchToProps)(SelectOptions);

