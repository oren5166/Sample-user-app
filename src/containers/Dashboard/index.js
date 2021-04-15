//**** DASHBOARD ****//

import React, {useContext, useState, useEffect} from 'react';
import Context from '../../context/Context';
import {useHistory} from "react-router-dom";
import NavBar from '../../components/NavBar';
import Table from '../../components/Table'
import TRow from '../../components/TRow';
import {DELETE, NAME,RESET,FETCH_DATA} from '../../constants'
import {fetchData, addUser, deleteUser} from '../../axios/apiCalls'
import './index.scss';


const Dashboard = ({location}) => {

    const [queryParamsPage, setQueryParamsPage] = useState(0);
    const [queryParamsLimit] = useState(20);
    const [queryParamsName, setQueryParamsName] = useState({name: '', searchBy: NAME, order: 1});
    const [arrayUsresToDelete, setArrayUsresToDelete] = useState([])
    const history = useHistory();

    let {state, dispatch} = useContext(Context);
    const clearDataDispatch = () => dispatch({type: RESET});
    const fetchDataDispatch = data => dispatch({type: FETCH_DATA, payload: data});
    const deleteUserDispatch = data => dispatch({type: DELETE, payload: data});

    useEffect(() => {
        getData();
        // eslint-disable-next-line
    }, [queryParamsPage, queryParamsName, queryParamsLimit])
    
    const getData = async ()=>{
        fetchData(queryParamsPage, queryParamsLimit, queryParamsName,function(response){
            fetchDataDispatch(response) // Updating the rducer state with the new data that arrived
        });


    }
  

    const addUserCall = async (data) => { // Sending new user to db
        addUser(data, function(response){
            clearDataDispatch()
            getData();
        })
    }

    const deleteUserCall = () => { // Sending new user to db
        deleteUser(arrayUsresToDelete,function() {
            deleteUserDispatch(arrayUsresToDelete); // Remove users from rducer state
            setArrayUsresToDelete([]); 
        })
       
    }

    const searchUser = (params) => { // Search user from db with new params
        clearDataDispatch();
        setQueryParamsPage(0);
        setQueryParamsName(params);
    }

    const updatedDeleteCheckList = (val)=>{
        let copyList = [...arrayUsresToDelete]
        const index = copyList.indexOf(val);
        index !== -1 ? copyList.splice(index,1) : copyList.push(val);
        setArrayUsresToDelete(copyList);        
    }

    const creatingElementsFromData = () => state.appData.map((value, index) => ( // Makes user rows according to the data
       <TRow key={index} value={value} id={"checkbox"+index} updatedDeleteCheckList={updatedDeleteCheckList}/>
    ));

    const handleScroll = e => { // Calculates the height of a scroll bar that imports new data if it reaches the end
        if (e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight+1) {
            setQueryParamsPage(queryParamsPage + queryParamsLimit);
        }
    };

    const signOut = () => { // Exits the app and deletes the token from the localStorage
        clearDataDispatch()
        localStorage.clear();
        history.push("/login")
    }

    const authorization = !!(location.state && // Checks the token of the app if it matches the token coming from the database
        localStorage.getItem('auth-data') === location.state.token);

    return (
        authorization ?
            <div>
                <NavBar
                    addUserCall={addUserCall}
                    deleteUserCall={deleteUserCall}
                    signOut={signOut}
                    searchUser={searchUser}
                    arrayUsresToDelete={arrayUsresToDelete}
                    isAdmin={location.state.isAdmin}/>
                <div className="wrapper-table" onScroll={handleScroll}>
                    <Table appData={state.appData} creatingElementsFromData={creatingElementsFromData}/>
                </div>
            </div>
            :
            <React.Fragment>{history.push("/")}</React.Fragment>
    );
}

export default Dashboard;