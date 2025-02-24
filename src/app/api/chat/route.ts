import { openai } from '@ai-sdk/openai';
import { Message, streamText, appendResponseMessages, createIdGenerator } from 'ai';
import { saveChat } from '../../../tools/chat-store';
import { tools } from '~/ai/tools';
import { Model } from '~/app/store/useModelStore';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, id, model } = await req.json() as { 
    messages: Message[]; 
    id: string;
    model: Model;
  };
  
  const result = streamText({
    model: openai(model),
    system: 'You are a helpful assistant.',
    messages,
    tools,
    experimental_generateMessageId: createIdGenerator({
      prefix: 'msgs',
      size: 16,
    }),
    onError: (error) => {
      console.error(error);
    },
    async onFinish({ response }) {
      if(messages.length > 0) {
        await saveChat({
          id,
          messages: appendResponseMessages({
          messages,
            responseMessages: response.messages,
          }),
        });
      }
    },
  });

  return result.toDataStreamResponse();
}