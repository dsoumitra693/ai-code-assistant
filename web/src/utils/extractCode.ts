import { CodeBlock } from "./type";

export default function extractCode(text: string) {
  text = text.replace(/\r\n/g, '\n');

  const codeRegex = /(?:^##\s*\d+\.\s*(.*?)\n)?(?:^.*?`([^`\n]+)`.*?\n)?^```(\w+)?\n([\s\S]*?)^```/gm;

  const result: CodeBlock[] = [];
  let match;

  while ((match = codeRegex.exec(text)) !== null) {
    const [, stepTitle, fileName, language, code] = match;
    result.push({
      stepTitle: stepTitle?.trim() || null,
      fileName: fileName?.trim() || null,
      language: language?.trim() || null,
      code: code.trim().replace(/\n/g, ' && ')
    });
  }

  return result;
}
