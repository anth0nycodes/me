"use client";

import { CSSProperties, Dispatch, SetStateAction, useState } from "react";
import { ChevronRight, FileIcon, FolderIcon, FolderOpen, Minimize2 } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface FileNode {
  path: string;
  children?: FileNode[];
}

const TREE_DATA: FileNode[] = [
  {
    path: "app",
    children: [
      {
        path: "api",
        children: [
          {
            path: "auth",
            children: [
              {
                path: "contact",
                children: [{ path: "route.ts" }],
              },
              {
                path: "callback",
                children: [{ path: "route.ts" }],
              },
            ],
          },
          {
            path: "products",
            children: [{ path: "route.ts" }],
          },
        ],
      },
      {
        path: "layout.tsx",
      },
      {
        path: "page.tsx",
      },
    ],
  },
  {
    path: "components",
    children: [
      {
        path: "ui",
        children: [{ path: "button.tsx" }, { path: "input.tsx" }],
      },
      { path: "navbar.tsx" },
      { path: "footer.tsx" },
    ],
  },
  {
    path: "data",
    children: [{ path: "projects.ts" }, { path: "socials.ts" }],
  },
  {
    path: "hooks",
    children: [{ path: "use-debounce.ts" }, { path: "use-on-screen.ts" }],
  },
  {
    path: "package.json",
  },
  {
    path: "README.md",
  },
];

export function FileTree() {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  return (
    <div className="bg-foreground flex size-full items-center justify-center">
      <div className="text-muted-foreground ring-muted-foreground/30 flex size-full max-h-[213.75px] max-w-63 flex-col gap-1 rounded-md ring sm:max-h-65.5">
        <div className="ml-auto pt-1.5 pr-1.5">
          <button
            onClick={() => setExpandedNodes(new Set())}
            className="w-max cursor-pointer rounded-sm bg-[#EFEFEF] p-0.75 transition-transform duration-200 active:scale-95 sm:p-1"
          >
            <Minimize2 className="size-2.5 stroke-[1.5] sm:size-3" aria-hidden />
          </button>
        </div>
        <div className="scrollbar-thin-rounded overflow-y-auto p-1.5 text-xs sm:text-sm">
          <Tree
            nodes={TREE_DATA}
            expandedNodes={expandedNodes}
            setExpandedNodes={setExpandedNodes}
          />
        </div>
      </div>
    </div>
  );
}

function renderChevronIcon(node: FileNode, isExpanded?: boolean) {
  if (!node.children) return <span className="size-4 shrink-0" aria-hidden />;

  return (
    <ChevronRight
      data-expanded={isExpanded}
      className="size-3 shrink-0 transform-gpu transition-transform duration-200 data-[expanded=true]:rotate-90 motion-reduce:duration-0 sm:size-4"
      aria-hidden
    />
  );
}

function renderNodeIcon(node: FileNode, isExpanded?: boolean) {
  if (!node.children) {
    return <FileIcon className="size-4 shrink-0 transform-gpu sm:size-5" aria-hidden />;
  }

  if (isExpanded) {
    return <FolderOpen className="size-4 shrink-0 transform-gpu sm:size-5" aria-hidden />;
  }

  return <FolderIcon className="size-4 shrink-0 transform-gpu sm:size-5" aria-hidden />;
}

interface TreeProps {
  nodes: FileNode[];
  expandedNodes: Set<string>;
  setExpandedNodes: Dispatch<SetStateAction<Set<string>>>;
  parentPath?: string;
}

function Tree({ nodes, expandedNodes, setExpandedNodes, parentPath = "" }: TreeProps) {
  const prefersReducedMotion = useReducedMotion();

  function handleNodeClick(node: FileNode, fullPath: string) {
    if (!node.children) return;

    setExpandedNodes((prev) => {
      const newNodes = new Set(prev);
      if (newNodes.has(fullPath)) newNodes.delete(fullPath);
      else newNodes.add(fullPath);
      return newNodes;
    });
  }

  return (
    <div className="flex flex-col">
      {nodes.map((node) => {
        const fullPath = parentPath ? `${parentPath}/${node.path}` : node.path;
        const depth = fullPath.split("/").length - 1;
        const isExpanded = expandedNodes.has(fullPath);

        return (
          <div key={fullPath}>
            <button
              onClick={() => handleNodeClick(node, fullPath)}
              className="flex w-full cursor-pointer items-center gap-1.5 rounded-md p-1.5 pl-[calc(var(--depth)*0.75rem+0.375rem)] hover:bg-[#EFEFEF] sm:gap-2 sm:p-2 sm:pl-[calc(var(--depth)*1rem+0.5rem)]"
              style={{ "--depth": depth } as CSSProperties}
            >
              {renderChevronIcon(node, isExpanded)}
              {renderNodeIcon(node, isExpanded)}
              <span
                className={cn(
                  node.children ? "text-background font-medium" : "text-muted-foreground",
                )}
              >
                {node.path}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={prefersReducedMotion ? {} : { height: 0 }}
                  animate={prefersReducedMotion ? {} : { height: "auto" }}
                  exit={prefersReducedMotion ? {} : { height: 0 }}
                  transition={
                    prefersReducedMotion ? {} : { type: "spring", duration: 0.3, bounce: 0 }
                  }
                  className="overflow-hidden"
                >
                  <Tree
                    nodes={node.children!}
                    expandedNodes={expandedNodes}
                    setExpandedNodes={setExpandedNodes}
                    parentPath={fullPath}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
