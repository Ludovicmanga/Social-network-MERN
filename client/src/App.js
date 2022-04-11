import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from './actions/user.actions';
import { UidContext } from './components/AppContext';
import Routes from './components/Routes';

export default function App() {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        "url": `${process.env.REACT_APP_API_URL}/jwtid`,
        withCredentials: true
      })
        .then(res => 
          {
            if (res.data.error) {
              console.log(res.data.error);
            } else {
              setUid(res.data);
            }
          })
        .catch(error => console.log("no token"))
      ;
    }
    fetchToken();
    if(uid)
      dispatch(getUser(uid))
  }, [uid]);

  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  )
}
