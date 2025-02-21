'use client';

import { Message, useChat } from '@ai-sdk/react';
import { createIdGenerator } from 'ai';
import { ChatMessage } from './chat-message';
import { MessageInput } from './message-input';
import ChatHeader from './chat-header';
import { useModelStore } from '~/app/store/useModelStore';
import Welcome from './welcome';

export default function Chat({
  id,
  initialMessages,
}: { id?: string | undefined; initialMessages?: Message[] } = {}) {
  const { model } = useModelStore()
  const { input, handleInputChange, handleSubmit, messages } = useChat({
    maxSteps: 5,
    id,
    initialMessages, 
    sendExtraMessageFields: true,
    body: { model },
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
          <div className="flex flex-col h-full w-full ">
            {/* header */}
            <div className='flex items-center'>            
              <ChatHeader />
            </div>
            {/* messages container */}
            <div className={`flex flex-col overflow-y-auto max-w-[736px] h-full w-full mx-auto ${messages.length === 0 && 'place-content-center'}`}>
              {messages.length === 0 ? (
                <Welcome />
              ) : (
                messages.map(m => (
                  <ChatMessage className='mb-4' key={m.id} role={m.role} content={m.content}id={m.id} showTimeStamp={true} />
                ))
              )}
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