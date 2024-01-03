import { Imessage } from "@/lib/store/messages";
import React from "react";
import Image from "next/image";
export default function Message({ message }: { message: Imessage }) {
	return (
		<div className="flex gap-2">
			<div>
				<Image
					src={message.users?.avatar_url!}
					alt={message.users?.display_name!}
					width={40}
					height={40}
					className=" rounded-full ring-2"
				/>
			</div>
			<div className="flex-1">
				<div className="flex items-center gap-1">
					<h1 className="font-bold">{message.users?.display_name}</h1>
					<h1 className="text-sm text-gray-400">
						{new Date(message.created_at).toDateString()}
					</h1>
				</div>
				<p className="text-gray-300">{message.text}</p>
			</div>
		</div>
	);
}
