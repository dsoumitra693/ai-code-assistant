import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

// Track open panels for cross-panel sync
const openPanels = new Set<vscode.WebviewPanel>();

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('vscode-ai-assistant.openWebview', () => {
    const panel = vscode.window.createWebviewPanel(
      'taskAgentWebView',
      'AI Task Agent',
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        retainContextWhenHidden: true, // Keep state when hidden
        localResourceRoots: [
          vscode.Uri.file(path.join(context.extensionPath, 'dist', 'webview')),
        ],
      }
    );

    openPanels.add(panel);
    panel.onDidDispose(() => openPanels.delete(panel));

    // Load and rewrite HTML for local resources
    const distPath = path.join(context.extensionPath, 'dist', 'webview');
    const htmlPath = path.join(distPath, 'index.html');
    let html = fs.readFileSync(htmlPath, 'utf8');
    html = html.replace(/(href="|src=")(.*?)"/g, (_: any, prefix: any, filePath: string) =>
      `${prefix}${panel.webview.asWebviewUri(vscode.Uri.file(path.join(distPath, filePath)))}"`
    );
    panel.webview.html = html;

    // Handle messages from the webview
    panel.webview.onDidReceiveMessage(async (message) => {
      try {
        switch (message.type) {
          case 'close':
            panel.dispose();
            break;

          case 'data-get:chatHistory': {
            const value = context.workspaceState.get('chatHistory', []);
            panel.webview.postMessage({
              type: 'get-data:chatHistory',
              payload: { value },
            });
            break;
          }

          case 'data-get:individualChat': {
            const value = context.workspaceState.get('individualChat', {});
            panel.webview.postMessage({
              type: 'get-data:individualChat',
              payload: { value },
            });
            break;
          }

          case 'data-update:chatHistory': {
            const { value } = message.payload;
            console.log(value)
            const prevValue = context.workspaceState.get('chatHistory', []);
            const newValue = Array.isArray(prevValue) ? [...prevValue, value] : [value];
            await context.workspaceState.update('chatHistory', newValue);
            // Sync all open panels
            openPanels.forEach(p =>
              p.webview.postMessage({
                type: 'get-data:chatHistory',
                payload: { value: newValue },
              })
            );
            break;
          }

          case 'data-update:individualChat': {
            const { value } = message.payload;
            const prevValue = context.workspaceState.get('individualChat', {});
            const newValue = { ...prevValue, ...value };
            await context.workspaceState.update('individualChat', newValue);
            openPanels.forEach(p =>
              p.webview.postMessage({
                type: 'get-data:individualChat',
                payload: { value: newValue },
              })
            );
            break;
          }

          case 'clear-data': {
            await context.workspaceState.update('chatHistory', []);
            await context.workspaceState.update('individualChat', {});
            openPanels.forEach(p => {
              p.webview.postMessage({
                type: 'get-data:chatHistory',
                payload: { value: [] },
              });
              p.webview.postMessage({
                type: 'get-data:individualChat',
                payload: { value: {} },
              });
            });
            break;
          }

          default:
            console.warn('Unhandled message type:', message.type);
        }
      } catch (err) {
        vscode.window.showErrorMessage(`Extension error: ${err}`);
      }
    });
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
