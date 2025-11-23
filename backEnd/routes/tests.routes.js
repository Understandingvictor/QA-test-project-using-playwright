import express from "express"
import {
  ecommerceE2E,
  testing,
  triggerE2E,
  callbackE2E,
} from "../contollers/test.controllers.js";
const route = express.Router()


/**
 * @swagger
 * tags:
 *   name: END2ENDTESTS
 *   description: for  end2end tests
 */

/**
 * @swagger
 * /ecommerceEnd2End:
 *   get:
 *     summary: visit an ecommerce website add to cart and checkout test
 *     tags: [END2ENDTESTS]
 *     responses:
 *       200:
 *         description: this test visits a demo ecommerce site adds products to cart and checks out.
 */

route.get("/ecommerceEnd2End", ecommerceE2E);

/**
 * @swagger
 * /testing:
 *   get:
 *     summary: test
 *     tags: [END2ENDTESTS]
 *     responses:
 *       200:
 *         description: testing out things
 */

route.get("/testing", testing);


/**
 * @swagger
 * /triggerE2E:
 *   post:
 *     summary: triggers end point to send request to ci in actions
 *     tags: [END2ENDTESTS]
 *     responses:
 *       202:
 *         description: User created successfully
 *       500:
 *          description: Failed to dispatch to GitHub (e.g., GITHUB_PAT is invalid).
 */
route.post("/triggerE2E", triggerE2E);


route.post('/api/v1/results/callbackEndpoint', callbackE2E); // This is the new secured endpoint

export default route;