import React from 'react';

export default function Campus (props) {

    const campus = props. campus;

    return (
      <li className="media">
        <div>
            <img src={campus.image} alt="image" />
        </div>

          <h4>{ campus.name }</h4>

      </li>
    );
  }
