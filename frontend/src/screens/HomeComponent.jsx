import React, { useState } from 'react'
import { useUser } from '../context/user.context'
import axios from '../config/axios';
const HomeComponent = () => {
  const { user } = useUser()
  const [isModal, setisModal] = useState(false)
  const [projectName, setProjectName] = useState('')
  const createProject = (e) => {
    e.preventDefault()
    console.log({projectName});
    axios.post('/projects/create', { name: projectName })
      .then((res) => {
        console.log(res.data);
        setisModal(false)
        setProjectName('')
      })
      .catch((err) => {
        console.log(err);
      })
    
  }
  return (
    <main className="p-4!">
      <div className="projects">
        <button
          onClick={() => setisModal(true)}
          className="project p-4! border border-stone-300 rounded-md"
        >
          New Project
          <i className="ri-link ml-2!"></i>
        </button>
      </div>

      {isModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6! rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4!">Create New Project</h2>
            <form onSubmit={createProject}>
              <div className="mb-4!">
                <label className="block text-gray-700 text-sm font-bold mb-2!">
                  Project Name
                </label>
                <input
                  onChange={(e)=>setProjectName(e.target.value)}
                  value={projectName}
                  type="text"
                  className="w-full p-2! border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter project name"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setisModal(false)}
                  className="px-4! py-2! text-gray-600 hover:bg-gray-100 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4! py-2! bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}

export default HomeComponent