import withBundleAnalyzer from '@next/bundle-analyzer';

const config = {
    experimental: {},
};

export default withBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
})(config);