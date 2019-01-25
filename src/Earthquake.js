import React from 'react';
import { format } from 'date-fns';

class Earthquake extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }
  render() {
    const quakeData = this.props.info.properties;
    return (
      <a href={quakeData.url}>
        <div className="earthquake">
          <h2 className="mag">{quakeData.mag}</h2>
          <h3>{quakeData.place}</h3>
          <h3>{format(quakeData.time, 'HH:mm A - MM/DD/YYYY')}</h3>
        </div>
      </a>
    );
  }
}

export default Earthquake;
