
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockUsers, useUser } from '@/contexts/UserContext';
import { UserPlus, Edit, Trash2, ShieldCheck } from 'lucide-react';

type UserWithPassword = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'manager' | 'user';
  avatar?: string;
};

const UserManagement = () => {
  const { user: currentUser } = useUser();
  const { toast } = useToast();
  const [users, setUsers] = useState<UserWithPassword[]>(mockUsers);
  const [selectedUser, setSelectedUser] = useState<UserWithPassword | null>(null);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const roleColors = {
    admin: 'bg-red-100 text-red-800 border-red-200',
    manager: 'bg-blue-100 text-blue-800 border-blue-200',
    user: 'bg-green-100 text-green-800 border-green-200',
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    // Generate a simple ID
    const newUser = {
      ...selectedUser,
      id: (users.length + 1).toString(),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedUser.name}`,
    };

    // Add new user
    setUsers([...users, newUser]);
    setSelectedUser(null);
    setIsAddingUser(false);
    setIsDialogOpen(false);

    toast({
      title: "Success",
      description: "User added successfully",
    });
  };

  const handleUpdateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    // Update existing user
    setUsers(users.map(u => u.id === selectedUser.id ? selectedUser : u));
    setSelectedUser(null);
    setIsDialogOpen(false);

    toast({
      title: "Success",
      description: "User updated successfully",
    });
  };

  const handleDeleteUser = (userId: string) => {
    // Prevent deleting the current user
    if (userId === currentUser?.id) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "You cannot delete your own account",
      });
      return;
    }

    setUsers(users.filter(u => u.id !== userId));
    toast({
      title: "Success",
      description: "User deleted successfully",
    });
  };

  const openAddUserDialog = () => {
    setSelectedUser({
      id: '',
      name: '',
      email: '',
      password: '',
      role: 'user',
    });
    setIsAddingUser(true);
    setIsDialogOpen(true);
  };

  const openEditUserDialog = (user: UserWithPassword) => {
    setSelectedUser({ ...user });
    setIsAddingUser(false);
    setIsDialogOpen(true);
  };

  return (
    <Layout title="User Management" subtitle="Manage system users and access">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Users</h2>
            <p className="text-muted-foreground">
              Manage user accounts and access permissions
            </p>
          </div>
          <Button onClick={openAddUserDialog}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map(user => (
            <Card key={user.id} className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="h-12 w-12 rounded-full" 
                      />
                      {user.id === currentUser?.id && (
                        <div className="absolute -top-1 -right-1 bg-primary text-white p-1 rounded-full">
                          <ShieldCheck className="h-3 w-3" />
                        </div>
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{user.name}</CardTitle>
                      <CardDescription>{user.email}</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${roleColors[user.role]}`}>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => openEditUserDialog(user)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDeleteUser(user.id)}
                      disabled={user.id === currentUser?.id}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {isAddingUser ? 'Add New User' : 'Edit User'}
              </DialogTitle>
              <DialogDescription>
                {isAddingUser 
                  ? 'Create a new user account with appropriate permissions.' 
                  : 'Update user details and permissions.'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={isAddingUser ? handleAddUser : handleUpdateUser}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={selectedUser?.name || ''}
                    onChange={(e) => setSelectedUser(prev => prev ? {...prev, name: e.target.value} : null)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={selectedUser?.email || ''}
                    onChange={(e) => setSelectedUser(prev => prev ? {...prev, email: e.target.value} : null)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">
                    {isAddingUser ? 'Password' : 'New Password (leave blank to keep current)'}
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={selectedUser?.password || ''}
                    onChange={(e) => setSelectedUser(prev => prev ? {...prev, password: e.target.value} : null)}
                    required={isAddingUser}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role">Role</Label>
                  <Select 
                    value={selectedUser?.role} 
                    onValueChange={(value: 'admin' | 'manager' | 'user') => 
                      setSelectedUser(prev => prev ? {...prev, role: value} : null)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {isAddingUser ? 'Add User' : 'Update User'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default UserManagement;
