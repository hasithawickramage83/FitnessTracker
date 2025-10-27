import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { LogOut, Plus, Dumbbell } from "lucide-react";
import ActivityCard from "@/components/ActivityCard";
import AddActivityDialog from "@/components/AddActivityDialog";

export interface Activity {
  id: number;
  user: string;
  activity_type: string;
  status: "planned" | "in progress" | "completed";
  timestamp: string;
}

const Dashboard = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/auth");
      return;
    }
    fetchActivities();
  }, [navigate]);

  const fetchActivities = async () => {
    const token = localStorage.getItem("access_token");
    try {
         const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

      const response = await fetch(`${API_BASE_URL}/activities/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setActivities(data);
      } else if (response.status === 401) {
        toast({
          title: "Session expired",
          description: "Please log in again.",
          variant: "destructive",
        });
        navigate("/auth");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load activities.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    toast({
      title: "Logged out",
      description: "See you next time!",
    });
    navigate("/auth");
  };

  const handleDeleteActivity = async (id: number) => {
    const token = localStorage.getItem("access_token");
    try {
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(
                  `${API_BASE_URL}/activities/${id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setActivities(activities.filter((activity) => activity.id !== id));
        toast({
          title: "Activity deleted",
          description: "The activity has been removed.",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to delete activity.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateStatus = async (id: number, status: Activity["status"]) => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(
        `https://fitnesstracker-backend-latest-2.onrender.com/api/activities/${id}/`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      if (response.ok) {
        const updatedActivity = await response.json();
        setActivities(
          activities.map((activity) =>
            activity.id === id ? { ...activity, status: updatedActivity.status } : activity
          )
        );
        toast({
          title: "Status updated",
          description: `Activity marked as ${status}.`,
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to update status.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  const handleActivityAdded = () => {
    fetchActivities();
    setShowAddDialog(false);
  };

  const stats = {
    planned: activities.filter((a) => a.status === "planned").length,
    inProgress: activities.filter((a) => a.status === "in progress").length,
    completed: activities.filter((a) => a.status === "completed").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
              <Dumbbell className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                FitTrack
              </h1>
              <p className="text-sm text-muted-foreground">Welcome, {username}!</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardDescription>Planned</CardDescription>
              <CardTitle className="text-4xl text-muted-foreground">{stats.planned}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="border-2 hover:shadow-lg transition-shadow border-primary/20">
            <CardHeader>
              <CardDescription>In Progress</CardDescription>
              <CardTitle className="text-4xl text-primary">{stats.inProgress}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="border-2 hover:shadow-lg transition-shadow border-accent/20">
            <CardHeader>
              <CardDescription>Completed</CardDescription>
              <CardTitle className="text-4xl text-accent">{stats.completed}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">My Activities</h2>
          <Button
            onClick={() => setShowAddDialog(true)}
            className="gap-2 bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity shadow-lg"
          >
            <Plus className="w-4 h-4" />
            Add Activity
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading activities...</div>
        ) : activities.length === 0 ? (
          <Card className="border-dashed border-2">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Dumbbell className="w-16 h-16 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground text-lg mb-4">No activities yet</p>
              <Button
                onClick={() => setShowAddDialog(true)}
                variant="outline"
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Your First Activity
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {activities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                onDelete={handleDeleteActivity}
                onUpdateStatus={handleUpdateStatus}
              />
            ))}
          </div>
        )}
      </main>

      <AddActivityDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onSuccess={handleActivityAdded}
      />
    </div>
  );
};

export default Dashboard;
