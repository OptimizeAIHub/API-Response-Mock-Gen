# API Response Mock Generator

## Description

The **API Response Mock Generator** is a Visual Studio Code extension designed to simplify API development. It takes OpenAPI/Swagger specifications (JSON or YAML format) as input and generates mock API response data. Ideal for developers and testers, this extension provides an easy way to prototype and test APIs.

**Authors**: Suresh Nettur, Akhil Dusi and Unnati Nettur.

---

## Features

- **Input Text Area**: Paste your OpenAPI/Swagger spec (JSON or YAML format) into the provided text area.
- **Process Button**: Click to generate mock API responses based on the provided spec.
- **Clear Button**: Quickly clear the input field and start fresh.
- **Generated Mock Data Display**: View the generated mock API responses in a dedicated text area labeled "API Response Mock Data."

---

## Requirements

- **Visual Studio Code**: Version 1.36.1 or higher.
- **Node.js**: Version 14 or higher (for local development and extension customization).
- **Valid OpenAPI/Swagger Specifications**: JSON or YAML format supported.

---

## Installation

1. Open Visual Studio Code.
2. Go to the **Extensions** view by clicking on the Extensions icon in the Activity Bar.
3. Search for `API Response Mock Generator` in the Extensions Marketplace.
4. Click **Install**.
5. Once installed, activate the extension by opening the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on macOS) and selecting `API Response Mock Generator`.

---

## Usage

1. Open the extension in Visual Studio Code.
2. Paste a valid OpenAPI/Swagger specification in the input text area.
3. Click **Process** to generate mock data.
4. The generated mock data will appear in the "API Response Mock Data" text area.
5. Click **Clear** to reset both the input and output areas.

---

## Known Issues

- **Invalid Specifications**: The extension may not handle improperly formatted OpenAPI/Swagger specifications correctly.
- **Large Specs**: Processing very large specifications may result in slower performance or memory limitations.
- **YAML Edge Cases**: Complex YAML syntax may sometimes cause unexpected errors.

---

## License

This extension is licensed under the [MIT License](LICENSE).
See the LICENSE file for details.

---

## Disclaimer

- **Ethical Usage**: This tool is designed for ethical development and testing purposes only. Do not use it for any unethical or inappropriate activities.
- **PII/PHI Handling**: Avoid including personally identifiable information (PII) or protected health information (PHI) in the input spec. The developers are not responsible for any misuse of the extension.
- **Spec Validity**: Ensure the OpenAPI/Swagger specification provided is valid and correctly formatted for accurate mock data generation.

### Support

For issues or questions, visit the GitHub repository or contact us via the Visual Studio Code Marketplace.
