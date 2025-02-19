import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from '~/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
// type Props = {}

export default function ChatHeader() {
  return (
    <div className='flex justify-between items-center w-full bg-white mb-4'>
        <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                <SelectLabel>Models</SelectLabel>
                <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                <SelectItem value="gpt-4o-mini">GPT-4o-mini</SelectItem>
                <SelectItem value="gpt-3.5-turbo">GPT-3.5-turbo</SelectItem>
                <SelectItem value="gpt-3.5-turbo-mini">GPT-3.5-turbo-mini</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    </div>
  )
}