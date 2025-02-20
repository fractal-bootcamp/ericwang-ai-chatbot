import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from '~/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { useModelStore, Model } from '~/app/store/useModelStore'

export default function ChatHeader() {
  const { model, updateModel } = useModelStore()

  return (
    <div className='flex justify-between items-center w-full bg-white mb-4'>
        <Select value={model} onValueChange={(value) => updateModel(value as Model)}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                <SelectLabel>Models</SelectLabel>
                <SelectItem value={"gpt-4o" as Model}>GPT-4o</SelectItem>
                <SelectItem value={"gpt-4o-mini" as Model}>GPT-4o-mini</SelectItem>
                <SelectItem value={"gpt-4-turbo" as Model}>GPT-4-turbo</SelectItem>
                <SelectItem value={"gpt-3.5-turbo" as Model}>GPT-3.5-turbo</SelectItem>
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