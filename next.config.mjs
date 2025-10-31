import withBundleAnalyzer from '@next/bundle-analyzer';

const isAnalyze = process.env.ANALYZE === 'true';

const config = {
  // Désactive Turbopack si on analyse le bundle
  ...(isAnalyze && { experimental: { turbo: false } }),

};

export default withBundleAnalyzer({
  enabled: isAnalyze,
})(config);