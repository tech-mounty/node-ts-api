import { ApiServer } from "./server/server";

const server = new ApiServer();
server.start(+process.env.PORT || 3000);