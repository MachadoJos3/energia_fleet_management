import cron from "node-cron";
import { checkTireWear } from "./tireService";

cron.schedule("0 8 * * *", async () => {
  console.log("🔔 Verificando desgaste de pneus...");
  const notifications = await checkTireWear();
  notifications.forEach((n) => console.log(n));
});
