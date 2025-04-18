import { CodeBlock } from "./type";

export default function createFile(code: CodeBlock) {
    window.__vscodeAPI__?.postMessage({
        command: "create-file",
        fileName: code.fileName,
        content: code.code,
    })
}