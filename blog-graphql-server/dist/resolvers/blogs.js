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
const blogResolvers = {
    Query: {
        blogs: (parent, {}, { dataSources }) => __awaiter(void 0, void 0, void 0, function* () {
            return dataSources.blogsAPI.fetchAllBlogs();
        }),
        blog: (parent, { id }, { dataSources }) => {
            return dataSources.blogsAPI.fetchBlogById(id);
        },
    },
    Mutation: {
        createBlog: (parent, args, { dataSources }) => __awaiter(void 0, void 0, void 0, function* () {
            return dataSources.blogsAPI.createBlog(args.blogPost);
        }),
        updateBlog: (parent, args, { dataSources }) => __awaiter(void 0, void 0, void 0, function* () {
            return dataSources.blogsAPI.updateBlog(args.blogPost);
        }),
        deleteBlog: (parent, args, { dataSources }) => __awaiter(void 0, void 0, void 0, function* () {
            return dataSources.blogsAPI.deleteBlog(args.id);
        }),
    },
};
exports.default = blogResolvers;
