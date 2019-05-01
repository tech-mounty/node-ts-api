import { HttpServer } from "./httpServer";
import { Server, RequestHandler } from "restify";
import * as restify from "restify";

export class ApiServer implements HttpServer{
    private server: Server;

    get(url: string, requestHandler: RequestHandler): void {
        this.addRoute('get', url, requestHandler);
    }    
    
    post(url: string, requestHandler: RequestHandler): void {
        this.addRoute('post', url, requestHandler);
    }

    put(url: string, requestHandler: RequestHandler): void {
        this.addRoute('put', url, requestHandler);
    }

    delete(url: string, requestHandler: RequestHandler): void {
        this.addRoute('del', url, requestHandler);
    }

    private addRoute(method: 'get' | 'post' | 'put' | 'del', url: string, requestHandler: RequestHandler) : void {
        this.server[method](url, async (req, res, next) => {
            try {
                await requestHandler(req, res, next);
            } catch (err) {
                res.send(500,'Oops, ship wrecked !');
            }
        });
    }

    public start(port: number): void {
        this.server = restify.createServer();

        // Register Middlewares and Plugins
        this.server.use(restify.plugins.queryParser());
        this.server.use(restify.plugins.bodyParser());

        this.server.listen(port, () => console.log(`Server is running on PORT ${port}`));
    }
}