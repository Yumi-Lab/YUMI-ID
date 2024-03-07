<h1 align="left">Installation process:</h1>

###

<h6 align="left">Cloning the repository:</h6>

###

<p align="left">git clone https://github.com/Yumi-Lab/YUMI-ID.git</p>

### :gear: Installation

Cloning the repository:
```bash
git clone https://github.com/Yumi-Lab/YUMI-ID.git
```
Installing dependencies:
```bash
cd YUMI-ID
```

```bash
npm install
```
Configuring automatic startup process:
If PM2 is not installed, install it globally on the server:
```bash
npm install -g pm2
```
Start your application with PM2:
```bash
pm2 start index.js --name YUMI-ID
```
Save the process to start automatically on server boot:
```bash
pm2 save
```
Generate a startup script (if necessary):
```bash
pm2 startup
```
<h2 align="left">Installation process .sh :</h2>

1-Open the link to the yumi-id-server.sh file on GitHub: yumi-id-server.sh. Click on the "Raw" button in the top right corner of the file's content. A new page will open displaying the content of the file in plain text. Copy the URL of this page. Use that URL as a direct download link on your webpage or document. When users click on that link, the file will be downloaded automatically.

```bash
https://github.com/Yumi-Lab/YUMI-ID/blob/main/yumi-id-server.sh
```
2-Make the Script Executable: Ensure that the script has executable permissions. You can do this by running the following command in the terminal:
```bash
sudo chmod +x yumi-id-server.sh
```
3-Run the Script: Execute the script by running the following command:
```bash
./install-yumi-id.sh
```
4-Follow On-Screen Instructions: The script will guide you through the installation process. It will check for dependencies, clone the YUMI-ID repository, install project dependencies, and provide instructions for starting the server.
5-Start the Server: After the script completes successfully, follow the instructions provided to start the server. Typically, this involves navigating into the YUMI-ID directory and running the server using
```bash
cd YUMI-ID
```

```bash
npm run start
```
Configuring automatic startup process:
If PM2 is not installed, install it globally on the server:
```bash
npm install -g pm2
```
Start your application with PM2:
```bash
pm2 start index.js --name YUMI-ID
```
