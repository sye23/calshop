import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Sample from './screens/sample/Sample';
import PrivateRoute from './PrivateRoute';



class App extends React.Component<any, any> {

  render() {

    return (
      <div>
        <Router>
          <div>

            <Route exact path="/" component={Sample} />
            <Route path="/calendar" component={PrivateRoute(Sample, [''])} />
          
          </div>

        </Router>

      </div >
    );
  }
}


