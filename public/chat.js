/**
 * Bubbles AI Guide frontend
 *
 * Handles chat UI interactions and streaming responses from the Worker API.
 */

const chatMessages = document.getElementById("chat-messages");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");
const typingIndicator = document.getElementById("typing-indicator");
const promptButtons = document.querySelectorAll(".prompt-button");

let chatHistory = [
	{
		role: "assistant",
		content: "Hello, I am Bubbles. What reading practice should we work on today?",
	},
];
let isProcessing = false;

userInput.addEventListener("input", function () {
	this.style.height = "auto";
	this.style.height = `${this.scrollHeight}px`;
});

userInput.addEventListener("keydown", function (event) {
	if (event.key === "Enter" && !event.shiftKey) {
		event.preventDefault();
		sendMessage();
	}
});

sendButton.addEventListener("click", sendMessage);

promptButtons.forEach((button) => {
	button.addEventListener("click", () => {
		if (isProcessing) return;
		userInput.value = button.dataset.prompt || "";
		userInput.focus();
		userInput.dispatchEvent(new Event("input"));
	});
});

async function sendMessage() {
	const message = userInput.value.trim();
	if (message === "" || isProcessing) return;

	setProcessing(true);
	addMessageToChat("user", message);

	userInput.value = "";
	userInput.style.height = "auto";
	typingIndicator.classList.add("visible");
	chatHistory.push({ role: "user", content: message });

	try {
		const assistantMessageEl = addMessageToChat("assistant", "");
		const assistantTextEl = assistantMessageEl.querySelector("p");

		const response = await fetch("/api/chat", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ messages: chatHistory }),
		});

		if (!response.ok) {
			const errorText = await readErrorText(response);
			throw new Error(errorText || "Failed to get response");
		}
		if (!response.body) {
			throw new Error("Response body is empty");
		}

		const responseText = await readStreamingResponse(response.body, (text) => {
			assistantTextEl.textContent = text;
			scrollChatToBottom();
		});

		if (responseText.length > 0) {
			chatHistory.push({ role: "assistant", content: responseText });
		} else {
			assistantTextEl.textContent = "Bubbles did not receive an answer. Please try again.";
		}
	} catch (error) {
		console.error("Bubbles chat error:", error);
		addMessageToChat(
			"assistant",
			"Bubbles had trouble answering. Please try again in a moment.",
		);
	} finally {
		typingIndicator.classList.remove("visible");
		setProcessing(false);
		userInput.focus();
	}
}

function setProcessing(value) {
	isProcessing = value;
	userInput.disabled = value;
	sendButton.disabled = value;
}

function addMessageToChat(role, content) {
	const messageEl = document.createElement("div");
	messageEl.className = `message ${role}-message`;

	const paragraph = document.createElement("p");
	paragraph.textContent = content;
	messageEl.appendChild(paragraph);

	chatMessages.appendChild(messageEl);
	scrollChatToBottom();
	return messageEl;
}

async function readStreamingResponse(body, onUpdate) {
	const reader = body.getReader();
	const decoder = new TextDecoder();
	let responseText = "";
	let buffer = "";

	while (true) {
		const { done, value } = await reader.read();

		if (done) {
			buffer += decoder.decode();
			const parsed = consumeSseEvents(`${buffer}\n\n`);
			responseText += extractTextFromEvents(parsed.events);
			onUpdate(responseText);
			break;
		}

		buffer += decoder.decode(value, { stream: true });
		const parsed = consumeSseEvents(buffer);
		buffer = parsed.buffer;

		const nextText = extractTextFromEvents(parsed.events);
		if (nextText) {
			responseText += nextText;
			onUpdate(responseText);
		}

		if (parsed.done) break;
	}

	return responseText.trim();
}

function consumeSseEvents(buffer) {
	let normalized = buffer.replace(/\r/g, "");
	const events = [];
	let done = false;
	let eventEndIndex;

	while ((eventEndIndex = normalized.indexOf("\n\n")) !== -1) {
		const rawEvent = normalized.slice(0, eventEndIndex);
		normalized = normalized.slice(eventEndIndex + 2);

		const dataLines = rawEvent
			.split("\n")
			.filter((line) => line.startsWith("data:"))
			.map((line) => line.slice("data:".length).trimStart());

		if (dataLines.length === 0) continue;

		const data = dataLines.join("\n");
		if (data === "[DONE]") {
			done = true;
			break;
		}
		events.push(data);
	}

	return { events, buffer: normalized, done };
}

function extractTextFromEvents(events) {
	let text = "";

	for (const data of events) {
		try {
			const jsonData = JSON.parse(data);
			if (typeof jsonData.response === "string") {
				text += jsonData.response;
			} else if (jsonData.choices?.[0]?.delta?.content) {
				text += jsonData.choices[0].delta.content;
			}
		} catch (error) {
			console.error("Could not parse streamed data:", error, data);
		}
	}

	return text;
}

async function readErrorText(response) {
	try {
		const data = await response.json();
		return data.error;
	} catch {
		return "";
	}
}

function scrollChatToBottom() {
	chatMessages.scrollTop = chatMessages.scrollHeight;
}
