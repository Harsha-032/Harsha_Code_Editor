
# Harsha's Editor - AI-Powered Code Editor

This is a Next.js application built in Firebase Studio. It's an AI-powered code editor that allows you to write, execute, and get assistance with your code snippets in various languages.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **AI/Generative:** [Google's Genkit](https://firebase.google.com/docs/genkit)
- **UI:** [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/)
- **Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Editor:** [Monaco Editor](https://microsoft.github.io/monaco-editor/)

## Getting Started (Local Development)

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

You need to have [Node.js](https://nodejs.org/en) (version 20 or later) and npm installed on your machine.

### Installation

1.  **Install dependencies:**
    Open your terminal in the project's root directory and run the following command to install all the required packages:
    ```bash
    npm install
    ```

2.  **Set up Environment Variables (Crucial Step):**
    Create a file named `.env` in the root of your project. You must add your Google AI API key here for the generative AI features to work.
    ```
    GEMINI_API_KEY="your_api_key_here"
    ```

### Running the Application

This project requires two separate terminal processes to run concurrently.

1.  **Start the Next.js Frontend:**
    ```bash
    npm run dev
    ```
    This will start the app on [http://localhost:9002](http://localhost:9002).

2.  **Start the Genkit Backend:**
    In a *new* terminal window, run:
    ```bash
    npm run genkit:dev
    ```
    This starts the Genkit server required for the AI features.

---

## Deployment to AWS EC2

This guide walks you through deploying your Next.js application to an AWS EC2 instance using Nginx as a reverse proxy and PM2 to manage the application process.

### Step 1: Launch an EC2 Instance

1.  **Open the EC2 Console:** Log in to your AWS Management Console and navigate to the EC2 dashboard.
2.  **Launch Instance:**
    -   Choose an **Amazon Machine Image (AMI):** A good choice is **Ubuntu Server 22.04 LTS** (or a later LTS version).
    -   **Instance Type:** Select an instance type. `t2.micro` is eligible for the AWS Free Tier.
    -   **Key Pair:** Create a new key pair or select an existing one. Download the `.pem` file and keep it secure. You will need it to connect to your instance.
    -   **Network Settings (Security Group):** Create a security group with inbound rules to allow traffic on:
        -   **SSH** (Port 22) from your IP address.
        -   **HTTP** (Port 80) from anywhere (0.0.0.0/0).
        -   **HTTPS** (Port 443) from anywhere (0.0.0.0/0).
3.  **Launch:** Review your settings and launch the instance.

### Step 2: Connect to Your EC2 Instance

Use SSH to connect to your newly created instance.

```bash
# Make your key file read-only
chmod 400 /path/to/your-key-pair.pem

# Connect to the instance
ssh -i /path/to/your-key-pair.pem ubuntu@your_ec2_public_ip_address
```

### Step 3: Set Up the Server Environment

Once connected, run the following commands on your EC2 instance.

1.  **Update Package Lists:**
    ```bash
    sudo apt update
    sudo apt upgrade -y
    ```

2.  **Install Node.js (Version 20.x):**
    ```bash
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
    ```

3.  **Install PM2 and Nginx:**
    -   **PM2** is a process manager that will keep your Next.js and Genkit apps running.
    -   **Nginx** will act as a reverse proxy to direct traffic to your app.
    ```bash
    sudo npm install -g pm2
    sudo apt install -y nginx
    ```

### Step 4: Deploy Your Application Code

1.  **Install Git:**
    ```bash
    sudo apt install -y git
    ```
2.  **Clone Your Repository:** Clone your project from GitHub (or your Git provider).
    ```bash
    git clone https://your-repository-url.git
    cd your-project-directory # e.g., cd Code_Editor
    ```

3.  **Install Dependencies:**
    ```bash
    npm install
    ```

4.  **Create Environment File:** Create the `.env` file and add your API key.
    ```bash
    nano .env
    ```
    Add the following line, replacing the placeholder with your key:
    ```
    GEMINI_API_KEY="your_actual_api_key_here"
    ```
    Save the file (Ctrl+X, then Y, then Enter).

5.  **Build the Application:**
    ```bash
    npm run build
    ```

### Step 5: Configure Nginx

1.  **Create an Nginx Configuration File:**
    ```bash
    sudo nano /etc/nginx/sites-available/your-app-name
    ```

2.  **Add the Following Configuration:** This configures Nginx to listen on port 80 and forward requests to your Next.js app running on port 9002.
    ```nginx
    server {
        listen 80;
        server_name your_ec2_public_ip_address; # Or your domain name

        location / {
            proxy_pass http://localhost:9002;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
    ```

3.  **Enable the Configuration:**
    ```bash
    # Create a symbolic link to the sites-enabled directory
    sudo ln -s /etc/nginx/sites-available/your-app-name /etc/nginx/sites-enabled/

    # Test for syntax errors
    sudo nginx -t

    # Restart Nginx to apply changes
    sudo systemctl restart nginx
    ```

### Step 6: Start the Application with PM2

1.  **Start the Genkit Server:**
    ```bash
    pm2 start "npm run genkit:dev" --name "genkit-server"
    ```

2.  **Start the Next.js Production Server:**
    ```bash
    pm2 start "npm run start" --name "next-app"
    ```

3.  **Save PM2 Process List:** This ensures your apps will restart automatically if the server reboots.
    ```bash
    pm2 save
    ```

Your application should now be live! You can access it by navigating to your EC2 instance's public IP address in your browser.

### Useful PM2 Commands

-   **List all running processes:** `pm2 list`
-   **Monitor logs:** `pm2 logs`
-   **Stop a process:** `pm2 stop <app_name>`
-   **Restart a process:** `pm2 restart <app_name>`

## Available Scripts (Local)

- `npm run dev`: Runs the Next.js app in development mode.
- `npm run genkit:dev`: Starts the Genkit server for local AI development.
- `npm run build`: Builds the app for production.
- `npm run start`: Starts a Next.js production server.
- `npm run lint`: Runs the linter to check for code quality issues.
