import React from "react";
import ChatHeader from "@/components/ChatHeader";

export default function Page() {
	return (
		<div className="max-w-3xl mx-auto md:py-10 h-screen">
			<div className=" h-full border rounded-md">
				<ChatHeader />
			</div>
		</div>
	);
}
