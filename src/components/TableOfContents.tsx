// src/components/TableOfContents.tsx

import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, List } from "lucide-react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string; // content bleibt hier, wird aber nicht direkt für ID-Parsing verwendet
  mobile?: boolean;
}

const TableOfContents = ({ content, mobile = false }: TableOfContentsProps) => {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  // Neuer useEffect zum Parsen der Überschriften aus dem gerenderten DOM
  useEffect(() => {
    // Kurze Verzögerung, um sicherzustellen, dass ReactMarkdown das Rendering abgeschlossen hat
    const timeoutId = setTimeout(() => {
      const headings = document.querySelectorAll<HTMLElement>('.prose h2, .prose h3'); // Wähle die Überschriften im Prose-Container
      const items: TocItem[] = [];
      headings.forEach(heading => {
        const id = heading.id;
        const text = heading.textContent || '';
        const level = parseInt(heading.tagName.substring(1)); // H1 -> 1, H2 -> 2, etc.
        if (id && text && (level === 2 || level === 3)) { // Filtern nach H2 und H3 wie im Original-Regex
          items.push({ id, text, level });
        }
      });
      setTocItems(items);
    }, 100); // Eine kleine Verzögerung (z.B. 100ms) kann helfen

    return () => clearTimeout(timeoutId);
  }, [content]); // Abhängigkeit von content, falls der Artikelinhalt sich ändert

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let currentActiveId: string | null = null;
        entries.forEach((entry) => {
          // Prüfen, ob die Überschrift vollständig im Viewport ist und die Intersection Ratio hoch genug ist
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            // Priorisiere Überschriften, die näher am oberen Rand sind oder von höherer Ebene sind
            if (!currentActiveId) {
              currentActiveId = entry.target.id;
            } else {
              const currentLevel = tocItems.find(item => item.id === currentActiveId)?.level || 0;
              const newLevel = tocItems.find(item => item.id === entry.target.id)?.level || 0;

              // Wenn eine höhere Überschrift oder eine aktuellere Überschrift gefunden wird, aktualisieren
              if (newLevel < currentLevel || (newLevel === currentLevel && entry.target.getBoundingClientRect().top < document.getElementById(currentActiveId)?.getBoundingClientRect().top)) {
                currentActiveId = entry.target.id;
              }
            }
          }
        });
        if (currentActiveId) {
          setActiveId(currentActiveId);
        }
      },
      {
        rootMargin: "0px 0px -60% 0px", // Ändert den "Sichtbereich", damit der Link aktiv wird, wenn die Überschrift ~40% vom oberen Rand entfernt ist
        threshold: [0, 0.25, 0.5, 0.75, 1], // Beobachte bei verschiedenen Sichtbarkeitsstufen
      }
    );

    // Beobachte alle Überschriften, die im Inhaltsverzeichnis gelistet sind
    tocItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [tocItems]); // Abhängigkeit von tocItems, da die zu beobachtenden Elemente sich ändern können

  const handleClick = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      // Optional: Update URL hash without full reload for better UX
      // window.history.pushState(null, '', `#${id}`);
      setActiveId(id); // Set activeId immediately on click
    }
  }, []);

  const TocContent = () => (
    <div className="space-y-2">
      {tocItems.map((item) => (
        <button
          key={item.id}
          onClick={() => handleClick(item.id)}
          className={`w-full text-left text-sm py-1 px-2 rounded-md hover:bg-muted/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors ${
            activeId === item.id ? "text-primary font-medium" : "text-muted-foreground"
          } ${item.level === 3 ? "ml-4" : ""}`}
        >
          {item.text}
        </button>
      ))}
    </div>
  );

  if (mobile) {
    return (
      <Card className="mb-6">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <CardHeader className="pb-3 cursor-pointer hover:bg-muted/50">
              <CardTitle className="flex items-center justify-between text-base">
                <div className="flex items-center gap-2">
                  <List className="h-4 w-4" />
                  Table of Contents
                </div>
                <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <TocContent />
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    );
  }

  return (
    <Card className="sticky top-4">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <List className="h-4 w-4" />
          Table of Contents
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <TocContent />
      </CardContent>
    </Card>
  );
};

export default TableOfContents;
