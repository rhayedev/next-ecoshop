import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withnextIntl = createNextIntlPlugin();

const config = {}

export default withnextIntl(config)