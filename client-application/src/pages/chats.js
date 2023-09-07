// Chat component
import React, { useState, useEffect, useRef } from 'react';
import SendMessage from './sendMessege';

function Chat() {
  const [userId, setUserId] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      alert('User ID is missing. Please log in again.');
    }
  }, []);

  return (
    <div>
      {/* Other components */}
      {userId && <SendMessage scroll={scrollRef} userId={userId} />}
    </div>
  );
}

export default Chat;