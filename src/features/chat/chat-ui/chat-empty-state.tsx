import Typography from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowUpCircle, Loader2 } from "lucide-react";
import { FC, useState } from "react";
import { ChatType, ConversationStyle } from "../chat-services/models";
import { ChatStyleSelector } from "./chat-style-selector";
import { ChatTypeSelector } from "./chat-type-selector";
interface Prop {
  isUploadingFile: boolean;
  chatType: ChatType;
  conversationStyle: ConversationStyle;
  uploadButtonLabel: string;
  onChatTypeChange: (value: ChatType) => void;
  onConversationStyleChange: (value: ConversationStyle) => void;
  onFileChange: (file: FormData) => void;
}

export const EmptyState: FC<Prop> = (props) => {
  const [showFileUpload, setShowFileUpload] = useState<ChatType>("simple");
  const [isFileNull, setIsFileNull] = useState(true);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    props.onFileChange(formData);
  };

  const onChatTypeChange = (value: ChatType) => {
    setShowFileUpload(value);
    setIsFileNull(true);
    props.onChatTypeChange(value);
  };

  return (
    <div className="grid grid-cols-5 w-full items-center container mx-auto max-w-3xl justify-center h-full gap-9">
      <div className="col-span-2 gap-5 flex flex-col flex-1">
        <img src="/ai-icon.png" className="w-36" />
        <p className="">
          Comece a usar o chat escrevendo na caixa de texto abaixo. Você também pode
          personalizar o chat antes de começar nas opção ao lado.
        </p>
      </div>
      <Card className="col-span-3 flex flex-col gap-5 p-5 ">
        <Typography variant="h4" className="text-primary">
          Personalize
        </Typography>

        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">
            Escolha um estilo de conversa
          </p>
          <ChatStyleSelector
            conversationStyle={props.conversationStyle}
            onChatStyleChange={props.onConversationStyleChange}
            disable={false}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">
            Escolha o seu tipo de chat
          </p>
          <ChatTypeSelector
            chatType={props.chatType}
            onChatTypeChange={onChatTypeChange}
            disable={false}
          />
        </div>
        {showFileUpload === "data" && (
          <div className="flex flex-col gap-2">
            <form onSubmit={onSubmit} className="flex gap-2">
              <Input
                name="file"
                type="file"
                required
                disabled={props.isUploadingFile}
                placeholder="Describe the purpose of the document"
                onChange={(e) => {
                  setIsFileNull(e.currentTarget.value === null);
                }}
              />

              <Button
                type="submit"
                value="Upload"
                disabled={!(!isFileNull && !props.isUploadingFile)}
                className="flex items-center gap-1"
              >
                {props.isUploadingFile ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <ArrowUpCircle size={20} />
                )}
                Upload
              </Button>
            </form>
            <p className="text-xs text-primary">{props.uploadButtonLabel}</p>
          </div>
        )}
      </Card>
    </div>
  );
};
