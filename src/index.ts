import { CronJob } from "cron";

import app from "./platforms/config/express";
import routes from "./routes";
import { update,notification } from "./scrape/scrape.controller";

app.use("/", routes);


app.listen(app.get("port"), "0.0.0.0", () => {
  console.log(`Server running at http://${app.get("host")}:${app.get("port")}`);
  const job = new CronJob(
    "0 */5 * * * *",
    function () {
        update();
    },
    null,
    true
  );
});

app.get("/notifications",async (req, res) => {
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders(); 
  
    const job = new CronJob(
      "0 */5 * * * *",
      async ()  =>{
           const notifications =  await  notification(req, res);
         res.write(`data: ${JSON.stringify({ notifications })}\n\n`); 
      },
      null,
      true
    );

    res.on("close", () => {
        job.stop();
        res.end();
        
      });
  });

export default app;
