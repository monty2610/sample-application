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
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_datasource_rest_1 = require("apollo-datasource-rest");
class BlogsAPI extends apollo_datasource_rest_1.RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://localhost:3200/';
    }
    fetchAllBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.get(`blogs`);
        });
    }
    fetchBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.get(`blogs/${id}`);
        });
    }
    deleteBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.delete(`blogs/${id}`);
        });
    }
    createBlog(blog) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, content } = blog;
            const data = yield this.post('blogs', { title, content });
            return data;
        });
    }
    updateBlog(blog) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, title, content } = blog;
            const data = yield this.put(`blogs/${id}`, { title, content });
            return data;
        });
    }
}
exports.default = BlogsAPI;
