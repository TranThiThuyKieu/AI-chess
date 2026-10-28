import type { Middleware } from "@reduxjs/toolkit";

export const socketMiddleware: Middleware = () => (next) => (action: any) => {
    return next(action);
};
