# Shiva Chatbot

Shiva Chatbot is a ChatGPT clone built with modern web technologies. It provides an interactive chat interface powered by advanced language models, offering users an AI-driven conversational experience.

## Features

- **AI-Powered Chat**: Engage in natural language conversations with an AI chatbot.
- **Google Authentication**: Secure sign-in process using Google accounts.
- **Rate Limiting**: Prevents abuse and ensures fair usage of the chat service.
- **Dark/Light Theme**: Customizable user interface for comfortable viewing in any lighting condition.
- **Responsive Design**: Seamless experience across desktop and mobile devices.
- **Persistent Data Storage**: User data and chat history stored securely in a database.

## Tech Stack

- **Frontend**: Next.js 14.2.14, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes
- **AI Integration**: LangChain, Anthropic API
- **Authentication**: NextAuth with Google Sign-In
- **Rate Limiting**: Upstash Redis
- **Theming**: next-themes
- **Database**: Supabase (PostgreSQL)
- **ORM**: Prisma
- **Deployment**: Vercel

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v20 or later)
- npm or yarn
- Git

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/Shivkumar-Raghuwanshi/Shiva-Chatbot.git
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
   DATABASE_URL=your_supabase_postgres_connection_string
   ```

4. Set up the database:
   ```
   npx prisma migrate dev
   ```

5. Run the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. Sign in using your Google account.
2. Start a new chat session or continue an existing one.
3. Type your message and interact with the AI chatbot.
4. Use the theme toggle to switch between light and dark modes.

## Deployment

This project is configured for easy deployment on Vercel. Follow these steps:

1. Create a Vercel account if you haven't already.
2. Connect your GitHub repository to Vercel.
3. Configure the environment variables in the Vercel dashboard.
4. Deploy the project.

Vercel will automatically deploy your application and provide you with a live URL.

## Database Management

This project uses Supabase as the database provider and Prisma as the ORM. To manage your database:

1. Create a Supabase project and obtain the connection string.
2. Update the `DATABASE_URL` in your `.env.local` file and in your Vercel environment variables.
3. Run migrations in your development environment:
   ```
   npx prisma migrate dev
   ```
4. For production, run:
   ```
   npx prisma migrate deploy
   ```

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
- [Prisma](https://www.prisma.io/)
- [Supabase](https://supabase.com/)
- [Vercel](https://vercel.com/)

## Contact

For any questions or concerns, please open an issue on the GitHub repository or contact the project maintainers.