import { Button } from '@mui/material';
import React from 'react';
import {useNavigate} from 'react-router-dom';
function User(props) {
    const {groupName, chatroom, email, socket, individual, groupUsers, setGroupUsers} = props;
    const navigate = useNavigate();
    // const {groupName, chatroom, setChatroom, email, socket} = props;
    const getFormBody = (params) => {
        let formBody = [];
        for( let property in params) {
            let encodedKey = encodeURIComponent(property); // 'user name' => 'user%20name'
            let encodedValue = encodeURIComponent(params[property]); //gaurav 123 => 'gaurav%20123'
            formBody.push(encodedKey + '=' + encodedValue);
    
        }
        return formBody.join('&'); // username='gaurav'&email='g@gmail.com'
    }
   const handleAddButtonClick = (e, emailToRemove) => {
    e.preventDefault();
    const filteredUsers = groupUsers.filter(user => user.email !== emailToRemove);
    setGroupUsers(filteredUsers);
    fetch('http://127.0.0.1:8000/addUserToGroup', {
            method:'POST',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: getFormBody({ email:emailToRemove,chatroom:chatroom})
        })
        .then(response => response.json())
        .then((data) => {
            if(data.success) {
                console.log(data," data of add Users to groups");
            }
        })
   }
    return (
        <div className='User-Selector'> 
            <div className='User-Dp-Container'>
                <img src="https://www.allprodad.com/wp-content/uploads/2021/03/05-12-21-happy-people.jpg" />
            </div>
            <div className='User-Name-LastMessage-Container'>
                <div className='User-Name-Container'><div className='UserName'> {(individual ? groupName: chatroom) || 'Gaurav'}</div> <div className='Time'></div></div>
                <div className='User-LastMessage-Container'><Button variant="contained" onClick={(e) => handleAddButtonClick(e, email)}>Add User</Button>  </div>
            </div>
        </div>
    );
}

export default User;