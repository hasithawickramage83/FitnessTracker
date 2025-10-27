import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Activity as ActivityIcon, MoreVertical, Trash2, CheckCircle, Clock, Circle } from "lucide-react";
import { Activity } from "@/pages/Dashboard";
import { Badge } from "@/components/ui/badge";

interface ActivityCardProps {
  activity: Activity;
  onDelete: (id: number) => void;
  onUpdateStatus: (id: number, status: Activity["status"]) => void;
}

const ActivityCard = ({ activity, onDelete, onUpdateStatus }: ActivityCardProps) => {
  const getStatusColor = (status: Activity["status"]) => {
    switch (status) {
      case "completed":
        return "bg-accent text-accent-foreground";
      case "in progress":
        return "bg-primary text-primary-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getStatusIcon = (status: Activity["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "in progress":
        return <Clock className="w-4 h-4" />;
      default:
        return <Circle className="w-4 h-4" />;
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-2 group">
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary-glow/20 flex items-center justify-center">
            <ActivityIcon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{activity.activity_type}</h3>
            <p className="text-xs text-muted-foreground">{formatDate(activity.timestamp)}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => onUpdateStatus(activity.id, "planned")}
              disabled={activity.status === "planned"}
            >
              <Circle className="w-4 h-4 mr-2" />
              Mark as Planned
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onUpdateStatus(activity.id, "in progress")}
              disabled={activity.status === "in progress"}
            >
              <Clock className="w-4 h-4 mr-2" />
              Mark as In Progress
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onUpdateStatus(activity.id, "completed")}
              disabled={activity.status === "completed"}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Mark as Completed
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(activity.id)}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Activity
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <Badge className={`${getStatusColor(activity.status)} gap-1 capitalize`}>
          {getStatusIcon(activity.status)}
          {activity.status}
        </Badge>
      </CardContent>
    </Card>
  );
};

export default ActivityCard;
