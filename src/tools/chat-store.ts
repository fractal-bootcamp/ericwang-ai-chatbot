import { generateId } from 'ai';
import { Message } from 'ai';
import { db } from '~/server/db';
import { messages as messagesTable, session } from '~/server/db/schema';
import { eq } from 'drizzle-orm';

// Create new chat session
export async function createChat(): Promise<string> {
  const id = generateId();
  
  // Create chat record in database
  await db.insert(session).values({
    id,
    createdAt: new Date(),
  });

  return id;
}

export async function loadChat(id: string): Promise<Message[]> {
    const dbMessages = await db.query.messages.findMany({
        where: eq(messagesTable.sessionId, id),
    });
    
    return dbMessages.map(msg => ({
        id: msg.id,
        content: msg.content,
        role: msg.role,
        createdAt: msg.createdAt,
    }));
}

export async function saveChat({
    id,
    messages,
  }: {
    id: string;
    messages: Message[];
  }): Promise<void> {

    // Insert each message into the database
    for (const message of messages) {
      await db.insert(messagesTable).values({
        id: message.id,
        content: message.content,
        role: message.role,
        sessionId: id,
        createdAt: new Date(message.createdAt ?? Date.now()),
      }).onConflictDoUpdate({
        target: messagesTable.id,
        set: {
          content: message.content,
          updatedAt: new Date()
        }
      });
    }
  }
  export async function deleteChat(id: string): Promise<void> {
    await db.delete(session).where(eq(session.id, id));
  }