import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('vscode-ai-assistant.openWebview', () => {
    const panel = vscode.window.createWebviewPanel(
      'taskAgentWebView',
      'AI Task Agent',
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'dist', 'webview'))],
      }
    );

    const distPath = path.join(context.extensionPath, 'dist', 'webview');
    const htmlPath = path.join(distPath, 'index.html');
    let html = require('fs').readFileSync(htmlPath, 'utf8');

    html = html.replace(/(href="|src=")(.*?)"/g, (_: any, prefix: any, filePath: string) => {
      return `${prefix}${panel.webview.asWebviewUri(vscode.Uri.file(path.join(distPath, filePath)))}"`;
    });

    panel.webview.html = html;

    panel.webview.onDidReceiveMessage(async (message) => {
      switch (message.type) {
        case 'close':
          panel.dispose();
          break;

        case 'getData': {
          const [key] = message.payload;
          const value = context.workspaceState.get(key);
          panel.webview.postMessage({
            type: 'data',
            payload: { [key]: value }
          });
        }
          break;

        case 'setData':
        case 'data-update': {
          const [key, value] = message.payload;
          await context.workspaceState.update(key, value);

          // Broadcast to all panels
          panel.webview.postMessage({
            type: 'data',
            payload: { [key]: value }
          });
        } 
        break;

        default:
          console.warn('Unhandled message type:', message.type);
      }
    });
  });

  context.subscriptions.push(disposable);
}

export function deactivate() { }
