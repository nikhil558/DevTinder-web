# DevTinder

- create a vite + React application
- Remove unnecessary code and create a Hello world app
- Install Tailwind CSS
- Install Daisy UI
- Add Navbar component to App.jsx
- Install react-router-dom
- Create BrowserRouter > Routes> Route =/ Body > RouteChildren
- Create an Outlet in your Body Component
- Create a footer 

- Create a login Page
- Intall Axios
- CORS - install cors in backend => add middleware to with configuration: origin, credentials: true 
- Whenever you're making API call so pass axios => {withCredentials: true}
- Install react-redux + @reduxjs/toolkit 
- configureStore => Provider => createSlice => add reducer to store
- Add redux devtools in chrome
- Login ans see if youe data is coming properly in the store
- NavBar should update as soon as user logs In 
- Refactor our code to add constants file + create a components folder

- You should not be access other routes without login
- If token is not present, redirect user to login page
- Logout Feature
- Get the feed and add the feed in the store
- Build the user card on feed
- Edit Profile feature
- Show toast message on save of profile

- New page - See all my connections
- New page - See all my connection requests
- Feature - Accept/Reject Connection Request

- Send or ignore the user card from feed
- Signup New User
- E2E Testing

# Deployment 

- Signup on AWS
- Launch Instance
- chmod 400 <secret>.pem
- Connect to the mechine SSH comand
- install node version
- git clone
- Frontend 
    - npm install -> install the dependencies
    - npm run build
    - sudo apt update
    - sudo apt install nginx
    - sudo systemctl start nginx
    - sudo systemctl enable nginx
    - copy code from dist(build files) to /var/www/html/
    - sudo scp -r dist/* /var/www/html/
    - Enable port:80  of your instance
- Backend
    - Updated Db Password
    - allowed ec2 instance public IP on mongdb server
    - npm install pm2 -g
    - pm2 start npm -- start
    - config nginx - sudo nano /etc/nginx/sites-available/default
    - sudo systemctl restart nginx
    - Modify the BaseURL in frontend project to "/api"


**Note**
    - pm2 logs (console logs)
    - pm2 list (show list)
    - pm2 stop npm (stop the process)
    - pm2 delete npm (delete the process)
    - pm2 flush npm
    - pm2 start npm --name "<name of the process>" -- start (change the process name)


# Custom Domain Name 

    - purchase domain name from godaddy
    - signup on cloudflare
    - change the name servers on gopaddy and point it to cloudflare
    - wait for sometime your nameservers are updated
    - DNS record : A devtinder.in 43.204.96.49
    - Enable SSL for website

# Sending Emails via SES

    - Create a IAM user
    - Give Access to AmazonSESFullAccess
    - Amazon SES: Create an Identity
    - Verify your domain name
    - Verify an email address
    - Install AWS SDK - v3
    - code see in documentation
    - Setup SesClient
    - Access Credentials should be created in IAM under security credentialsa Tab 
    - Add the credentials to the env file
    - Write code for SESClient
    - Write code for Sending email address
    - Make the email dynamic by passing more params to the run function

# Scheduling cron jobs in NodeJs

    - Installing node-cron
    - Learning about cron expressions syntax - crontab.guru
    - Schedule a job
    - date-fns
    - Find all the unique email Id who have got connection Requests in previous day
    - Send Email
    - Explore queue mechanism to send bulk emails
    - Amazon SES Bulk Email
    - Make sendEmail function dynamic
    - bee-queue and Bull npm packages

# Razorpay Payment Gateway Integration

    - Signup on Razorpay & complete KYC
    - Create a UI for Premium Page
    - Creating an API for create order in backend
    - Added my key and secret in enc file
    - Initialize Razorpay in uttils
    - creating order on Razopay
    - Create Schema and model 
    - save thr order in payments collection
    - make the API dynamic
    - Setup Razopay webhook on your live API
    - Ref - https://github.com/razorpay/razorpay-node/tree/master/documents
    - Ref - https://razorpay.com/docs/payments/server-integration/nodejs/integration-steps/#integrate-with-razorpay-payment-gateway
    - Ref - https://razorpay.com/docs/webhoooks/validate-test/
    - Ref - https://razorpay.com/docs/webhooks/payloads/payments/

  note: Ngrok for localhost webhook
