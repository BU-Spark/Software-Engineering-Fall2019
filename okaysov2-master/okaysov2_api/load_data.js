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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var axios_1 = require("axios");
var querystring_1 = require("querystring");
var index_1 = require("./generated/prisma-client/index");
function createUser() {
    return __awaiter(this, void 0, void 0, function () {
        var url, requestBody, config;
        return __generator(this, function (_a) {
            try {
                url = "http://localhost:3000/api/signup";
                requestBody = { lname: "doe", fname: "jon", email: "jondoe@gmail.com", psw: "nohacks" };
                config = {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                };
                axios_1["default"].post(url, querystring_1.stringify(requestBody), config)
                    .then(function (result) {
                    // Do somthing
                })["catch"](function (err) {
                    // Do somthing
                });
            }
            catch (_b) {
                console.log("Err");
            }
            return [2 /*return*/];
        });
    });
}
function createQuestion() {
    return __awaiter(this, void 0, void 0, function () {
        var queston, queston2, queston3, queston4, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, index_1.prisma.createQuestion({
                            expertGroup: { create: { name: "Example Expert Group" } },
                            isPrivate: false,
                            key: "A key",
                            questionContent: "I've been struggling recently with...react native ",
                            userID: { connect: { email: "jondoe@gmail.com" } }
                        })];
                case 1:
                    queston = _a.sent();
                    return [4 /*yield*/, index_1.prisma.createQuestion({
                            expertGroup: { create: { name: "Example Expert Group" } },
                            isPrivate: false,
                            key: "A key",
                            questionContent: "How can I know if someone likes my code?",
                            userID: { connect: { email: "jondoe@gmail.com" } }
                        })];
                case 2:
                    queston2 = _a.sent();
                    return [4 /*yield*/, index_1.prisma.createQuestion({
                            expertGroup: { create: { name: "Example Expert Group" } },
                            isPrivate: false,
                            key: "A key",
                            questionContent: "I have been struggling recently....",
                            userID: { connect: { email: "jondoe@gmail.com" } }
                        })];
                case 3:
                    queston3 = _a.sent();
                    return [4 /*yield*/, index_1.prisma.createQuestion({
                            expertGroup: { create: { name: "Example Expert Group" } },
                            isPrivate: false,
                            key: "A key",
                            questionContent: "I wonder if my code has become selfaware",
                            userID: { connect: { email: "jondoe@gmail.com" } }
                        })];
                case 4:
                    queston4 = _a.sent();
                    return [3 /*break*/, 6];
                case 5:
                    err_1 = _a.sent();
                    console.log(err_1);
                    console.log("Error creating example data, please try again");
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
console.log(createUser());
console.log(createQuestion());
