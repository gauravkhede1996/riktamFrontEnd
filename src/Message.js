import { textAlign } from '@mui/system';
import React from 'react';

function Message(props) {
    const {newMessage, classType, messageTime} = props;
    return (
        <div className='Message-Container'>
            <div className='Message'>
                {classType === 'Other-Message' && <div className='User-Dp-Container'>
                    <img src="https://assets.gqindia.com/photos/642691cf326f7c32f4579178/16:9/w_2560%2Cc_limit/MS-Dhoni.jpg" ></img>
                </div>}
                <div className='Message-User-Name-Container'>
                    { classType === 'Other-Message' && <div className='ChatHead-Name-Container'> MS DHONI <span> {messageTime? messageTime: '08:40 AM'}</span></div>}
                    { classType === 'Self-Message' && <div className={`ChatHead-Name-Container`} style={{ textAlign: 'right'}}> You <span> {messageTime? messageTime: '08:40 AM'}</span></div>}
                    <div className={`ChatMessage-Container ${classType}`}> { newMessage || 'Failed to load Message'} </div>
                </div>
            </div>
        </div>
    );
}

export default Message;