import { motion } from "framer-motion";
import { Users, FileText, AlertTriangle, CheckCircle, TrendingUp, ArrowUpRight } from "lucide-react";
import { useState } from "react";

const overviewStats = [
  { label: "Total Users", value: 1247, icon: Users, change: "+12%", color: "text-primary" },
  { label: "Total Complaints", value: 342, icon: FileText, change: "+8%", color: "text-info" },
  { label: "Pending Review", value: 28, icon: AlertTriangle, change: "-3%", color: "text-warning" },
  { label: "Resolved", value: 289, icon: CheckCircle, change: "+15%", color: "text-success" },
];

const allComplaints = [
  { id: "CS-2026-001", user: "Priya S.", title: "Instagram harassment", status: "Pending", priority: "High", date: "2026-02-18" },
  { id: "CS-2026-002", user: "Anita R.", title: "Phishing email scam", status: "Active", priority: "Medium", date: "2026-02-15" },
  { id: "CS-2026-003", user: "Meera K.", title: "Identity theft on Facebook", status: "Resolved", priority: "High", date: "2026-02-10" },
  { id: "CS-2026-004", user: "Divya P.", title: "UPI fraud", status: "Escalated", priority: "Critical", date: "2026-02-08" },
  { id: "CS-2026-005", user: "Kavya M.", title: "Cyberstalking on Telegram", status: "Active", priority: "High", date: "2026-02-05" },
  { id: "CS-2026-006", user: "Riya J.", title: "Sextortion threat", status: "Escalated", priority: "Critical", date: "2026-01-28" },
];

const statusColors: Record<string, string> = {
  Pending: "bg-warning/10 text-warning",
  Active: "bg-info/10 text-info",
  Resolved: "bg-success/10 text-success",
  Escalated: "bg-destructive/10 text-destructive",
};

const priorityColors: Record<string, string> = {
  Low: "text-muted-foreground",
  Medium: "text-warning",
  High: "text-accent",
  Critical: "text-destructive font-semibold",
};

// Simple bar chart
const chartData = [
  { month: "Sep", value: 32 },
  { month: "Oct", value: 45 },
  { month: "Nov", value: 38 },
  { month: "Dec", value: 52 },
  { month: "Jan", value: 48 },
  { month: "Feb", value: 62 },
];
const maxVal = Math.max(...chartData.map((d) => d.value));

const AdminPage = () => {
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = statusFilter === "All" ? allComplaints : allComplaints.filter((c) => c.status === statusFilter);

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Overview of all platform activity</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {overviewStats.map((s) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <s.icon className={`h-5 w-5 ${s.color}`} />
                <span className="text-xs text-success flex items-center gap-0.5">
                  <ArrowUpRight className="h-3 w-3" /> {s.change}
                </span>
              </div>
              <div className="text-2xl font-bold">{s.value.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Chart */}
          <div className="lg:col-span-2 glass-card rounded-xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="h-4 w-4 text-primary" />
              <h2 className="font-semibold">Complaints Over Time</h2>
            </div>
            <div className="flex items-end gap-3 h-40">
              {chartData.map((d) => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-xs font-medium text-muted-foreground">{d.value}</span>
                  <div
                    className="w-full gradient-primary rounded-t-md transition-all"
                    style={{ height: `${(d.value / maxVal) * 100}%` }}
                  />
                  <span className="text-xs text-muted-foreground">{d.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Category breakdown */}
          <div className="glass-card rounded-xl p-6">
            <h2 className="font-semibold mb-4">By Category</h2>
            <div className="space-y-3">
              {[
                { label: "Harassment", pct: 35 },
                { label: "Phishing", pct: 25 },
                { label: "Fraud", pct: 20 },
                { label: "Stalking", pct: 12 },
                { label: "Other", pct: 8 },
              ].map((c) => (
                <div key={c.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{c.label}</span>
                    <span className="text-muted-foreground">{c.pct}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full gradient-primary rounded-full" style={{ width: `${c.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Complaint Table */}
        <div className="glass-card rounded-xl overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="font-semibold">All Complaints</h2>
            <div className="flex gap-1">
              {["All", "Pending", "Active", "Escalated", "Resolved"].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`text-xs px-3 py-1 rounded-full transition-colors ${statusFilter === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">ID</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">User</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Title</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">Date</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Priority</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{c.id}</td>
                    <td className="px-4 py-3">{c.user}</td>
                    <td className="px-4 py-3 font-medium">{c.title}</td>
                    <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{c.date}</td>
                    <td className={`px-4 py-3 text-xs ${priorityColors[c.priority]}`}>{c.priority}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[c.status]}`}>
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
