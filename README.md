# Camber API Integration Example - Typescript

This project demonstrates how to integrate with the Camber API for document verification. It includes examples of starting a verification process and handling webhook events.

## Setup

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up your environment variables in a `.env` file:
   ```
   CAMBER_MODE=live
   CAMBER_LIVE_API_KEY=your_live_api_key
   CAMBER_TEST_API_KEY=your_test_api_key
   CAMBER_WEBHOOK_SECRET=your_webhook_secret
   PORT=8080
   ```

## Usage

To run your first example verification, make sure `CAMBER_MODE` is set to `test` in your `.env` file.

1. Start your webhook server with `npm run server`
2. Use `ngrok http {PORT}` to expose your local server to the internet
3. Add the ngrok url to your Camber app webhook settings. Make sure the entire endpoint is set to `{ngrok_url}/webhook`
4. Run `npm run example` to start your verification!
