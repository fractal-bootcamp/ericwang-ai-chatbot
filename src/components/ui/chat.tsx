'use client';

import { Message, useChat } from '@ai-sdk/react';
import { createIdGenerator } from 'ai';
import { ChatMessage } from './chat-message';
import { MessageInput } from './message-input';
import ChatHeader from './chat-header';

export default function Chat({
  id,
  initialMessages,
}: { id?: string | undefined; initialMessages?: Message[] } = {}) {
  const { input, handleInputChange, handleSubmit, messages } = useChat({
    maxSteps: 5,
    id,
    initialMessages, 
    sendExtraMessageFields: true,
    generateId: createIdGenerator({
      prefix: 'msgc',
      size: 16,
    }),
    onFinish: (message) => {
      console.log('onFinish', message);
    },
  });

  return (
      <div className="max-h-screen h-full p-4">
        {/* messages container */}
          <div className="flex flex-col h-full w-full ">
            <div className='flex items-center'>            
              <ChatHeader />
            </div>
            <div className="flex flex-col overflow-y-auto max-w-[736px] h-full w-full mx-auto">
              {messages.map(m => (
                <ChatMessage className='mb-4' key={m.id} role={m.role} content={m.content}id={m.id} />
              ))}
            </div>
            {/* input container */}
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-2 max-w-[768px] mx-auto w-full bg-white">
                <MessageInput value={input} onChange={handleInputChange} isGenerating={false} allowAttachments={false} />
              <span className="text-sm text-gray-500">Deep work is valuable.</span>
            </form>
          </div>
      </div>
  );
}