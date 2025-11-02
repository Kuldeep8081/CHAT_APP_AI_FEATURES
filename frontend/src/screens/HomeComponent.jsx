import React from 'react'
import { useUser } from '../context/user.context'

const HomeComponent = () => {
  const { user } = useUser()

  return (
    <div className="p-6">
      {user ? (
        <h1 className="text-3xl font-bold">
          {JSON.stringify(user)}
        </h1>
      ) : (
        <h1 className="text-3xl font-bold">
          Welcome to the Home Page! Please log in or register.
        </h1>
      )}
    </div>
  )
}

export default HomeComponent