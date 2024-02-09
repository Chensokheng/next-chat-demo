import React from "react";

export default function ChatAbout() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="space-y-5 text-center">
        <h1 className="text-3xl font-bold">Welcome to Daily Chat</h1>
        <p className="w-96">
          This is a chat application that power by supabase realtime db. Login
          to send message
        </p>
      </div>
    </div>
  );
}
