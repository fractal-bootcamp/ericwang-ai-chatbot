"use client";

import { Plus, Trash } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "../../components/ui/sidebar"
import { Button } from "~/components/ui/button"
import { Tooltip, TooltipTrigger, TooltipContent } from "~/components/ui/tooltip"
import Link from "next/link"
import { api } from "~/trpc/react";
import { redirect } from "next/navigation";

export function AppSidebar() {
  const utils = api.useUtils();
  const { data: sessions } = api.session.getAll.useQuery();
  const { data: latestSession } = api.session.getLatest.useQuery();
  const deleteSession = api.session.delete.useMutation({
    onSuccess: () => {
      void utils.session.getAll.invalidate();
    }
  });

  const handleNewChat = async () => {
    await utils.session.getAll.invalidate();
  }

  const handleDeleteChat = async (id: string) => {
    await deleteSession.mutateAsync({ id });
    redirect(`/chat`);
  }

  console.log(sessions);
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="p-4">
          <div className="flex justify-between items-center mb-4">
            <SidebarGroupLabel className="text-lg font-bold text-gray-800">Eric&apos;s Chatbot</SidebarGroupLabel>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/chat" onClick={handleNewChat}>
                  <Button variant="outline" className="w-8 h-8 p-0">
                    <Plus />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>New chat</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {sessions?.map((session) => (
                <SidebarMenuItem key={session.id}>
                  <SidebarMenuButton asChild>
                    <div className="flex justify-between items-center">
                      <a href={`/chat/${session.id}`}>
                        <span>{session.id}</span>
                      </a>
                      <button onClick={() => void handleDeleteChat(session.id)}>
                        <Trash className="w-4 h-4 p-0 text-gray-400 hover:text-red-500" />
                      </button>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}