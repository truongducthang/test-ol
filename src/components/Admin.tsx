import { useAuth } from 'hooks/useAuth';
import React from 'react';
export interface AdminLayoutProps {}
export function AdminLayout(props: AdminLayoutProps) {
  const { currentUser } = useAuth();
  console.log({ currentUser });
  return (
    <div>
      Admin layouts
      <div style={{ margin: '10rem' }}>
        {currentUser && (
          <div style={{ background: 'red' }}>2{currentUser?.name}</div>
        )}
      </div>
    </div>
  );
}
