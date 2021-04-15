//**** NAV-BAR COMPONENT ****//

import React, {useState, useEffect} from 'react';
import AddUserModal from '../../components/AddUserModal';
import {NAME, USER_NAME, FIRST_NAME, SING_OUT, UserName, SEARCH_USER, SEARCH_SORT} from '../../constants'
import {Input} from 'reactstrap'
import './index.scss';

const NavBar = ({searchUser, isAdmin, addUserCall, deleteUserCall, signOut, arrayUsresToDelete}) => {

    const [searchUserBy, setSearchUserBy] = useState(NAME);
    const [inputVal, setInputVal] = useState('');
    const [order, setOrder] = useState(1);
    const params = {name: inputVal.replace(/\\/g, "\\\\"), searchBy: searchUserBy, order};

    useEffect(() => {
        searchUser(params);
        // eslint-disable-next-line
    }, [searchUserBy, order, inputVal]);

    return (
        <div className="d-flex m-4">
            {isAdmin && <AddUserModal addUserCall={addUserCall}/>}
            <Input onChange={e => setInputVal(e.target.value)} value={inputVal}
                   className="mx-2 ml-auto col-2" type="text" placeholder={SEARCH_USER}/>
            <div className="col-4">{SEARCH_SORT}
                <label>
                    <input checked={searchUserBy === NAME} className="mx-1" type="radio"
                           onChange={() => setSearchUserBy(NAME)}/>
                    <span className="checkmark"/>
                    {FIRST_NAME}
                </label>
                <label>
                    <input checked={searchUserBy !== NAME} className="mx-1" type="radio"
                           onChange={() => setSearchUserBy(UserName)}/>
                    <span className="checkmark"/>
                    {USER_NAME}
                </label>
                <img onClick={() => setOrder(1)} className={`ml-2 descImg ${order === 1 && 'alert-info'}`} 
                     alt="" src='assets/arrow.png'/>
                <img onClick={() => setOrder(-1)} className={`ml-2 ascImg ${order === -1 && 'alert-info'}`} 
                     alt="" src='assets/arrow.png'/>
            </div>
            {isAdmin &&  
            <img className={`trashImg ${arrayUsresToDelete.length > 0 ? 'enable':'disable'}`} 
                 onClick={deleteUserCall} alt="" src='assets/trash.png'/>
            }
            <button className="btn btn-secondary col-1 ml-auto" onClick={signOut}>{SING_OUT}</button>
        </div>
    )

}

export default NavBar