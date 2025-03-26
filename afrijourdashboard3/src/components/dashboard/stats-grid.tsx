import { Book, Globe, FileText, Languages, Database, ListFilter, Users } from "lucide-react";
import { StatsCard } from "@/components/stats-card";

export function StatsGrid() {
  const stats = [
    { title: "Journals", value: "2,004", icon: Book, color: "bg-blue-500" },
    { title: "African Countries", value: "41", icon: Globe, color: "bg-green-500" },
    { title: "Abstracts", value: "11K", icon: FileText, color: "bg-purple-500" },
    { title: "Languages", value: "64", icon: Languages, color: "bg-orange-500" },
    { title: "Repositories", value: "103", icon: Database, color: "bg-pink-500" },
    { title: "Indexes", value: "100", icon: ListFilter, color: "bg-indigo-500" },
    { title: "Reviewers", value: "433", icon: Users, color: "bg-teal-500" },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatsCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}