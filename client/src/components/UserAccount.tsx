import React, { useState } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

interface UserData {
  username: string;
  email: string;
  password: string;
}

const AccountView = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    username: 'user.username',
    email: 'user@example.com',
    password: '********'
  });
  const [formData, setFormData] = useState<UserData>(userData);
  const [errors, setErrors] = useState<Partial<UserData>>({});

  const validateForm = () => {
    const newErrors: Partial<UserData> = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (isEditing && formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      setUserData(formData);
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    // Add actual delete account logic here
    console.log('Account deleted');
    setShowDeleteDialog(false);
  };

  return (
    <div className="min-h-screen bg-[#f5efe6] p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">Account Details</h2>
          
          <div className="space-y-4">
            {Object.entries(userData).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 capitalize">
                  {key}
                </label>
                {isEditing ? (
                  <div>
                    <input
                      type={key === 'password' ? 'password' : 'text'}
                      className="w-full p-2 border rounded-lg"
                      value={formData[key as keyof UserData]}
                      onChange={(e) => setFormData({
                        ...formData,
                        [key]: e.target.value
                      })}
                    />
                    {errors[key as keyof UserData] && (
                      <p className="text-red-500 text-sm mt-1">{errors[key as keyof UserData]}</p>
                    )}
                  </div>
                ) : (
                  <p className="p-2 bg-gray-50 rounded-lg">{value}</p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 flex gap-4">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-[#40513B] text-white rounded-lg hover:bg-[#4a5f45]"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setFormData(userData);
                    setErrors({});
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-[#40513B] text-white rounded-lg hover:bg-[#4a5f45]"
                >
                  Edit
                </button>
                <button
                  onClick={() => setShowDeleteDialog(true)}
                  className="px-4 py-2 bg-[#e60000] text-white rounded-lg hover:bg-[#ff1a1a]"
                >
                  Delete Account
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-[#ff4d4d] hover:bg-[#ff6666]"
            >
              Delete Account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AccountView;