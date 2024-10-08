# Shiva Chatbot

Shiva Chatbot is a ChatGPT clone built with modern web technologies. It provides an interactive chat interface powered by advanced language models, offering users an AI-driven conversational experience.

## Features

- **AI-Powered Chat**: Engage in natural language conversations with an AI chatbot.
- **Google Authentication**: Secure sign-in process using Google accounts.
- **Rate Limiting**: Prevents abuse and ensures fair usage of the chat service.
- **Dark/Light Theme**: Customizable user interface for comfortable viewing in any lighting condition.
- **Responsive Design**: Seamless experience across desktop and mobile devices.

## Tech Stack

- **Frontend**: Next.js 14.2.14, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes
- **AI Integration**: LangChain, Anthropic API
- **Authentication**: NextAuth with Google Sign-In
- **Rate Limiting**: Upstash Redis
- **Theming**: next-themes

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v20 or later)
- npm or yarn
- Git

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/Shivkumar-Raghuwanshi/shiva-chatbot.git
   cd shiva-chatbot
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following variables:
   ```
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ANTHROPIC_API_KEY=your_anthropic_api_key
   UPSTASH_REDIS_URL=your_upstash_redis_url
   UPSTASH_REDIS_TOKEN=your_upstash_redis_token
   ```

4. Run the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. Sign in using your Google account.
2. Start a new chat session or continue an existing one.
3. Type your message and interact with the AI chatbot.
4. Use the theme toggle to switch between light and dark modes.

## Contributing

We welcome contributions to Shiva Chatbot! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [LangChain](https://js.langchain.com/)
- [Anthropic](https://www.anthropic.com/)
- [Upstash](https://upstash.com/)
- [NextAuth.js](https://next-auth.js.org/)

## Contact

For any questions or concerns, please open an issue on the GitHub repository or contact the project maintainers.