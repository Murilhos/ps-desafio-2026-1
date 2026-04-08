/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [process.env.NEXT_PUBLIC_API_DOMAIN, 'via.placeholder.com', 'picsum.photos', 'localhost'],
  },
}

export default nextConfig

/*
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '/**',
      },
      // Liberar o domínio do backend caso ele usar HTTPS 
      {
        protocol: 'https',
        hostname: '**', 
      },
      // Liberar o localhost caso o backend esteja rodando localmente
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/**',
      },
    ],
  },
};
  */