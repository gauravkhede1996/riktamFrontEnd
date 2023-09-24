import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import React, { useState } from 'react';
import ChatProfile from './ChatProfile';

function CreateGroup(props) {
    const {email,socket, user, allUsers} = props;
    const [groupName, setGroupName] = useState('');
    const [createdChatroom, setCreatedChatroom] = useState(groupName);
    const [showGroup,setShowGroup] = useState(false);
    const handleGroupNameChange = (e) => {
        e.preventDefault();
        setGroupName(e.target.value);
    }
    const getFormBody = (params) => {
        let formBody = [];
        for( let property in params) {
            let encodedKey = encodeURIComponent(property); // 'user name' => 'user%20name'
            let encodedValue = encodeURIComponent(params[property]); //gaurav 123 => 'gaurav%20123'
            formBody.push(encodedKey + '=' + encodedValue);
    
        }
        return formBody.join('&'); // username='gaurav'&email='g@gmail.com'
    }
    const handleCreateGroupButton = (e) => {
        e.preventDefault();
        socket.emit('join_room', {
            email,
            chatRoom:groupName
          });
          fetch('http://127.0.0.1:8000/newCreateGroup', {
            method:'POST',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: getFormBody({allUsers:[] ,email:email,chatroom:groupName})
        })
        .then(response => response.json())
        .then((data) => {
            if(data.success) {
                setCreatedChatroom(data.newlyCreatedGroup.chatroom);
                setShowGroup(true);
            }
        })
    }
    return (
        showGroup? <ChatProfile email={email} socket={socket} chatroom={createdChatroom} allUsers={allUsers}/> :<div className='Create-Group-Container'>
           <div className='create-group-element'>Group Name :</div> <TextField id="outlined-basic" label="Group Name" variant="outlined" className='create-group-element' onChange={(e) => handleGroupNameChange(e)}/>
            <Button variant="contained" className='create-group-element' style={{marginTop: '2rem'}} onClick={(e) => handleCreateGroupButton(e)}>Create Group</Button>
        </div>
    );
}

export default CreateGroup;