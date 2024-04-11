import router from "./routes.js";


export default (app) => {
    app.use('/', router);
};