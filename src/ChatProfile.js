import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import Button from 'react-bootstrap/Button';
import Message from './Message';
import { TextField } from '@mui/material';
import UserSelector from './UserSelector';
import User from './User';
// import { Socket } from 'socket.io-client';

function ChatProfile(props) {
    const {email, socket, chatroom, friendEmail, allUsers} = props;
    console.log(chatroom," is the chatroom in chatProfile");
    const [newMessage,setNewMessage] = useState('');
    const [messageRecieved, setMessageRecieved] = useState(null);
    const [allOldMessage, setAllOldMessage] = useState([{message:'', messageType:''}]);
    const [kebabActive,setKebabActive] = useState(false);
    const [searchActive, setSearchActive] = useState(false);
    const [groupUsers, setGroupUsers] = useState([]); 
    
    useEffect ( () => {
         setGroupUsers([...allUsers]);
    },[chatroom, allUsers]);

    useEffect(()=> {
        socket.on('load_old_messages',async function(docs){
            setAllOldMessage([]);
            for(var i=0;i<docs.length;i++){
                let messageForNow = docs[i].message;
                let messageForNowTime = docs[i].createdAt;
                const mongoTimestamp = new Date(messageForNowTime);
                const time = mongoTimestamp.toTimeString().split(' ')[0];
                console.log(messageForNow, " is the message and ",time," is the time");
                console.log(docs[i].user.email, " is the email and ", email, " is the current email");
                let messageType= 'Other-Message';
                if( docs[i].user.email === email ) {
                    messageType = 'Self-Message';
                }
                docs[i].messageType = messageType;
                if(docs[i] && docs[i].message) {
                console.log(docs[i].message);
                if (!allOldMessage.includes(docs[i].message)) {
                    setAllOldMessage((prevMessages) => [...prevMessages, {message:messageForNow, messageType:messageType, time}]);
                }
                }
            }
        },[])
        socket.on('recieve_message',(data) => {
            let recievedMessageclass = 'Self-Message';
            if( data.email !== email) {
                recievedMessageclass = 'Other-Message';
            }
            const messageRecieved = <Message newMessage={data.newMessage} classType={recievedMessageclass}/>
            setNewMessage(data.newMessage);
            setMessageRecieved(messageRecieved);
            console.log(messageRecieved," is the recieved Message");
        })
        console.log(allOldMessage," is the all old messages");
    },[newMessage])
    const handleMessageChange = (e) => {
        e.preventDefault();
        setNewMessage(e.target.value);
    }
    const handleMessageSend = (chatroom)=> {
        let chatroomName = 'chat';
        if(chatroom && chatroom.length!==0) {
            chatroomName=chatroom;
        } 
        // console.log(friendEmail," is the friendEmail");
        if (friendEmail || friendEmail=== '') {
            socket.emit('send_message',{
                newMessage,
                email,
                chatRoom:chatroomName,
                friend_email:friendEmail,
            })
        } else {
            socket.emit('send_message',{
                newMessage,
                email,
                chatRoom:chatroomName
            })
        }
        

        
        console.log('Message Send Clicked');
    }
    const handleKebab= (e) => {
        setKebabActive(!kebabActive);
    }
    const handleGroupDelete = (e) => {
        fetch(`http://127.0.0.1:8000/deleteGroup/${chatroom}`, {
            method:'DELETE',
        })
        .then(response => response.json())
        .then((data) => {
            console.log(data," is the fetched data of new create group");
        })
    }
    const handleChatHeaderNameClick = (e) => {
        e.preventDefault();
        setSearchActive(!searchActive);
    }
    return (
        <div className='ChatProfile-Container'>
            <div className='UserChat-Container'>
                <div className='UserChat-Header'>
                    <div className='User-Dp-Container'>
                        <img src="https://assets.gqindia.com/photos/642691cf326f7c32f4579178/16:9/w_2560%2Cc_limit/MS-Dhoni.jpg" ></img>
                    </div>
                    <div className='Chat-Header-Name-Container'>
                        <div className='Chat-Header-Name' onClick={(e) => handleChatHeaderNameClick(e)}> {chatroom? chatroom: 'MS DHONI'}</div>
                        <div className='Chat-Header-Info'>Online</div>
                    </div>
                    <div className='Chat-Icon-Container'>
                    <Icon icon="wpf:videocall" className='NavbarIcon ChatIcon' width="28" height="28"/>
                    <Icon icon="material-symbols:call-sharp" className='NavbarIcon ChatIcon' width="28" height="28"/>
                    <Icon icon="charm:menu-kebab" className='NavbarIcon ChatIcon' width="28" height="28" onClick={(e) => handleKebab(e)}/>
                    </div>
                    { kebabActive && ( <ul>
                        <li> <Icon icon="carbon:close-filled" width="26" height="22"/> </li>
                        <li> <Icon icon="mingcute:delete-fill" width="26" height="22" onClick={(e) => handleGroupDelete(e)}/> </li>
                    </ul>)}
                </div>
                <div className='Chats-Container'>
                    {/* <Message /> */}
                    { searchActive && (<> { groupUsers.map( (user) => <User groupName={user.name} chatroom={chatroom}  email={user.email} socket={socket} individual={true} setGroupUsers={setGroupUsers} groupUsers={groupUsers}/>)}</>)}
                    {allOldMessage.map((item) => {
                        return <Message newMessage={item.message} classType={item.messageType} messageTime={item.time}/>
                    })}
                    {messageRecieved ? messageRecieved: null}
                </div>
                <div className='Input-Container'>
                    <div className='InputBox'><input type="text" placeholder="What's Up" size="80" className='TextInput' onChange={(e) => handleMessageChange(e)}></input></div>
                    <div className='SubmitButton-Container'> <Button variant="primary" onClick={() => handleMessageSend(chatroom)}>Send</Button></div>
                </div>
            </div>
        </div>
    );
}

export default ChatProfile;