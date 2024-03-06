<h1 align="left">Installation process:</h1>

###

<h6 align="left">Cloning the repository:</h6>

###

<p align="left">git clone https://github.com/Yumi-Lab/YUMI-ID.git</p>

###

<h6 align="left">Installing dependencies:</h6>

###

<p align="left">cd YUMI-ID</p>

###

<p align="left">npm install</p>

###

<h4 align="left">Configuring automatic startup process:</h4>

###

<h6 align="left">If PM2 is not installed, install it globally on the server:</h6>

###

<p align="left">npm install -g pm2</p>

###

<h6 align="left">Start your application with PM2:</h6>

###

<p align="left">pm2 start index.js --name YUMI-ID</p>

###

<h6 align="left">Save the process to start automatically on server boot:</h6>

###

<p align="left">pm2 save</p>

###

<h6 align="left">Generate a startup script (if necessary):</h6>

###

<p align="left">pm2 startup</p>

###

<h6 align="left">Follow the instructions provided by PM2 to configure automatic startup of PM2 when the server boots.</h6>

###

<h2 align="left">Installation process .sh :</h2>

###

<h6 align="left">1-Download the Script: First, download the shell script (yumi-id-server.sh) to your local machine or server.</h6>

###


<h6 align="left">2-Make the Script Executable: Ensure that the script has executable permissions. You can do this by running the following command in the terminal:</h6>

<p align="left">chmod +x yumi-id-server.sh.sh</p>

###


<h6 align="left">3-Run the Script: Execute the script by running the following command:</h6>

<p align="left">./install-yumi-id.sh</p>

###

<h6 align="left">4-Follow On-Screen Instructions: The script will guide you through the installation process. It will check for dependencies, clone the YUMI-ID repository, install project dependencies, and provide instructions for starting the server.</h6>

###

<h6 align="left">5-Start the Server: After the script completes successfully, follow the instructions provided to start the server. Typically, this involves navigating into the YUMI-ID directory and running the server using <span>npm run start command</span>.</h6>
