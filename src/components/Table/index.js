import React from 'react';
import { USER_NAME, FIRST_NAME, LAST_NAME, ROLE } from '../../constants';

const Table = ({appData, creatingElementsFromData}) => (
    <table className='table table-hover table-bordered'>
        <thead>
        <tr>
            <th scope="col">{USER_NAME}</th>
            <th scope="col">{FIRST_NAME}</th>
            <th scope="col">{LAST_NAME}</th>
            <th scope="col">{ROLE}</th>
        </tr>
        </thead>
        <tbody>
        {appData && creatingElementsFromData()}
        </tbody>
    </table>
);


export default Table