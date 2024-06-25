import { register } from "node:module";

import { TediousInstrumentation } from "@opentelemetry/instrumentation-tedious";
import { NodeSDK, tracing } from "@opentelemetry/sdk-node";

register("@opentelemetry/instrumentation/hook.mjs", import.meta.url);

const otClient = new NodeSDK({
  serviceName: "kysely-ot",
  traceExporter: new tracing.ConsoleSpanExporter(),
  instrumentations: [new TediousInstrumentation()],
});

otClient.start();

process.on("SIGINT", async () => {
  await otClient.shutdown();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await otClient.shutdown();
  process.exit(0);
});
