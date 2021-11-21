"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var autocannon_1 = __importDefault(require("autocannon"));
autocannon_1.default({
    url: 'http://localhost:8000/user'
}, console.log);
