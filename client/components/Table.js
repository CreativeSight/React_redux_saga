import React from 'react';
import './Styles.css';

const Table = ({singleRow: {id, word, stats}}) => (
        <tr>
            <td>{id}</td>
            <td>{word}</td>
            <td>{stats}</td>
        </tr>
    )

export default Table;