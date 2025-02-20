'use client';

import { experimental_useObject as useObject } from '@ai-sdk/react';
import { notificationSchema } from '../api/notifications/schema';
import { Button } from '~/components/ui/button';

export default function Page() {
  const { object, submit } = useObject({
    api: '/api/notifications',
    schema: notificationSchema,
  });

  return (
    <>
      <Button onClick={() => submit('Messages during finals week.')}>
        Generate notifications
      </Button>

      {object?.notifications?.map((notification, index) => (
        <div className='border border-gray-300 rounded-md p-4' key={index}>
          <p className='font-bold'>{notification?.name}</p>
          <p>{notification?.message}</p>
        </div>
      ))}
    </>
  );
}