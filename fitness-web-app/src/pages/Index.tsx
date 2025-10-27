import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dumbbell, TrendingUp, Target, BarChart3 } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shadow-lg">
            <Dumbbell className="w-7 h-7 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            FitTrack
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-5xl md:text-6xl font-bold leading-tight">
              Track Your Fitness
              <br />
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Reach Your Goals
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Log your workouts, monitor progress, and achieve your fitness milestones with our intuitive tracking platform.
            </p>
          </div>

          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              onClick={() => navigate("/auth")}
              size="lg"
              className="text-lg px-8 bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity shadow-lg"
            >
              Get Started
            </Button>
            <Button
              onClick={() => navigate("/auth")}
              size="lg"
              variant="outline"
              className="text-lg px-8"
            >
              Log In
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 pt-12">
            <div className="p-6 rounded-xl bg-card border-2 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Set Goals</h3>
              <p className="text-muted-foreground">
                Plan your activities and stay committed to your fitness journey.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border-2 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Track Progress</h3>
              <p className="text-muted-foreground">
                Monitor your daily activities and see your improvements over time.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border-2 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Achieve More</h3>
              <p className="text-muted-foreground">
                Complete your goals and celebrate your fitness achievements.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
