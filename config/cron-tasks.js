module.exports = {
  myJob: {
    task: async ({ strapi }) => {
      console.log("Task is running....");

      try {
        const variants = await strapi.db
          .query("api::variant.variant")
          .findMany({
            populate: { images: true, product: true },
          });
        // console.log(variants);
        const testCollectionData = [];

        // Iterate through variants and create data for the test collection
        for (const variant of variants) {
          console.log("Current Variant:", variant);

          if (variant.product) {
            console.log("Product of Variant:", variant.product);

            const testEntry = {
              title: variant.product.title,
              desc: variant.product.desc,
              category: variant.product.category,
              color: variant.color,
              cron_images: variant.images,
              size: variant.size ?? [],
              price: variant.price,
              sellPrice: variant.sellPrice,
              discount: variant.discount,
              slug: variant.product.slug,
              availableQty: variant.availableQty,
              shipping_price: variant.shipping_price,
            };

            testCollectionData.push(testEntry);
          } else {
            console.log("Product property is undefined for variant:", variant);
          }
        }

        // Create entries in the test collection
        await strapi.db
          .query("api::test.test")
          .createMany({ data: testCollectionData });

        console.log("Test collection entries created.");
      } catch (error) {
        console.error("Error:", error);
      }
    },
    options: {
      rule: "2 * * * * *", // Change the schedule as needed
      tz: "Asia/Dhaka",
    },
  },
};
