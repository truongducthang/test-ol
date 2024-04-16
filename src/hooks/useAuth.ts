import React from 'react';

export function useAuth() {
  const [currentUser, setCurrentUser] = React.useState<any>(
    JSON.parse(localStorage.getItem('currentUser') as any)
  );
  const changeCurrentUser = (user: any) => {
    setCurrentUser(localStorage.setItem('currentUser', JSON.stringify(user)));
  };

  return { currentUser, changeCurrentUser };
}
