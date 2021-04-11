import React, {useState} from 'react';
import {
    Modal,
    ModalBody,
    ModalHeader,
    Label,
    Button,
    DropdownToggle,
    DropdownItem,
    UncontrolledDropdown,
    DropdownMenu
} from 'reactstrap';
import { MODAL_ALERT, PASSWORD, FIRST_NAME, 
         ENTER_FIRST_NAME, LAST_NAME, ENTER_LAST_NAME, ENTER_USER_NAME, 
         USER_NAME, UserName, ENTER_PASSWORD, Password, USER ,ADMIN, ROLE, ADD_USER 
} from '../../constants';
import InputForm from '../InputForm';
import {handleValidation} from '../../genericFunctions/validation';
import './index.scss';

const AddUserModal = ({addUserCall}) => {

    const [toggleModal, setToggleModal] = useState(false);
    const [password, setPassword] = useState();
    const [name, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [role, setRole] = useState();
    const [userName, setUserName] = useState();
    const [errors, setErrors] = useState({});

    const addUserFunc = () => { 

        if (name && userName && lastName && password && role) {
            const data = {
                name,
                userName,
                lastName,
                password,
                role
            }
            addUserCall(data); // Sending data to a database
            setToggleModal(!toggleModal);
        } else {
            alert(MODAL_ALERT);
        }
    }

    const handleChange = e => { // Updates password and username state and does validation
        e.target.name === PASSWORD ? setPassword(e.target.value) : setUserName(e.target.value);
        const fields = {password, userName};
        const errors = handleValidation(fields);// validation
        setErrors(errors);
    }

    const setName = e => { // Updates first and last name state
        e.target.name === FIRST_NAME ? setFirstName(e.target.value) : setLastName(e.target.value);
    }

    return (
        <React.Fragment>
            <button type="button" className="btn btn-primary" onClick={() => setToggleModal(true)}>{ADD_USER}</button>
            <Modal isOpen={toggleModal} toggle={() => setToggleModal(!toggleModal)}>
                <ModalHeader toggle={() => setToggleModal(!toggleModal)}>{ADD_USER}</ModalHeader>
                <ModalBody>
                    <InputForm name={FIRST_NAME} type="text" placeholder={ENTER_FIRST_NAME} handleChange={setName}/>
                    <InputForm name={LAST_NAME} type="text" placeholder={ENTER_LAST_NAME} handleChange={setName}/>
                    <Label>{ROLE}</Label>
                    <UncontrolledDropdown>
                        <DropdownToggle className="btn-block btn-light" caret>{role}</DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={e => setRole(e.currentTarget.textContent)}>{ADMIN}</DropdownItem>
                            <DropdownItem onClick={e => setRole(e.currentTarget.textContent)}>{USER}</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    <InputForm name={USER_NAME} type="email" placeholder={ENTER_USER_NAME} handleChange={handleChange}/>
                    <div className="error">{errors[UserName]}</div>
                    <InputForm name={PASSWORD} type={"password"} placeholder={ENTER_PASSWORD} handleChange={handleChange}/>
                    <span className="error">{errors[Password]}</span>
                    <Button type="submit" className="bgcolor1 mt-3 col-3 ml-auto"
                            onClick={() => addUserFunc()} block>Send</Button>
                </ModalBody>
            </Modal>
        </React.Fragment>
    )
}

export default AddUserModal