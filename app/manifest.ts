import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'RandPass - password generator',
    short_name: 'RandPass',
    description: 'A secure and customizable password generator. Create passwords with variable length, special symbols, and more.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#171717'
  }
}