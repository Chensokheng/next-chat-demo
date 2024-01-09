export async function POST(req: Request) {
	await fetch(
		"https://discord.com/api/webhooks/1194202014377320509/rL1B15fdeZgsaNXK_LIGfBqiB-N52rkIjjEFS4spUMJh8ra6-bpY-O24qPN14KgUZqbn",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				//@ts-ignore
				content: "new order + " + req.body?.record?.id,
			}),
		}
	);

	return Response.json({ result: "ok" });
}
