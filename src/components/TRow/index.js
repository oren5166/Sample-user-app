import React from 'react';

const TRow = ({value, id, updatedDeleteCheckList}) => (
    <tr>
        <th scope="row">
            <div className="custom-control custom-checkbox">
            <input onClick={()=> updatedDeleteCheckList(value.userName)} type="checkbox" 
                   className="custom-control-input" id={id}/>
            <label className="custom-control-label" htmlFor={id}>{value.userName}</label>
            </div>
        </th>
        <td>{value.name}</td>
        <td>{value.lastName}</td>
        <td>{value.role}</td>
    </tr>
);


export default TRow