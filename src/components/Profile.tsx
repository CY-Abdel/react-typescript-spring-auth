import React from 'react'
import { getCurrentUser } from '../services/auth.service';



const Profile: React.FC = () => {

  const currentUser = getCurrentUser();

  return (

    <div className='container mt-5'>
      <div className="p-5 mb-4 bg-body-tertiary rounded-3">
        <div className="container py-5">
          <header>
            <h3>
              <strong>{currentUser.username}</strong> Profile
            </h3>
          </header>

          <p>
            <strong>Token:</strong> {currentUser.accessToken.substring(0, 14)} ...{" "}
            {currentUser.accessToken.substring(currentUser.accessToken.length - 14)}
          </p>

          <p>
            <strong>Id:</strong> {currentUser.id}
          </p>

          <p>
            <strong>Email:</strong> {currentUser.email}
          </p>

          <strong>Roles:</strong>
          <ul>
            {currentUser.roles && 
            currentUser.roles.map(
              (role: string, index: number) =>
              <li key={index}>{role}</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Profile