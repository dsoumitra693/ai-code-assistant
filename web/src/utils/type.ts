export interface Chat {
    role: string;
    content: string;
}

export interface ChatCompletionRequestMessage {
    role: string;
    content: string;
}

export interface CodeBlock {
    fileName: string | null;
    language: string | null;
    code: string;
    stepTitle: string | null;
}