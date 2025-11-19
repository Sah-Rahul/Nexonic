import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  User,
  Phone,
  MapPin,
  Shield,
  Edit,
  Camera,
  Save,
  X,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

import { getMe, updateProfile, changePassword } from "@/api/authApi";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    bio: "",
    location: "",
    joinedDate: "",
    profilePic: "",
    department: "Admin",
    lastLogin: "Just now",
  });

  const [editedProfile, setEditedProfile] = useState(profile);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { data } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });

  useEffect(() => {
    if (data?.data) {
      const user = data.data;

      const formatted = {
        name: user.fullName,
        email: user.email,
        phone: user.phone || "",
        role: user.role,
        bio: user.bio || "",
        location: user.location || "",
        joinedDate: user.createdAt,
        profilePic: user.profile,
        department: "Admin",
        lastLogin: "Just now",
      };

      setProfile(formatted);
      setEditedProfile(formatted);
    }
  }, [data]);

  const handleInputChange = (e: any) => {
    setEditedProfile({ ...editedProfile, [e.target.name]: e.target.value });
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setEditedProfile({
        ...editedProfile,
        profilePic: URL.createObjectURL(file),
      });
    }
  };

  const handleSave = async () => {
    setIsUpdating(true);

    toast.loading("Updating profile...");

    const formData = new FormData();
    formData.append("fullName", editedProfile.name);
    formData.append("phone", editedProfile.phone);
    formData.append("location", editedProfile.location);
    formData.append("bio", editedProfile.bio);

    const file = fileInputRef.current?.files?.[0];
    if (file) formData.append("avatar", file);

    const result = await updateProfile(formData);

    toast.dismiss();

    if (result.success) {
      setProfile(editedProfile);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } else {
      toast.error("Update failed!");
    }

    setIsUpdating(false);
  };

  const handlePasswordChange = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword) {
      return toast.error("Please fill all password fields");
    }

    toast.loading("Changing password...");

    try {
      const res = await changePassword(passwordData);
      toast.dismiss();
      toast.success(res.message);

      setPasswordData({ currentPassword: "", newPassword: "" });
      setShowCurrentPassword(false);
      setShowNewPassword(false);
    } catch (err: any) {
      toast.dismiss();
      toast.error(err.response?.data?.message || "Password change failed");
    }
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const formatDate = (dateString: any) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">Manage your details</p>
        </div>

        <div className="flex gap-3">
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleCancel}>
                <X className="w-4 h-4 mr-2" /> Cancel
              </Button>
              <Button onClick={handleSave} disabled={isUpdating}>
                {isUpdating ? (
                  "Saving..."
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" /> Save
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <Card>
            <CardContent className="pt-6 flex flex-col items-center">
              <div className="relative">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={editedProfile.profilePic} />
                  <AvatarFallback>
                    {editedProfile.name?.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>

                {isEditing && (
                  <>
                    <Button
                      size="icon"
                      onClick={handleImageClick}
                      className="absolute bottom-0 right-0 rounded-full"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>

                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </>
                )}
              </div>

              <h2 className="text-xl font-bold mt-4">{profile.name}</h2>
              <Badge className="bg-blue-500 mt-2">
                <Shield className="w-3 h-3 mr-1" /> {profile.role}
              </Badge>

              <div className="w-full mt-6 space-y-2 text-sm">
                <p className="flex justify-between">
                  <span className="text-muted-foreground">Joined:</span>
                  <span>{formatDate(profile.joinedDate)}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-muted-foreground">Last Login:</span>
                  <span>{profile.lastLogin}</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your details</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Full Name</Label>
                  {isEditing ? (
                    <Input
                      name="name"
                      value={editedProfile.name}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <div className="p-3 bg-muted rounded-lg flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      {profile.name}
                    </div>
                  )}
                </div>

                <div>
                  <Label>Email</Label>
                  <div className="p-3 bg-muted rounded-lg flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    {profile.email}
                  </div>
                </div>

                <div>
                  <Label>Phone</Label>
                  {isEditing ? (
                    <Input
                      name="phone"
                      value={editedProfile.phone}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <div className="p-3 bg-muted rounded-lg flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      {profile.phone || "Not added"}
                    </div>
                  )}
                </div>

                <div>
                  <Label>Location</Label>
                  {isEditing ? (
                    <Input
                      name="location"
                      value={editedProfile.location}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <div className="p-3 bg-muted rounded-lg flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      {profile.location || "Not added"}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Label>Bio</Label>
                {isEditing ? (
                  <Textarea
                    name="bio"
                    rows={4}
                    value={editedProfile.bio}
                    onChange={handleInputChange}
                  />
                ) : (
                  <div className="p-3 bg-muted rounded-lg">
                    {profile.bio || "No bio added"}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Secure your account</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="relative">
                <Label>Current Password</Label>
                <Input
                  type={showNewPassword ? "text" : "password"}
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      currentPassword: e.target.value,
                    })
                  }
                />
                <Button
                  type="button"
                  variant="ghost"
                  className="absolute right-2 top-8 p-1"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                ></Button>
              </div>

              <div className="relative">
                <Label>New Password</Label>
                <Input
                  type={showNewPassword ? "text" : "password"}
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                />
                <Button
                  type="button"
                  variant="ghost"
                  className="absolute right-2 top-4 cursor-pointer p-1"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff className="w-4 h-4 " />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Button>
              </div>

              <Button className="w-full mt-2" onClick={handlePasswordChange}>
                <Lock className="mr-2 w-4 h-4" /> Update Password
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
