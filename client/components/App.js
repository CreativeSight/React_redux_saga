import React from 'react';
import StatsPage from './StatsPage';
import { BrowserRouter, Route, Link } from 'react-router-dom';


class App extends React.Component {

    render () {
        return (
            <BrowserRouter>
                <div>
                    <Route path='/stats/' exact component={StatsPage} />
                </div>
            </BrowserRouter>
        )
    }
}


export default App;