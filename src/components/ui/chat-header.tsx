import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from '~/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { useModelStore, Model } from '~/app/store/useModelStore'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuGroup } from '~/components/ui/dropdown-menu'
import { SignInButton, SignOutButton, useUser } from '@clerk/nextjs'
import { UserCircle } from 'lucide-react'

export default function ChatHeader() {
  const { model, updateModel } = useModelStore()
  const { isSignedIn, user } = useUser()

  return (
    <div className='flex justify-between items-center w-full bg-white mb-4'>
      <Select value={!isSignedIn && !user ? "gpt-3.5-turbo" : model} onValueChange={(value) => updateModel(value as Model)}>
          <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a model" />
          </SelectTrigger>
          <SelectContent>
              <SelectGroup>
                <SelectLabel>Models</SelectLabel>
                <SelectItem disabled={!isSignedIn && !user} value={"gpt-4o" as Model}>GPT-4o</SelectItem>
                <SelectItem disabled={!isSignedIn && !user} value={"gpt-4o-mini" as Model}>GPT-4o-mini</SelectItem>
                <SelectItem disabled={!isSignedIn && !user} value={"gpt-4-turbo" as Model}>GPT-4-turbo</SelectItem>
                <SelectItem value={"gpt-3.5-turbo" as Model}>GPT-3.5-turbo</SelectItem>
              </SelectGroup>
          </SelectContent>
      </Select>
      <DropdownMenu>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              {
                isSignedIn && user ? (
                  <DropdownMenuItem className="cursor-pointer">
                    <SignOutButton />
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem className="cursor-pointer">
                    <SignInButton />
                  </DropdownMenuItem>
                )
              }
            </DropdownMenuGroup>
          </DropdownMenuContent>
          <DropdownMenuTrigger>
          <Avatar>
            {isSignedIn && user && (
              <AvatarImage src={user.imageUrl} />
            )}
            <AvatarFallback>
              <UserCircle />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
      </DropdownMenu>
    </div>
  )
}