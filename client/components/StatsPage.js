import React from 'react';
import SelectOptions from './SelectOptions';
import TableComponent from './TableComponent';

class StatsPage extends React.Component {
    render () {
        return (
            <div>
                <SelectOptions />
                <TableComponent />
            </div>
        )
    }
}


export default StatsPage;