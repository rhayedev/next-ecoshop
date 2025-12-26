import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const config = {
    reactStrictMode: true,
};

export default withNextIntl(config);
