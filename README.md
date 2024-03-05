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
