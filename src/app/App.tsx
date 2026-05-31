"use client";

import { AuditView } from "./components/AuditView";
import { CompanionChat } from "./components/CompanionChat";
import { CorpusView } from "./components/CorpusView";
import { GraphView } from "./components/GraphView";
import { IconRail } from "./components/IconRail";
import { KeyPointsPanel } from "./components/KeyPointsPanel";
import { SkillsList } from "./components/SkillsList";
import { SkillsView } from "./components/SkillsView";
import { SoulHero } from "./components/SoulHero";
import { SoulsSidebar } from "./components/SoulsSidebar";
import { TopBar } from "./components/TopBar";
import { StoreProvider } from "./state/StoreProvider";
import { useStore } from "./state/store";

export default function App() {
  return (
    <StoreProvider>
      <Shell />
    </StoreProvider>
  );
}

function Shell() {
  return (
    <div
      className="size-full min-h-screen p-3"
      style={{
        backgroundImage:
          "linear-gradient(135deg, #a7f3d0 0%, #fef3c7 50%, #fecaca 100%)",
      }}
    >
      <div className="flex h-[calc(100vh-1.5rem)] gap-3 min-w-0">
        <IconRail />

        <main className="flex-1 flex flex-col min-w-0">
          <TopBar />
          <div className="flex-1 min-h-0 overflow-hidden">
            <MainView />
          </div>
        </main>
      </div>
    </div>
  );
}

function MainView() {
  const { activeNav, souls, activeSoulId } = useStore();
  const activeSoul = souls.find((s) => s.id === activeSoulId) ?? souls[0];

  if (activeNav === "graph") return <GraphView />;
  if (activeNav === "skills") return <SkillsView />;
  if (activeNav === "corpus") return <CorpusView />;
  if (activeNav === "history") return <AuditView />;

  if (activeNav === "chat") {
    return (
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-3 h-full min-h-0 overflow-y-auto pr-1">
        <div className="xl:col-span-3 min-h-0">
          <SoulsSidebar />
        </div>
        <div className="xl:col-span-9 min-h-0">
          <CompanionChat full />
        </div>
      </div>
    );
  }

  // souls (default)
  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-3 h-full min-h-0 overflow-y-auto pr-1">
      <div className="xl:col-span-3 min-h-0">
        <SoulsSidebar />
      </div>
      <div className="xl:col-span-6 flex flex-col gap-3 min-h-0">
        <SoulHero soul={activeSoul} />
        <SkillsList />
      </div>
      <div className="xl:col-span-3 flex flex-col gap-3 min-h-0">
        <KeyPointsPanel />
        <CompanionChat />
      </div>
    </div>
  );
}
