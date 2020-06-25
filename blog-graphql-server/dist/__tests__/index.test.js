"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_testing_1 = require("apollo-server-testing");
const apollo_server_1 = require("apollo-server");
const schemas_1 = __importDefault(require("../schemas"));
const resolvers_1 = __importDefault(require("../resolvers"));
const Blog_1 = __importDefault(require("../dataSources/Blog"));
describe('Blogs queries', () => {
    let client;
    const blogsAPI = new Blog_1.default();
    beforeEach(() => {
        const server = new apollo_server_1.ApolloServer({
            typeDefs: schemas_1.default,
            resolvers: resolvers_1.default,
            dataSources: () => ({ blogsAPI }),
        });
        client = apollo_server_testing_1.createTestClient(server);
    });
    it('should return correct data for Blogs query', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockBlogs = [{ id: '1', title: 'title', content: 'content' }];
        blogsAPI.fetchAllBlogs = jest.fn().mockResolvedValue(mockBlogs);
        const { query } = client;
        const { data: { blogs }, } = yield query({
            query: apollo_server_1.gql `
        {
          blogs {
            id
            title
            content
          }
        }
      `,
        });
        expect(blogs).toEqual(mockBlogs);
    }));
    it('should return correct data for Blog query by Id', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockBlog = { id: '1', title: 'title', content: 'content' };
        blogsAPI.fetchBlogById = jest.fn().mockResolvedValue(mockBlog);
        const { query } = client;
        const { data: { blog }, } = yield query({
            query: apollo_server_1.gql `
        {
          blog(id: "1") {
            id
            title
            content
          }
        }
      `,
        });
        expect(blog).toEqual(mockBlog);
    }));
    it('should create a blog entry for createBlog mutation', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockBlog = { id: '1', title: 'title', content: 'content' };
        blogsAPI.createBlog = jest.fn().mockResolvedValue(mockBlog);
        const { mutate } = client;
        const { data: { createBlog }, } = yield mutate({
            mutation: apollo_server_1.gql `
        mutation {
          createBlog(blogPost: { title: "last post", content: "tin the series" }) {
            id
            title
            content
          }
        }
      `,
        });
        expect(createBlog).toEqual(mockBlog);
    }));
    it('should update a blog entry for updateBlog mutation', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockBlog = { id: '1', title: 'title' };
        blogsAPI.updateBlog = jest.fn().mockResolvedValue(mockBlog);
        const { mutate } = client;
        const response = yield mutate({
            mutation: apollo_server_1.gql `
        mutation {
          updateBlog(blogPost: { id: "1", title: "last post", content: "tin the series" }) {
            id
            title
          }
        }
      `,
        });
        const { data: { updateBlog }, } = response;
        expect(updateBlog).toEqual(mockBlog);
    }));
});
