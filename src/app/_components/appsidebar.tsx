"use client";

import { Plus, Trash, Ellipsis } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "~/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { Button } from "~/components/ui/button"
import { Tooltip, TooltipTrigger, TooltipContent } from "~/components/ui/tooltip"
import Link from "next/link"
import { api } from "~/trpc/react";
import { redirect, useParams } from "next/navigation";

export function AppSidebar() {
  const utils = api.useUtils();
  const { data: sessions } = api.session.getAll.useQuery();
  const params = useParams();
  const currentSessionId = params.id as string;

  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  
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

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="p-4">
          <div className="flex justify-between items-center mb-4">
            <SidebarGroupLabel className="text-lg font-semibold text-gray-800">Chat History</SidebarGroupLabel>
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
                <SidebarMenuItem key={session.id} className={session.id === currentSessionId ? "bg-gray-200 rounded-md" : ""}>
                  <SidebarMenuButton asChild>
                    <div className="flex justify-between items-center">
                      <a href={`/chat/${session.id}`}>
                        <span>{dateFormatter.format(session.createdAt)}</span>
                      </a>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button>
                            <Ellipsis className="w-4 h-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuGroup>
                            <DropdownMenuItem className="text-red-500 cursor-pointer" onClick={() => handleDeleteChat(session.id)}>
                              <Trash className="w-4 h-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
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