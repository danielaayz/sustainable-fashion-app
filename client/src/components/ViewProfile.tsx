import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Clock, Recycle, Award } from 'lucide-react';

const UserProfile = () => {
    const navigate = useNavigate();
    const stats = [
      { icon: Clock, label: 'Average Item Age', value: '2.5 years' },
      { icon: Users, label: 'Items Shared', value: '15' },
      { icon: Recycle, label: 'Sustainability Score', value: '85/100' },
      { icon: Award, label: 'Eco Badges Earned', value: '12' }
    ];

    const handleNavigateToAccount = () => {
        navigate('/UserAccount');
      };

  return (
    <div className="min-h-screen bg-[#f5efe6] p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Your Profile</h1>
          <button 
            onClick={handleNavigateToAccount}
            className="px-4 py-2 bg-[#40513B] text-white rounded-lg hover:bg-[#4a5f45]"
          >
            Go to your Account
          </button>
        </div>

        <Card className="bg-white shadow-lg">
          <CardHeader onClick={handleNavigateToAccount}>
            <div className="flex items-center gap-4 cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors">
              <div className="w-16 h-16 bg-[#40513B] rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Welcome back</p>
                <CardTitle className="text-xl">user.username</CardTitle>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#40513B] rounded-lg">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <p className="text-xl font-semibold">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                'Added new sustainable denim jacket',
                'Shared 2 items with the community',
                'Earned "Conscious Consumer" badge',
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-[#f5efe6] rounded-lg">
                  <div className="w-2 h-2 bg-[#40513B] rounded-full" />
                  <p>{activity}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;