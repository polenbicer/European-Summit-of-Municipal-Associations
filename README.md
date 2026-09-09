# European Summit of Municipal Associations

Bilingual Turkish and English summit information and registration website.

## Publish from GitHub with Vercel

1. Create a new empty GitHub repository and upload all files from this project.
2. Import the repository into Vercel. Vercel will detect Next.js automatically.
3. Create a Supabase project. Open its SQL Editor and run `supabase-schema.sql`.
4. In Vercel, add the environment variables listed in `.env.example`.
5. Create a Resend account, verify the email-sending domain, and add the Resend values in Vercel.
6. Redeploy the Vercel project after adding environment variables.

Registration records are stored in the Supabase `rsvps` table. New-registration notifications are sent to `polen.bicer@tbb.gov.tr`; participants receive a confirmation in the language they used.

Do not commit `.env` files or API keys to GitHub.
