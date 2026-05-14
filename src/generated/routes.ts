/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserController } from './../modules/users/controllers/user.controller.js';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserMissionController } from './../modules/user_missions/controllers/user_mission.controller.js';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { StoreController } from './../modules/stores/controllers/store.controller.js';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { StoreReviewController } from './../modules/reviews/controllers/review.controller.js';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MyReviewController } from './../modules/reviews/controllers/review.controller.js';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MissionController } from './../modules/missions/controllers/mission.controller.js';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "UserSignUpResponse": {
        "dataType": "refObject",
        "properties": {
            "userId": {"dataType":"double","required":true},
            "preferences": {"dataType":"array","array":{"dataType":"string"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_UserSignUpResponse_": {
        "dataType": "refObject",
        "properties": {
            "resultType": {"dataType":"enum","enums":["SUCCESS"],"required":true},
            "error": {"dataType":"enum","enums":[null],"required":true},
            "data": {"ref":"UserSignUpResponse","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserSignUpRequest": {
        "dataType": "refObject",
        "properties": {
            "email": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "gender": {"dataType":"string","required":true},
            "birth": {"dataType":"datetime","required":true},
            "address": {"dataType":"string"},
            "detailAddress": {"dataType":"string"},
            "phoneNumber": {"dataType":"string","required":true},
            "preferences": {"dataType":"array","array":{"dataType":"double"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_string_": {
        "dataType": "refObject",
        "properties": {
            "resultType": {"dataType":"enum","enums":["SUCCESS"],"required":true},
            "error": {"dataType":"enum","enums":[null],"required":true},
            "data": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserMissionCreateResponse": {
        "dataType": "refObject",
        "properties": {
            "user_mission_id": {"dataType":"double","required":true},
            "status": {"dataType":"string","required":true},
            "created_at": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_UserMissionCreateResponse_": {
        "dataType": "refObject",
        "properties": {
            "resultType": {"dataType":"enum","enums":["SUCCESS"],"required":true},
            "error": {"dataType":"enum","enums":[null],"required":true},
            "data": {"ref":"UserMissionCreateResponse","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "InProgressUserMissionListResponse": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"mission":{"dataType":"nestedObjectLiteral","nestedProperties":{"store":{"dataType":"nestedObjectLiteral","nestedProperties":{"name":{"dataType":"string","required":true},"storeId":{"dataType":"double","required":true}},"required":true},"deadline":{"dataType":"datetime","required":true},"point":{"dataType":"double","required":true},"content":{"dataType":"string","required":true},"title":{"dataType":"string","required":true},"missionId":{"dataType":"double","required":true}},"required":true},"createdAt":{"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},"status":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},"userMissionId":{"dataType":"double","required":true}}},"required":true},
            "pagination": {"dataType":"nestedObjectLiteral","nestedProperties":{"cursor":{"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_InProgressUserMissionListResponse_": {
        "dataType": "refObject",
        "properties": {
            "resultType": {"dataType":"enum","enums":["SUCCESS"],"required":true},
            "error": {"dataType":"enum","enums":[null],"required":true},
            "data": {"ref":"InProgressUserMissionListResponse","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CompletedUserMissionResponse": {
        "dataType": "refObject",
        "properties": {
            "user_mission_id": {"dataType":"double","required":true},
            "status": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "created_at": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_CompletedUserMissionResponse_": {
        "dataType": "refObject",
        "properties": {
            "resultType": {"dataType":"enum","enums":["SUCCESS"],"required":true},
            "error": {"dataType":"enum","enums":[null],"required":true},
            "data": {"ref":"CompletedUserMissionResponse","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "StoreCreateResponse": {
        "dataType": "refObject",
        "properties": {
            "store_id": {"dataType":"double","required":true},
            "created_at": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_StoreCreateResponse_": {
        "dataType": "refObject",
        "properties": {
            "resultType": {"dataType":"enum","enums":["SUCCESS"],"required":true},
            "error": {"dataType":"enum","enums":[null],"required":true},
            "data": {"ref":"StoreCreateResponse","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateStoreRequest": {
        "dataType": "refObject",
        "properties": {
            "category_id": {"dataType":"double","required":true},
            "name": {"dataType":"string","required":true},
            "address": {"dataType":"string","required":true},
            "status": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReviewCreateResponse": {
        "dataType": "refObject",
        "properties": {
            "reviewId": {"dataType":"double","required":true},
            "createdAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_ReviewCreateResponse_": {
        "dataType": "refObject",
        "properties": {
            "resultType": {"dataType":"enum","enums":["SUCCESS"],"required":true},
            "error": {"dataType":"enum","enums":[null],"required":true},
            "data": {"ref":"ReviewCreateResponse","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateReviewRequest": {
        "dataType": "refObject",
        "properties": {
            "score": {"dataType":"double","required":true},
            "content": {"dataType":"string","required":true},
            "review_images": {"dataType":"array","array":{"dataType":"string"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReviewItem": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "content": {"dataType":"string","required":true},
            "score": {"dataType":"double","required":true},
            "user": {"dataType":"nestedObjectLiteral","nestedProperties":{"name":{"dataType":"string","required":true}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReviewListResponse": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"ReviewItem"},"required":true},
            "pagination": {"dataType":"nestedObjectLiteral","nestedProperties":{"cursor":{"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_ReviewListResponse_": {
        "dataType": "refObject",
        "properties": {
            "resultType": {"dataType":"enum","enums":["SUCCESS"],"required":true},
            "error": {"dataType":"enum","enums":[null],"required":true},
            "data": {"ref":"ReviewListResponse","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MyReviewListResponse": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"images":{"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"imageUrl":{"dataType":"string","required":true},"imageId":{"dataType":"double","required":true}}},"required":true},"store":{"dataType":"nestedObjectLiteral","nestedProperties":{"name":{"dataType":"string","required":true},"storeId":{"dataType":"double","required":true}},"required":true},"createdAt":{"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},"score":{"dataType":"double","required":true},"content":{"dataType":"string","required":true},"reviewId":{"dataType":"double","required":true}}},"required":true},
            "pagination": {"dataType":"nestedObjectLiteral","nestedProperties":{"cursor":{"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_MyReviewListResponse_": {
        "dataType": "refObject",
        "properties": {
            "resultType": {"dataType":"enum","enums":["SUCCESS"],"required":true},
            "error": {"dataType":"enum","enums":[null],"required":true},
            "data": {"ref":"MyReviewListResponse","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MissionCreateResponse": {
        "dataType": "refObject",
        "properties": {
            "mission_id": {"dataType":"double","required":true},
            "created_at": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_MissionCreateResponse_": {
        "dataType": "refObject",
        "properties": {
            "resultType": {"dataType":"enum","enums":["SUCCESS"],"required":true},
            "error": {"dataType":"enum","enums":[null],"required":true},
            "data": {"ref":"MissionCreateResponse","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateMissionRequest": {
        "dataType": "refObject",
        "properties": {
            "title": {"dataType":"string","required":true},
            "content": {"dataType":"string","required":true},
            "point": {"dataType":"double","required":true},
            "deadline": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MissionListResponse": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"createdAt":{"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},"deadline":{"dataType":"datetime","required":true},"point":{"dataType":"double","required":true},"content":{"dataType":"string","required":true},"title":{"dataType":"string","required":true},"missionId":{"dataType":"double","required":true}}},"required":true},
            "pagination": {"dataType":"nestedObjectLiteral","nestedProperties":{"cursor":{"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_MissionListResponse_": {
        "dataType": "refObject",
        "properties": {
            "resultType": {"dataType":"enum","enums":["SUCCESS"],"required":true},
            "error": {"dataType":"enum","enums":[null],"required":true},
            "data": {"ref":"MissionListResponse","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsUserController_handleUserSignUp: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"UserSignUpRequest"},
        };
        app.post('/users/signup',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.handleUserSignUp)),

            async function UserController_handleUserSignUp(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_handleUserSignUp, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'handleUserSignUp',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_handleGuestPage: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/users/guest',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.handleGuestPage)),

            async function UserController_handleGuestPage(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_handleGuestPage, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'handleGuestPage',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_handleLoginPage: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/users/login',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.handleLoginPage)),

            async function UserController_handleLoginPage(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_handleLoginPage, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'handleLoginPage',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_handleMypage: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.get('/users/mypage',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.handleMypage)),

            async function UserController_handleMypage(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_handleMypage, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'handleMypage',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_handleSetLogin: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.get('/users/set-login',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.handleSetLogin)),

            async function UserController_handleSetLogin(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_handleSetLogin, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'handleSetLogin',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_handleSetLogout: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.get('/users/set-logout',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.handleSetLogout)),

            async function UserController_handleSetLogout(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_handleSetLogout, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'handleSetLogout',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserMissionController_handleCreateUserMission: Record<string, TsoaRoute.ParameterSchema> = {
                userId: {"in":"path","name":"userId","required":true,"dataType":"double"},
                missionId: {"in":"path","name":"missionId","required":true,"dataType":"double"},
        };
        app.post('/users/:userId/missions/:missionId',
            ...(fetchMiddlewares<RequestHandler>(UserMissionController)),
            ...(fetchMiddlewares<RequestHandler>(UserMissionController.prototype.handleCreateUserMission)),

            async function UserMissionController_handleCreateUserMission(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserMissionController_handleCreateUserMission, request, response });

                const controller = new UserMissionController();

              await templateService.apiHandler({
                methodName: 'handleCreateUserMission',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserMissionController_handleListInProgressUserMissions: Record<string, TsoaRoute.ParameterSchema> = {
                userId: {"in":"path","name":"userId","required":true,"dataType":"double"},
                cursor: {"default":0,"in":"query","name":"cursor","dataType":"double"},
        };
        app.get('/users/:userId/missions/in-progress',
            ...(fetchMiddlewares<RequestHandler>(UserMissionController)),
            ...(fetchMiddlewares<RequestHandler>(UserMissionController.prototype.handleListInProgressUserMissions)),

            async function UserMissionController_handleListInProgressUserMissions(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserMissionController_handleListInProgressUserMissions, request, response });

                const controller = new UserMissionController();

              await templateService.apiHandler({
                methodName: 'handleListInProgressUserMissions',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserMissionController_handleCompleteUserMission: Record<string, TsoaRoute.ParameterSchema> = {
                userId: {"in":"path","name":"userId","required":true,"dataType":"double"},
                missionId: {"in":"path","name":"missionId","required":true,"dataType":"double"},
        };
        app.patch('/users/:userId/missions/:missionId/complete',
            ...(fetchMiddlewares<RequestHandler>(UserMissionController)),
            ...(fetchMiddlewares<RequestHandler>(UserMissionController.prototype.handleCompleteUserMission)),

            async function UserMissionController_handleCompleteUserMission(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserMissionController_handleCompleteUserMission, request, response });

                const controller = new UserMissionController();

              await templateService.apiHandler({
                methodName: 'handleCompleteUserMission',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsStoreController_handleCreateStore: Record<string, TsoaRoute.ParameterSchema> = {
                regionId: {"in":"path","name":"regionId","required":true,"dataType":"double"},
                body: {"in":"body","name":"body","required":true,"ref":"CreateStoreRequest"},
        };
        app.post('/regions/:regionId/stores',
            ...(fetchMiddlewares<RequestHandler>(StoreController)),
            ...(fetchMiddlewares<RequestHandler>(StoreController.prototype.handleCreateStore)),

            async function StoreController_handleCreateStore(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsStoreController_handleCreateStore, request, response });

                const controller = new StoreController();

              await templateService.apiHandler({
                methodName: 'handleCreateStore',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsStoreReviewController_handleCreateReview: Record<string, TsoaRoute.ParameterSchema> = {
                storeId: {"in":"path","name":"storeId","required":true,"dataType":"double"},
                body: {"in":"body","name":"body","required":true,"ref":"CreateReviewRequest"},
        };
        app.post('/stores/:storeId/reviews',
            ...(fetchMiddlewares<RequestHandler>(StoreReviewController)),
            ...(fetchMiddlewares<RequestHandler>(StoreReviewController.prototype.handleCreateReview)),

            async function StoreReviewController_handleCreateReview(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsStoreReviewController_handleCreateReview, request, response });

                const controller = new StoreReviewController();

              await templateService.apiHandler({
                methodName: 'handleCreateReview',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsStoreReviewController_handleListStoreReviews: Record<string, TsoaRoute.ParameterSchema> = {
                storeId: {"in":"path","name":"storeId","required":true,"dataType":"double"},
                cursor: {"default":0,"in":"query","name":"cursor","dataType":"double"},
        };
        app.get('/stores/:storeId/reviews',
            ...(fetchMiddlewares<RequestHandler>(StoreReviewController)),
            ...(fetchMiddlewares<RequestHandler>(StoreReviewController.prototype.handleListStoreReviews)),

            async function StoreReviewController_handleListStoreReviews(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsStoreReviewController_handleListStoreReviews, request, response });

                const controller = new StoreReviewController();

              await templateService.apiHandler({
                methodName: 'handleListStoreReviews',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMyReviewController_handleListMyReviews: Record<string, TsoaRoute.ParameterSchema> = {
                userId: {"in":"path","name":"userId","required":true,"dataType":"double"},
                cursor: {"default":0,"in":"query","name":"cursor","dataType":"double"},
        };
        app.get('/users/:userId/reviews',
            ...(fetchMiddlewares<RequestHandler>(MyReviewController)),
            ...(fetchMiddlewares<RequestHandler>(MyReviewController.prototype.handleListMyReviews)),

            async function MyReviewController_handleListMyReviews(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMyReviewController_handleListMyReviews, request, response });

                const controller = new MyReviewController();

              await templateService.apiHandler({
                methodName: 'handleListMyReviews',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMissionController_handleCreateMission: Record<string, TsoaRoute.ParameterSchema> = {
                storeId: {"in":"path","name":"storeId","required":true,"dataType":"double"},
                body: {"in":"body","name":"body","required":true,"ref":"CreateMissionRequest"},
        };
        app.post('/stores/:storeId/missions',
            ...(fetchMiddlewares<RequestHandler>(MissionController)),
            ...(fetchMiddlewares<RequestHandler>(MissionController.prototype.handleCreateMission)),

            async function MissionController_handleCreateMission(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMissionController_handleCreateMission, request, response });

                const controller = new MissionController();

              await templateService.apiHandler({
                methodName: 'handleCreateMission',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMissionController_handleListStoreMissions: Record<string, TsoaRoute.ParameterSchema> = {
                storeId: {"in":"path","name":"storeId","required":true,"dataType":"double"},
                cursor: {"default":0,"in":"query","name":"cursor","dataType":"double"},
        };
        app.get('/stores/:storeId/missions',
            ...(fetchMiddlewares<RequestHandler>(MissionController)),
            ...(fetchMiddlewares<RequestHandler>(MissionController.prototype.handleListStoreMissions)),

            async function MissionController_handleListStoreMissions(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMissionController_handleListStoreMissions, request, response });

                const controller = new MissionController();

              await templateService.apiHandler({
                methodName: 'handleListStoreMissions',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
