import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
function UserSelector(props) {
    const {groupName, chatroom, setChatroom, email, socket, individual, setFriendEmail, friendEmail} = props;
    const [lastMessage, setLastMessage] = useState('No Last Message Available');
    useEffect( () => {
        fetch(`http://127.0.0.1:8000/lastMessage/${chatroom}`, {
                method:'GET',
            })
            .then(response => response.json())
            .then((data) => {
            //   console.log(data.allGroups," is the data.allUsers");
                // setAllGroups(data.allGroups);
                if(data.success) {
                    console.log(data.lastMessage," after success");
                    setLastMessage(data.lastMessage);  
                }
                              
            })
      },[])
    const navigate = useNavigate();
    // const {groupName, chatroom, setChatroom, email, socket} = props;
    const handleUserSelectorClick = (e) => {
        console.log('clicked',chatroom);
        setChatroom(chatroom);
        if (friendEmail) {
        setFriendEmail(friendEmail);
        }
        navigate(`/${chatroom}`);
    }
    return (
        <div className='User-Selector' onClick={(e) => handleUserSelectorClick(e)}> 
            <div className='User-Dp-Container'>
                <img src="https://www.allprodad.com/wp-content/uploads/2021/03/05-12-21-happy-people.jpg" />
            </div>
            <div className='User-Name-LastMessage-Container'>
                <div className='User-Name-Container'><div className='UserName'> {(individual ? groupName: chatroom) || 'Gaurav'}</div> <div className='Time'></div></div>
                <div className='User-LastMessage-Container'>{lastMessage} </div>
            </div>
        </div>
    );
}

export default UserSelector;