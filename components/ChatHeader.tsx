"use client";
import React from "react";
import { Button } from "./ui/button";
import { supabaseBrowser } from "@/lib/supabase/browser";

export default function ChatHeader() {
	const handleLoginWithGithub = () => {
		const supabase = supabaseBrowser();
		supabase.auth.signInWithOAuth({
			provider: "github",
			options: {
				redirectTo: location.origin + "/auth/callback",
			},
		});
	};

	return (
		<div className="h-20">
			<div className="p-5 border-b flex items-center justify-between">
				<div>
					<h1 className="text-xl font-bold">Daily Chat</h1>
					<div className="flex items-center gap-1">
						<div className="h-4 w-4 bg-green-500 rounded-full animate-pulse"></div>
						<h1 className="text-sm text-gray-400">2 onlines</h1>
					</div>
				</div>
				<Button onClick={handleLoginWithGithub}>Login</Button>
			</div>
		</div>
	);
}
