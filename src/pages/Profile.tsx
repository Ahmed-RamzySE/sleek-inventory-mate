
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useUser } from '@/contexts/UserContext';
import { User, Lock, Bell, Shield } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const Profile = () => {
  const { user } = useUser();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    avatar: user?.avatar || '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyDigest: true,
    inventoryAlerts: true,
    orderUpdates: true,
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
    }, 1000);
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords don't match",
        description: "New password and confirmation must match",
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      toast({
        title: "Password updated",
        description: "Your password has been updated successfully",
      });
    }, 1000);
  };

  const toggleNotification = (key: keyof typeof notificationSettings) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: !notificationSettings[key],
    });
  };

  return (
    <Layout title="Profile" subtitle="Manage your account">
      <div className="space-y-6">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full md:w-1/2 lg:w-1/3 grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your account details and public information
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleProfileUpdate}>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <img 
                        src={profileData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} 
                        alt={profileData.name} 
                        className="h-24 w-24 rounded-full" 
                      />
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0"
                      >
                        <User className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-medium">{profileData.name}</h3>
                      <p className="text-sm text-muted-foreground">{profileData.email}</p>
                      <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Saving Changes..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Update your password and security preferences
                </CardDescription>
              </CardHeader>
              <form onSubmit={handlePasswordUpdate}>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium flex items-center">
                      <Shield className="mr-2 h-4 w-4" />
                      Security Options
                    </h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Set up
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Active Sessions</Label>
                        <p className="text-sm text-muted-foreground">Manage your active sessions</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Updating Password..." : "Update Password"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Manage how and when you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium flex items-center">
                    <Bell className="mr-2 h-4 w-4" />
                    Notification Channels
                  </h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch 
                      id="email-notifications" 
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={() => toggleNotification('emailNotifications')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="push-notifications">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive push notifications</p>
                    </div>
                    <Switch 
                      id="push-notifications" 
                      checked={notificationSettings.pushNotifications}
                      onCheckedChange={() => toggleNotification('pushNotifications')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="weekly-digest">Weekly Digest</Label>
                      <p className="text-sm text-muted-foreground">Receive a weekly summary</p>
                    </div>
                    <Switch 
                      id="weekly-digest" 
                      checked={notificationSettings.weeklyDigest}
                      onCheckedChange={() => toggleNotification('weeklyDigest')}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Notification Types</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="inventory-alerts">Inventory Alerts</Label>
                      <p className="text-sm text-muted-foreground">Low stock and inventory updates</p>
                    </div>
                    <Switch 
                      id="inventory-alerts" 
                      checked={notificationSettings.inventoryAlerts}
                      onCheckedChange={() => toggleNotification('inventoryAlerts')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="order-updates">Order Updates</Label>
                      <p className="text-sm text-muted-foreground">New orders and order status changes</p>
                    </div>
                    <Switch 
                      id="order-updates" 
                      checked={notificationSettings.orderUpdates}
                      onCheckedChange={() => toggleNotification('orderUpdates')}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => {
                  toast({
                    title: "Preferences saved",
                    description: "Your notification preferences have been updated",
                  });
                }}>
                  Save Preferences
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Profile;
