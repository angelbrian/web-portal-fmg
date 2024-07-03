// withApproval.js
import React, { useEffect, useState } from 'react';
import { firestore, auth } from './firebase';
import { doc, getDoc } from "firebase/firestore";
import { Redirect } from 'react-router-dom';

const withApproval = (Component) => {
  return (props) => {
    const [approved, setApproved] = useState(null);

    useEffect(() => {
      const checkApproval = async () => {
        const user = auth.currentUser;
        if (user) {
          const docRef = doc(firestore, 'pendingUsers', user.uid);
          const docSnap = await getDoc(docRef);
          setApproved(docSnap.data()?.approved);
        } else {
          setApproved(false);
        }
      };

      checkApproval();
    }, []);

    if (approved === null) return <div>Loading...</div>;
    return approved ? <Component {...props} /> : <Redirect to="/not-approved" />;
  };
};

export default withApproval;
