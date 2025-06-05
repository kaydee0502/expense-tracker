/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    V1_NEXT_PUBLIC_EXPENSE_API_ENDPOINT: process.env.V1_NEXT_PUBLIC_EXPENSE_API_ENDPOINT,
    V1_NEXT_PUBLIC_USER_API_ENDPOINT: process.env.V1_NEXT_PUBLIC_USER_API_ENDPOINT,
    V1_NEXT_PUBLIC_AUTH_API_ENDPOINT: process.env.V1_NEXT_PUBLIC_AUTH_API_ENDPOINT,
  }
}

module.exports = nextConfig