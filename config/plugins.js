module.exports = ({ env }) => ({
  // "google-auth": {
  //   enabled: true,
  // },

  "fuzzy-search": {
    enabled: true,
    config: {
      contentTypes: [
        {
          uid: "api::product.product",
          modelName: "product",
          transliterate: true,
          fuzzysortOptions: {
            characterLimit: 300,
            threshold: -600,
            limit: 10,
            keys: [
              {
                name: "title",
                weight: 100,
              },
              {
                name: "description",
                weight: -100,
              },
            ],
          },
        },
        {
          uid: "api::variant.variant",
          modelName: "variant",
          fuzzysortOptions: {
            characterLimit: 500,
            keys: [
              {
                name: "size",
                weight: 200,
              },
              {
                name: "description",
                weight: -200,
              },
            ],
          },
        },
      ],
    },
  },
  "import-export-entries": {
    enabled: true,
  },
  "strapi-paypal": {
    enabled: true,
    config: {
      paypalSandBoxUrl:
        env("PAYPAL_SANDBOX_API_URL") || "https://api-m.sandbox.paypal.com",
      paypalLiveUrl: env("PAYPAL_LIVE_API_URL") || "https://api-m.paypal.com",
    },
  },
  sitemap: {
    enabled: true,
    config: {
      autoGenerate: true,
      allowedFields: ["id", "uid"],
      excludedTypes: [],
    },
  },
  seo: {
    enabled: true,
  },
  "users-permissions": {
    config: {
      jwtSecret: env("JWT_SECRET"),
    },
  },
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME"),
        api_key: env("CLOUDINARY_KEY"),
        api_secret: env("CLOUDINARY_SECRET"),
      },
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },
});
