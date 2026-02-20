import { motion } from "framer-motion";
import { FileText, Clock, CheckCircle, AlertCircle, Plus, Filter } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Total Cases", value: 12, icon: FileText, color: "text-primary" },
  { label: "Pending", value: 3, icon: Clock, color: "text-warning" },
  { label: "Active", value: 5, icon: AlertCircle, color: "text-info" },
  { label: "Resolved", value: 4, icon: CheckCircle, color: "text-success" },
];

type Status = "All" | "Pending" | "Active" | "Resolved";

const complaints = [
  { id: "CS-2026-001", title: "Harassment on Instagram", category: "Online Harassment", date: "2026-02-18", status: "Pending" as const },
  { id: "CS-2026-002", title: "Phishing email from bank", category: "Phishing / Scam", date: "2026-02-15", status: "Active" as const },
  { id: "CS-2026-003", title: "Identity theft on Facebook", category: "Identity Theft", date: "2026-02-10", status: "Resolved" as const },
  { id: "CS-2026-004", title: "Financial fraud via UPI", category: "Financial Fraud", date: "2026-02-08", status: "Active" as const },
  { id: "CS-2026-005", title: "Cyberstalking on Telegram", category: "Cyberstalking", date: "2026-02-05", status: "Pending" as const },
  { id: "CS-2026-006", title: "Sextortion threat via WhatsApp", category: "Sextortion", date: "2026-01-28", status: "Active" as const },
  { id: "CS-2026-007", title: "Scam call impersonating police", category: "Phishing / Scam", date: "2026-01-20", status: "Resolved" as const },
];

const statusColors: Record<string, string> = {
  Pending: "bg-warning/10 text-warning",
  Active: "bg-info/10 text-info",
  Resolved: "bg-success/10 text-success",
};

const DashboardPage = () => {
  const [filter, setFilter] = useState<Status>("All");
  const filtered = filter === "All" ? complaints : complaints.filter((c) => c.status === filter);

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">My Dashboard</h1>
          <Link to="/report">
            <Button className="gradient-primary border-0 gap-1">
              <Plus className="h-4 w-4" /> New Complaint
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card rounded-xl p-5 text-center"
            >
              <s.icon className={`h-6 w-6 mx-auto mb-2 ${s.color}`} />
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-4 w-4 text-muted-foreground" />
          {(["All", "Pending", "Active", "Resolved"] as Status[]).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`text-xs px-3 py-1.5 rounded-full transition-colors ${filter === s ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="glass-card rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">ID</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Title</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Category</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">Date</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{c.id}</td>
                    <td className="px-4 py-3 font-medium">{c.title}</td>
                    <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{c.category}</td>
                    <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{c.date}</td>
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

export default DashboardPage;
