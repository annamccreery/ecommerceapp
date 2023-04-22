import React from 'react';
import './App.css';

import { withAuthenticator, Authenticator } from '@aws-amplify/ui-react';

const Profile = () => {
  return (
    <div style={containerStyle}>
      <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user.username}</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
    </div>
  );
}

const containerStyle = {
  width: 400,
  margin: '20px auto'
}

export default withAuthenticator(Profile);