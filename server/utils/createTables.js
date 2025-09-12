import { createUser } from "../models/userTable.js";
import { createOrderItemTable } from "../models/ordersItemsTable.js";
import { createOrdersTable } from "../models/ordersTable.js";
import { createPaymentsTable } from "../models/paymentsTable.js";
import { createProductsTable } from "../models/productsTable.js";
import { createShippingInfoTable } from "../models/shippinginfoTable.js";
import { createProductReviewsTable } from "../models/productReviewsTable.js";

export const createAllTables = async () => {
  try {
    await createUser();
    await createProductsTable();
    await createOrdersTable();
    await createOrderItemTable();
    await createPaymentsTable();
    await createShippingInfoTable();
    await createProductReviewsTable();
    console.log("✅ All tables created successfully!");
  } catch (error) {
    console.error("❌ Error creating tables:", error);
  } finally {
    process.exit();
  }
};
