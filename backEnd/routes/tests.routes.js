import express from "express"
import { ecommerceE2E, testing } from "../contollers/test.controllers.js";
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

export default route;