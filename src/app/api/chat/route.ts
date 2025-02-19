import { openai } from '@ai-sdk/openai';
import { Message, streamText, appendResponseMessages, createIdGenerator } from 'ai';
import { saveChat } from '../../../tools/chat-store';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, id } = await req.json() as { 
    messages: Message[]; 
    id: string;
  };

  const result = streamText({
    model: openai('gpt-4-turbo'),
    system: 'You are a helpful assistant.',
    messages,
    experimental_generateMessageId: createIdGenerator({
      prefix: 'msgs',
      size: 16,
    }),
    onChunk: (chunk) => {
      console.log(chunk);
    },
    onError: (error) => {
      console.error(error);
    },
    async onFinish({ response }) {
      console.log("messages", messages);
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