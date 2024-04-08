import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useAuth } from '../../hooks/index.jsx';
import { fetchChannels } from '../../slices/channelsSlice.js';
import { fetchMessages } from '../../slices/messagesSlise.js';
import Modal from '../Modal/Modal.jsx';
import ChannelsContaner from './components/ChannelsBox/ChannelsContainer.jsx';
import ChatContainer from './components/ChatBox/ChatContainer.jsx';

const MainPage = () => {
  const dispatch = useDispatch();
  const auth = useAuth();

  useEffect(() => {
    const headers = auth.getAuthHeaders();
    dispatch(fetchChannels(headers));
    dispatch(fetchMessages(headers));
  }, [dispatch, auth]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Modal />
        <ChannelsContaner />
        <ChatContainer />
      </div>
    </div>
  );
};

export default MainPage;
