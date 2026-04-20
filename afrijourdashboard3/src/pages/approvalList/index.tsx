// import { Layout } from "@/components/custom/layout";

// import { TopNav } from "@/components/top-nav";
// import { UserNav } from "@/components/user-nav";
// import { BASE_URL } from '../../config'

// const topNav = [
//   {
//     title: "Overview",
//     href: "dashboard/overview",
//     isActive: true,
//   },
// ];

// export default function index() {
//   return (
//     <Layout>
//       <Layout.Header>
//         <TopNav links={topNav} />
//         <div className="ml-auto flex items-center space-x-4">
//           <UserNav />
//         </div>
//       </Layout.Header>

//       <Layout.Body>
        
//         <h1>Hello</h1>
//       </Layout.Body>
//     </Layout>
//   );
// }






import { useEffect, useState, useCallback } from "react";
import { Layout } from "@/components/custom/layout";
import { TopNav } from "@/components/top-nav";
import { UserNav } from "@/components/user-nav";
import { BASE_URL } from "../../config";
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogFooter, DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

const topNav = [
  { title: "Overview", href: "dashboard/overview", isActive: true },
];

interface Journal {
  id: number;
  journal_title: string;
  publishers_name: string;
  issn_number: string;
  approved: boolean;
  country: { id: number; country: string } | null;
  language: { id: number; language: string } | null;
  thematic_area: { id: number; thematic_area: string } | null;
  platform: { id: number; platform: string } | null;
}

// interface AuthTokens {
//   access: string
//   refresh: string
// }


interface PaginatedResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Journal[];
}

export default function index() {
  const [journals, setJournals] = useState<Journal[]>([]);
  const [count, setCount] = useState(0);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [prevUrl, setPrevUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedJournal, setSelectedJournal] = useState<Journal | null>(null);
  const [approving, setApproving] = useState(false);
  const { toast } = useToast();



// ✅ new — matches how your auth stores the token
const getToken = (): string => {
  const tokens = localStorage.getItem("authTokens");
  return tokens ? JSON.parse(tokens)?.access : "";
};



  const fetchJournals = useCallback(async (url?: string) => {
    setLoading(true);
    try {
        
      const res = await fetch(url || `${BASE_URL}/journal_api/api/journals/unapproved/`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data: PaginatedResponse = await res.json();
      setJournals(data.results);
      setCount(data.count);
      setNextUrl(data.next);
      setPrevUrl(data.previous);
    } catch (e: any) {
      toast({
        title: "Error",
        description: "Failed to load journals: " + e.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => { fetchJournals(); }, [fetchJournals]);

//   const handleApprove = async () => {
//     if (!selectedJournal) return;
//     setApproving(true);
//     try {
//       const res = await fetch(`${BASE_URL}/journal_api/api/journals/${selectedJournal.id}/approve/`, {
//         method: "PATCH",
//         headers: { Authorization: `Bearer ${getToken()}` },
//       });
//       if (!res.ok) throw new Error(`Error ${res.status}`);
//       toast({
//         title: "Success",
//         description: `"${selectedJournal.journal_title}" approved successfully.`,
//       });
//       setSelectedJournal(null);
//       fetchJournals();
//     } catch (e: any) {
//       toast({
//         title: "Error",
//         description: "Approval failed: " + e.message,
//         variant: "destructive",
//       });
//     } finally {
//       setApproving(false);
//     }
//   };

const handleApprove = async () => {
    if (!selectedJournal) return;
    setApproving(true);
    try {
      const res = await fetch(`${BASE_URL}/journal_api/api/journals/${selectedJournal.id}/approve/`, {
        method: "PATCH",
        headers: { 
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      toast({
        title: "Success",
        description: `"${selectedJournal.journal_title}" approved successfully.`,
      });
      setSelectedJournal(null);
      fetchJournals();
    } catch (e: any) {
      toast({
        title: "Error",
        description: "Approval failed: " + e.message,
        variant: "destructive",
      });
    } finally {
      setApproving(false);
    }
  };

  return (
    <Layout>
      <Layout.Header>
        <TopNav links={topNav} />
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-medium">Journal approvals</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {loading ? "Loading..." : `${count} journal${count !== 1 ? "s" : ""} pending approval`}
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => fetchJournals()}>
            Refresh
          </Button>
        </div>

        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Publisher</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Thematic area</TableHead>
                <TableHead>Language</TableHead>
                <TableHead>Status</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : journals.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                    No unapproved journals found.
                  </TableCell>
                </TableRow>
              ) : (
                journals.map((journal) => (
                  <TableRow key={journal.id}>
                    <TableCell className="font-medium max-w-[200px] truncate">
                      {journal.journal_title}
                    </TableCell>
                    <TableCell>{journal.publishers_name || "—"}</TableCell>
                    <TableCell>{journal.country?.country || "—"}</TableCell>
                    <TableCell>{journal.thematic_area?.thematic_area || "—"}</TableCell>
                    <TableCell>{journal.language?.language || "—"}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-amber-700 bg-amber-50 border-amber-200">
                        Pending
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-green-700 bg-green-50 border-green-200 hover:bg-green-100"
                        onClick={() => setSelectedJournal(journal)}
                      >
                        Approve
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {count > 10 && (
          <div className="flex items-center justify-end gap-2 mt-4 text-sm text-muted-foreground">
            <Button variant="outline" size="sm" disabled={!prevUrl} onClick={() => fetchJournals(prevUrl!)}>
              ← Prev
            </Button>
            <Button variant="outline" size="sm" disabled={!nextUrl} onClick={() => fetchJournals(nextUrl!)}>
              Next →
            </Button>
          </div>
        )}

        <Dialog open={!!selectedJournal} onOpenChange={() => setSelectedJournal(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Approve journal</DialogTitle>
              <DialogDescription>
                You are about to approve <strong>{selectedJournal?.journal_title}</strong>. This will make it publicly visible.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-3 text-sm my-2">
              <div><p className="text-muted-foreground text-xs mb-0.5">Publisher</p><p>{selectedJournal?.publishers_name || "—"}</p></div>
              <div><p className="text-muted-foreground text-xs mb-0.5">ISSN</p><p>{selectedJournal?.issn_number || "—"}</p></div>
              <div><p className="text-muted-foreground text-xs mb-0.5">Country</p><p>{selectedJournal?.country?.country || "—"}</p></div>
              <div><p className="text-muted-foreground text-xs mb-0.5">Language</p><p>{selectedJournal?.language?.language || "—"}</p></div>
              <div><p className="text-muted-foreground text-xs mb-0.5">Thematic area</p><p>{selectedJournal?.thematic_area?.thematic_area || "—"}</p></div>
              <div><p className="text-muted-foreground text-xs mb-0.5">Platform</p><p>{selectedJournal?.platform?.platform || "—"}</p></div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedJournal(null)}>Cancel</Button>
              <Button
                className="bg-green-700 hover:bg-green-800 text-white"
                onClick={handleApprove}
                disabled={approving}
              >
                {approving ? "Approving..." : "Approve"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Layout.Body>
    </Layout>
  );
}