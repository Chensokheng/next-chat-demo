"use client";
import { Imessage, useMessage } from "@/lib/store/messages";
import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import { DeleteAlert, EditAlert } from "./MessasgeActions";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { toast } from "sonner";
import { ArrowDown } from "lucide-react";

export default function ListMessages() {
	const scrollRef = useRef() as React.MutableRefObject<HTMLDivElement>;
	const [userScrolled, setUserScrolled] = useState(false);
	const {
		messages,
		addMessage,
		optimisticIds,
		optimisticDeleteMessage,
		optimisticUpdateMessage,
	} = useMessage((state) => state);

	const supabase = supabaseBrowser();
	useEffect(() => {
		const channel = supabase
			.channel("chat-room")
			.on(
				"postgres_changes",
				{ event: "INSERT", schema: "public", table: "messages" },
				async (payload) => {
					if (!optimisticIds.includes(payload.new.id)) {
						const { error, data } = await supabase
							.from("users")
							.select("*")
							.eq("id", payload.new.send_by)
							.single();
						if (error) {
							toast.error(error.message);
						} else {
							const newMessage = {
								...payload.new,
								users: data,
							};
							addMessage(newMessage as Imessage);
						}
					}
				}
			)
			.on(
				"postgres_changes",
				{ event: "DELETE", schema: "public", table: "messages" },
				(payload) => {
					optimisticDeleteMessage(payload.old.id);
				}
			)
			.on(
				"postgres_changes",
				{ event: "UPDATE", schema: "public", table: "messages" },
				(payload) => {
					optimisticUpdateMessage(payload.new as Imessage);
				}
			)
			.subscribe();

		return () => {
			channel.unsubscribe();
		};
	}, [messages]);

	useEffect(() => {
		const scrollContainer = scrollRef.current;
		if (scrollContainer) {
			scrollContainer.scrollTop = scrollContainer.scrollHeight;
		}
	}, [messages]);

	const handleOnScroll = () => {
		const scrollContainer = scrollRef.current;
		if (scrollContainer) {
			const isScroll =
				scrollContainer.scrollTop <
				scrollContainer.scrollHeight -
					scrollContainer.clientHeight -
					10;
			setUserScrolled(isScroll);
		}
	};
	const scrollDown = () => {
		scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
	};

	return (
		<div
			className="flex-1 flex flex-col p-5 h-full overflow-y-auto"
			ref={scrollRef}
			onScroll={handleOnScroll}
		>
			<div className="flex-1 "></div>
			<div className=" space-y-7">
				{messages.map((value, index) => {
					return <Message key={index} message={value} />;
				})}
			</div>
			{userScrolled && (
				<div className=" absolute bottom-20 right-1/2">
					<div
						className="w-10 h-10 bg-blue-500 rounded-full justify-center items-center flex mx-auto border cursor-pointer hover:scale-110 transition-all"
						onClick={scrollDown}
					>
						<ArrowDown />
					</div>
				</div>
			)}
			<DeleteAlert />
			<EditAlert />
		</div>
	);
}
