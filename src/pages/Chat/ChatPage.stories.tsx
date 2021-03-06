import React from "react";
import ChatPage from "./ChatPage";
import { action } from "@storybook/addon-actions";

export default { title: "pages/Chat", component: ChatPage };

const defaultRecievedChatMessage = {
  type: "inbox" as const,
  username: "PimpMasta",
  createdAt: new Date(2020, 0, 1),
  status: "none" as const,
};

const defaulSentChatMessage = {
  type: "outbox" as const,
  username: "HolyGrandma",
  createdAt: new Date(2020, 0, 1),
  status: "receivedByServer" as const,
};

const getChatMessages = (idPrefix: string) => [
  {
    ...defaultRecievedChatMessage,
    id: `${idPrefix}1`,
    text: "Want to bang tonight?",
    createdAt: new Date(2020, 0, 1, 1, 10),
  },
  {
    ...defaultRecievedChatMessage,
    id: `${idPrefix}2`,
    text: "I meant hang",
    createdAt: new Date(2020, 0, 1, 1, 11),
  },
  {
    ...defaultRecievedChatMessage,
    id: `${idPrefix}3`,
    text: "Duck, auto-cucumber",
    createdAt: new Date(2020, 0, 1, 1, 13),
  },
  {
    ...defaulSentChatMessage,
    id: `${idPrefix}4`,
    text: "What?",
    createdAt: new Date(2020, 0, 1, 1, 23),
  },
  {
    id: `${idPrefix}5`,
    text: "God donut.",
    ...defaultRecievedChatMessage,
    createdAt: new Date(2020, 0, 1, 1, 25),
  },
  {
    ...defaultRecievedChatMessage,
    id: `${idPrefix}6`,
    text: "How the duck do I turn this off?",
    createdAt: new Date(2020, 0, 1, 1, 26),
  },
  {
    ...defaulSentChatMessage,
    id: `${idPrefix}7`,
    text: ":))",
    createdAt: new Date(Date.now() - 1000 * 60 * 20),
  },
];

const handleSubmit = action("onSubmit");

export const withDefaultChat = (): React.ReactNode => (
  <ChatPage onSubmit={handleSubmit} chatMessages={getChatMessages("1")} />
);

export const withTonsOfMessage = (): React.ReactNode => (
  <ChatPage
    onSubmit={handleSubmit}
    chatMessages={[
      ...getChatMessages("1"),
      ...getChatMessages("2"),
      ...getChatMessages("3"),
      ...getChatMessages("4"),
    ]}
  />
);
