# Rico Depot
Rico Depot is a "mock" market place application that allows users to create an account, sign in, purchase products, monitor purchase history, and see how they stack up against other spenders on the application on the leaderboard page. Rico Depot does not actually sell real products or use real money, and gives a user a base ammount of credit upon signing up.

# Getting Started
To get started first set up your file structure and then go to the root directory of the application in your terminal and type "npm i" followed by "npm init". This will set up your package.json.

After you have a package.json you can type the following to add all the necessary dependencies.
"npm i express"
"npm i firebase"
"npm i mysql"

# Deployment
To deploy this application to Heroku, you have three options. The easiest way I found to deploy is to simply go to your Heroku dashboard for your application. Click the "Deploy" tab and look for "Deployment method" on the page. There should be three options and the option you would like to select is Github, it will ask you which repository you would like to select and thats it.

# Possible Additions and Issues

As far as additions go, I wanted to use AWS S3 bucket storage system and accessed my assets from there rather than deploy them to Heroku/Github. This will be a possible future addition, as well as the implimentation of product images in the purchase histories of users.

As far as any issues go, I do feel that my firebase information is a bit "exposed" and would have liked more time to spend on the security features of my application, this may be addressed in future updates.

# Link to Application
https://ricodepot.herokuapp.com/
