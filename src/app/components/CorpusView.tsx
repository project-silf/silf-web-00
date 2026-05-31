import {
  Database,
  FileSpreadsheet,
  FileText,
  Folder,
  Mail,
  MessageSquare,
} from "lucide-react";

const SOURCES = [
  {
    id: "conf",
    name: "Confluence",
    icon: FileText,
    count: "12,402 pages",
    status: "Synced 4 min ago",
  },
  {
    id: "sp",
    name: "SharePoint",
    icon: Folder,
    count: "48,901 docs",
    status: "Synced 11 min ago",
  },
  {
    id: "teams",
    name: "Microsoft Teams",
    icon: MessageSquare,
    count: "1.2M messages",
    status: "Live",
  },
  {
    id: "out",
    name: "Outlook",
    icon: Mail,
    count: "184,220 emails",
    status: "Synced 1 h ago",
  },
  {
    id: "jira",
    name: "Jira",
    icon: Database,
    count: "9,801 issues",
    status: "Synced 22 min ago",
  },
  {
    id: "xls",
    name: "Excel exports",
    icon: FileSpreadsheet,
    count: "612 sheets",
    status: "Manual upload",
  },
];

export function CorpusView() {
  return (
    <div className="h-full bg-white/80 backdrop-blur rounded-3xl border border-white/60 shadow-sm p-5 overflow-y-auto">
      <header className="mb-4">
        <p className="text-xs uppercase tracking-wider text-neutral-500">
          Workspace
        </p>
        <h2 className="mt-1">Corpus &amp; integrations</h2>
        <p className="mt-1 text-sm text-neutral-500">
          Where the Souls' knowledge lives. Connecting a source feeds the
          knowledge graph and trains skills.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {SOURCES.map(({ id, name, icon: Icon, count, status }) => (
          <div
            key={id}
            className="rounded-2xl bg-white border border-neutral-100 p-4 flex items-center gap-3"
          >
            <div className="size-10 rounded-xl bg-neutral-50 flex items-center justify-center">
              <Icon className="size-4 text-neutral-700" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm">{name}</p>
              <p className="text-xs text-neutral-500">{count}</p>
            </div>
            <span className="text-xs text-neutral-500">{status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
