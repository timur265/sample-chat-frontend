import React, { PureComponent } from "react";
import classes from "./ChatPage.css";
import cn from "clsx";
import ChatMessage from "./components/ChatMessage";
import ChatInput from "./components/ChatInput";
import { ChatMessage as ChatMessageType } from "src/services/ChatService";

interface ChatPageProps {
  chatMessages: ChatMessageType[];
  onSubmit: (message: string) => void;
}

class ChatPage extends PureComponent<ChatPageProps> {
  public chatRef = React.createRef<HTMLDivElement>();

  public componentDidMount(): void {
    this.scrollChatToBottom();
  }

  public componentDidUpdate(): void {
    const chat = this.chatRef.current;
    if (chat && chat.scrollHeight - chat.scrollTop !== chat.clientHeight) {
      this.scrollChatToBottom();
    }
  }

  render(): React.ReactNode {
    const { chatMessages, onSubmit } = this.props;

    return (
      <main className={cn(classes.container)}>
        <div className={cn(classes.messagesContainer)} ref={this.chatRef}>
          {chatMessages.map((c) => (
            <ChatMessage onLoad={this.handleImageLoad} key={c.id} {...c} />
          ))}
        </div>
        <ChatInput onSubmit={onSubmit} />
      </main>
    );
  }

  private handleImageLoad = () => {
    const chat = this.chatRef.current;
    if (chat && chat.scrollHeight - chat.scrollTop !== chat.clientHeight) {
      this.scrollChatToBottom();
    }
  };

  private scrollChatToBottom() {
    const chat = this.chatRef.current;
    if (chat) {
      chat.scrollTop = chat.scrollHeight - chat.clientHeight;
    }
  }
}

export default ChatPage;
