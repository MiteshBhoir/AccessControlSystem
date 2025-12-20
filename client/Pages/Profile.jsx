import React, { useState } from "react"
import { User, Mail, Shield, Edit3, Save, X } from "lucide-react"

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [error, setError] = useState("")

  // Simulated fetched user (backend will send decrypted Aadhaar)
  const [user, setUser] = useState({
    name: "Mitesh Bhoir",
    email: "miteshbhoirofficial@gmail.com",
    aadhar: "121212121212",
    role: "User",
    createdAt: "12 Jan 2025",
  })

  const [formData, setFormData] = useState(user)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSave = () => {
    if (!formData.name || !formData.email) {
      setError("Name and Email cannot be empty")
      return
    }

    setUser(formData)
    setIsEditing(false)
    setError("")
  }

  const maskedAadhar = `XXXX-XXXX-${user.aadhar.slice(-4)}`

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6">

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-indigo-500 text-white flex items-center justify-center text-2xl font-semibold">
            {user.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.role}</p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 px-3 py-2 rounded">
            {error}
          </div>
        )}

        {/* Profile Fields */}
        <div className="space-y-4">

          {/* Name */}
          <div>
            <label className="text-sm text-gray-500 flex items-center gap-2">
              <User size={16} /> Name
            </label>
            {isEditing ? (
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 mt-1"
              />
            ) : (
              <p className="font-medium">{user.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-500 flex items-center gap-2">
              <Mail size={16} /> Email
            </label>
            {isEditing ? (
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 mt-1"
              />
            ) : (
              <p className="font-medium break-all">{user.email}</p>
            )}
          </div>

          {/* Aadhaar */}
          <div>
            <label className="text-sm text-gray-500 flex items-center gap-2">
              <Shield size={16} /> Aadhaar Number
            </label>
            <p className="font-medium">{maskedAadhar}</p>
            <p className="text-xs text-gray-400">
              Aadhaar is encrypted in database
            </p>
          </div>

          {/* Account Info */}
          <div className="pt-3 border-t text-sm text-gray-600">
            <p><strong>Account Created:</strong> {user.createdAt}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          {!isEditing ? (
            <button
              onClick={() => {
                setFormData(user)
                setIsEditing(true)
              }}
              className="flex-1 flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg"
            >
              <Edit3 size={16} /> Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg"
              >
                <Save size={16} /> Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false)
                  setFormData(user)
                  setError("")
                }}
                className="flex-1 flex items-center justify-center gap-2 bg-gray-300 hover:bg-gray-400 py-2 rounded-lg"
              >
                <X size={16} /> Cancel
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  )
}

export default Profile
