/** @type {import('next').NextConfig} */
const nextConfig = {
  /* kept.study is the canonical host. Both it and www.kept.study are attached to
     the Vercel project, so without this every page is reachable at two hostnames.
     The canonical/OG tags already point at the apex via NEXT_PUBLIC_SITE_URL, but
     a 308 keeps the duplicate host from being crawled or shared at all.

     This lives here rather than in Vercel's per-domain redirect setting so the
     rule is in the repo and survives a project being re-created. Next compiles
     it into the routes manifest, so it runs at the edge, not in a function. */
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.kept.study" }],
        destination: "https://kept.study/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
