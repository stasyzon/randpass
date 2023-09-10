import { getServerSideSitemap } from 'next-sitemap'
import {parseUrlToDomain} from '@/lib/utils'

export async function GET(request: Request) {
  return getServerSideSitemap([
    {
      loc: `https://${parseUrlToDomain(request.url)}`,
      lastmod: new Date().toISOString(),
    }
  ])
}