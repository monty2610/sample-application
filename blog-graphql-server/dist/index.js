"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const apollo_server_1 = require("apollo-server");
const schemas_1 = __importDefault(require("./schemas"));
const resolvers_1 = __importDefault(require("./resolvers"));
const Blog_1 = __importDefault(require("./dataSources/Blog"));
exports.server = new apollo_server_1.ApolloServer({
    typeDefs: schemas_1.default,
    resolvers: resolvers_1.default,
    dataSources: () => ({
        blogsAPI: new Blog_1.default(),
    }),
});
exports.server.listen().then(({ url }) => {
    console.log(`server ready on ${url}`);
});
