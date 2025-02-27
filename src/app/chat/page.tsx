import Chat from '~/components/ui/chat';

export default async function Page() {
    // i was assuming all chats would be created here.
    // now chats need to be created if they don't yet exist.
    // this shouldn't be a huge issue, i'll just do it when I get a message.
    return <Chat />; 
}