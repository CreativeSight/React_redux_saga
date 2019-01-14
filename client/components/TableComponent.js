import React from 'react';
import Table from './Table';
import './Styles.css';
import { getSortedData } from '../selectors/selectors'
import { connect } from 'react-redux';


class TableStats extends React.Component {
    
    displayStatsTable = () => {
        const data = this.props.sortedStats;
        return data.map(el => <Table singleRow={el} key={el.id} />)
    }

    render () {
        const { noData, loading, error } = this.props.data;

        return (
            <div>
                <div>{(noData)
            ? <p>Please fetch data</p>
            : loading 
            ? <p>Loading data</p>
            : error
                ? <p>Error, please try again</p>
                : <table>
                    <tr>
                        <th>Id</th>
                        <th>Letter</th>
                        <th>Stats</th>
                    </tr>
                    {this.displayStatsTable()}
                  </table>}
                </div>
            </div>
        )
    };
};

    const mapStateToProps = state => {
        return {
            data: state.data,
            sortedStats: getSortedData(state.data.stats)
        }
    }

export default connect(mapStateToProps)(TableStats);

