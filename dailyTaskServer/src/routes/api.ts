import express from 'express';

async function createAPIRouter() {
  const api = express.Router();
  // TODO try to move graphql to express.Router()
  return api;
}

export default createAPIRouter;
