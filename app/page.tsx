import React from "react";
import ChatHeader from "@/components/ChatHeader";
import { supabaseServer } from "@/lib/supabase/server";
import InitUser from "@/lib/store/InitUser";
import ChatInput from "@/components/ChatInput";
import ListMessages from "@/components/ListMessages";
import ChatMessages from "@/components/ChatMessages";
import ChatAbout from "@/components/ChatAbout";

export default async function Page() {
	const supabase = supabaseServer();
	const { data } = await supabase.auth.getSession();

	return (
		<>
			<div className="max-w-3xl mx-auto md:py-10 h-screen">
				<div className=" h-full border rounded-md flex flex-col relative">
					<ChatHeader user={data.session?.user} />

					{data.session?.user ? (
						<>
							<ChatMessages />
							<ChatInput />
						</>
					) : (
						<ChatAbout />
					)}
				</div>
			</div>
			<InitUser user={data.session?.user} />
		</>
	);
}
