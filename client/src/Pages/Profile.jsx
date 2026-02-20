import  { useEffect} from "react";
import { User, Mail, Shield } from "lucide-react";  
import { useAppContext } from "../context/AuthContext";
const Profile = () => {  
  const { fetchProfile, user} = useAppContext()
  // Fetch profile on load
  useEffect(() => { 
    fetchProfile();
  }, []);

  if (!user) {
    return;
  }

  const Aadhar = user?.aadhar
    ? user.aadhar
    : "Not available";

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center  px-4 py-12">
      <div className="w-full h-full max-w-lg bg-white rounded-2xl shadow-lg p-6">

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-indigo-500 text-white flex items-center justify-center text-2xl font-semibold">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
          </div>
        </div>

        {/* Profile Details */}
        <div className="space-y-4">

          {/* Name */}
          <div>
            <label className="text-sm text-gray-500 flex items-center gap-2">
              <User size={16} /> Name
            </label>
            <p className="font-medium">{user.name}</p>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-500 flex items-center gap-2">
              <Mail size={16} /> Email
            </label>
            <p className="font-medium break-all">{user.email}</p>
          </div>

          {/* Aadhar */}
          <div>
            <label className="text-sm text-gray-500 flex items-center gap-2">
              <Shield size={16} /> Aadhar Number
            </label>
            <p className="font-medium">{Aadhar}</p>
            <p className="text-xs text-gray-400">
              Aadhar is encrypted in database
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
