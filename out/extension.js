"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const mockGenerator_1 = require("./mockGenerator");
async function activate(context) {
    let newPanel = undefined;
    console.log('Extension is now active!');
    const processtest = vscode.commands.registerCommand('apiresponsemockgen.processTest', () => {
        //vscode.window.showInformationMessage('Hello VS code from Suresh Nettur - PT!');
        // Create and show panel
        let currentPanel = vscode.window.createWebviewPanel('process', 'API Response Mock Generator', vscode.ViewColumn.One, { enableScripts: true, });
        // And set its HTML content
        currentPanel.webview.html = getWebviewContent();
        // handle receiving messages from the webview
        currentPanel.webview.onDidReceiveMessage(async (message) => {
            if (!currentPanel) {
                return;
            }
            //console.log('Received message:: ' + message.text);
            switch (message.command) {
                case 'alert':
                    //console.log('Input given:: ' + message.text);
                    if (message.text.length === 0) {
                        vscode.window.showErrorMessage(`Please enter data to process.`);
                        return;
                    }
                    let scenario1 = "Scenario 1 - Not Available.";
                    try {
                        // Generate mock request and response data from the Swagger spec
                        const mockData = await (0, mockGenerator_1.generateMockDataFromSwagger)(message.text);
                        // console.debug('generateMockDataFromSwagger response:: ' + JSON.stringify(mockData));
                        let scenarioData = getValueByTagName(mockData, "scenario1");
                        scenario1 = scenarioData ? formatScenario(scenarioData) : "No data found for scenario1.";
                        scenarioData = getValueByTagName(mockData, "scenario2");
                        scenario1 += scenarioData ? (`\n` + formatScenario(scenarioData)) : "\n No data found for scenario2.";
                        scenarioData = getValueByTagName(mockData, "scenario3");
                        scenario1 += scenarioData ? (`\n` + formatScenario(scenarioData)) : "\n No data found for scenario3.";
                        const key1 = Object.keys(mockData);
                        // console.debug("key1:: " + key1);
                        const key2 = Object.keys(getValueByTagName(mockData, key1[0]));
                        // console.debug("key2:: " + key2);
                        scenario1 = "<mark>For \"" + key1 + "\" (" + key2 + "):</mark> \n\n" + scenario1 + "\n\n";
                        // console.debug('new scenario1:: ' + scenario1);
                        currentPanel.webview.postMessage({
                            type: 'message', formattedJson: scenario1
                        });
                    }
                    catch (error) {
                        console.error('Error processing generateMockDataFromSwagger:', error);
                        vscode.window.showErrorMessage(`Failed to process generateMockDataFromSwagger. ${error}`);
                    }
                    return;
            }
        }, undefined, context.subscriptions);
    });
    context.subscriptions.push(processtest);
}
function formatScenario(jsonData) {
    console.debug('formatScenario:: ' + JSON.stringify(jsonData));
    // Extract the values from the JSON data
    const scenarionHeader = jsonData.header ? JSON.stringify(jsonData.header, null, 2).replace(/"/g, '') : "No header provided";
    const request = jsonData.request ? JSON.stringify(jsonData.request, null, 4) : "No request data";
    const response = jsonData.responses ? JSON.stringify(jsonData.responses, null, 4) : "No response data";
    const result = `${scenarionHeader}:\n<b>\nRequest:</b>\n${request}\n<b>\nResponse:</b>\n${response}\n`;
    console.debug('result of formatScenario:: ' + result);
    // Format the output string as requested
    return result;
}
function getValueByTagName(json, tagName) {
    if (json === null || typeof json !== "object") {
        return null;
    }
    // If the current object has the specified tag, return its value
    if (json.hasOwnProperty(tagName)) {
        return json[tagName];
    }
    // Recursively search each property
    for (const key in json) {
        if (json.hasOwnProperty(key)) {
            const value = getValueByTagName(json[key], tagName);
            if (value !== null) {
                return value; // Return the value if found
            }
        }
    }
    return null; // Return null if the tag name is not found
}
function getWebviewContent() {
    return `<!DOCTYPE html>
  <html>
    <head>
        <style>
			h1.fancy {
            	font-family: "Segoe UI", Roboto, Arial, sans-serif;
            	font-size: 30px;
				font-weight: bold;
            	text-align: center;
				text-transform: uppercase;
				text-shadow: 2px 4px 6px rgba(0, 0, 0, 0.2);
				color: transparent;
				background: linear-gradient(135deg, #36d1dc, #5b86e5);
				-webkit-background-clip: text;
				background-clip: text;
				letter-spacing: 0.05em;
				padding: 10px;
				transition: transform 0.3s ease-in-out, text-shadow 0.3s ease-in-out;
				margin-bottom: 0px;
        	}
			h4.fancy {
				font-family: "Segoe UI", Roboto, Arial, sans-serif;
				font-size: 16px;
				color: #fffdd0;
				text-align: center;
				letter-spacing: 1px;
				transition: all 0.3s ease-in-out;
				margin-top: 0px; 
        	}
			table {
				font-family: arial, sans-serif;
				border: 0px solid #dddddd;
				border-collapse: collapse;
			}
			td, th {
				border: 0px solid #dddddd;
				text-align: center;
				padding: 0px;
			}
			textarea {
				font-family: "Segoe UI", Roboto, Arial, sans-serif;
				font-size: 16px;
				color: #333;
				width: 100%;
				height: calc(30 * 1.2em);
  				resize: none;
				padding: 0px;
				background: #e0f7fa;
				border: 2px solid #673ab7;
				border-radius: 12px;
				box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
				overflow: auto;
				outline: none;
				transition: all 0.3s ease-in-out;
			}
			.readonly-div {
				font-family: "Segoe UI", Roboto, Arial, sans-serif;
				font-size: 16px;
				color: #333;
				background-color: #ffffff; 
				background: #e0f7fa;
				border: 2px solid #673ab7;
				border-radius: 12px;
				box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
				padding: 5px;
				white-space: pre-wrap;
				word-wrap: break-word;
				outline: none;
				transition: all 0.3s ease-in-out;
				overflow-y: auto;
				overflow-y: auto;
				width: calc(50ch + 20px);
				height: calc(30 * 1.2em);
				text-align: left;
       		}
		    .fancy-input {
				font-family: "Segoe UI", Roboto, Arial, sans-serif;
				font-size: 18px;
				width: 15%;
				padding: 10px 10px 10px 5px;
				border: 1px solid #ccc;
				border-radius: 5px;
				outline: none;
				background: none;
				background-color: #f7f7f7;
				transition: border-color 0.3s ease-in-out;
		    }
			.fancy-button {
				font-family: "Segoe UI", Roboto, Arial, sans-serif;
				font-size: 16px;
				font-weight: bold;
				display: inline-block;
				padding: 12px 24px;
				margin-bottom: 15px;
				color: #fff;
				background: #2196f3;
				border: none;
				border-radius: 5px;
				box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
				cursor: pointer;
				outline: none;
				text-transform: uppercase;
				transition: all 0.3s ease-in-out;
	        }
			label.fancy-label {
				font-family: "Segoe UI", Roboto, Arial, sans-serif;
				font-size: 18px;
				font-weight: bold;
				color: #ADD8E6;
				letter-spacing: 1px;
			}
	        option {
    	        padding: 10px;
        	    font-size: 16px;
        	}
        </style>
    </head>
	
	<body>

	<script type="text/javascript">

		const vscode = acquireVsCodeApi(); 

		function clearAll() {
			document.getElementById("txt").value = "";
			document.getElementById("formattedJsonText").innerHTML = "";
		}

		function displayOut() {
			vscode.postMessage({
				command: "alert", 
				text: document.getElementById("txt").value
			});
		}

        window.addEventListener("message", event => {
			document.getElementById("formattedJsonText").innerHTML = event.data.formattedJson;
			document.getElementById("formattedJsonText").focus();
        });

	</script>

	<form>
  		<table>
    		<tr>
        		<td colspan="3">
					<h1 class="fancy">API Response Mock Generator</h1>
					<h4 class="fancy">Automatically generate mock API responses<h4>
				</td>
    		</tr>

			<tr>
				<td>
					<label class="fancy-label">OpenAPI/Swagger Spec (JSON/ yaml)</label>
					<textarea id="txt" align="left">
openapi: 3.0.0
info:
  title: Sample API
  version: 1.0.0
paths:
  /users:
    post:
      summary: Creates or retrieves a user by ID
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                id:
                  type: integer
      responses:
        '200':
          description: A JSON object of the user with specified ID
          content:
            application/json:
              schema:
                type: object
                properties:
                  id:
                    type: integer
                  name:
                    type: string
        '400':
          description: Invalid request
          content:
            application/json:
              schema:
                type: object
                properties:
                  message:
                    type: string
        '401':
          description: Unauthorized
          content:
            application/json:
              schema:
                type: object
                properties:
                  message:
                    type: string</textarea>
				</td>

				<td>
					<input class="fancy-button" type="button" onclick="displayOut()" value=" Process ">
					<input class="fancy-button" type="button" onclick="clearAll()" value=" Clear ">
				</td>

				<td>
					<label class="fancy-label">API Response Mock Data</label>
					<div id="formattedJsonText" class="readonly-div" contenteditable="false"></div>
				</td>

			</tr>
		</table>
	</form>

</body>
</html>`;
}
// This method is called when your extension is deactivated
function deactivate() { }
//# sourceMappingURL=extension.js.map