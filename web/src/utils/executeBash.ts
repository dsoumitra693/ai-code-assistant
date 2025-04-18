import { CodeBlock } from "./type";

export default function executeBash(code: CodeBlock) {
    window.__vscodeAPI__?.postMessage({
        command: "execute-bash",
        content: code.code,
    });
}