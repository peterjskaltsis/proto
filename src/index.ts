/**
 * @module Proto Router
 * @summary The proto router, designed for request type serverless routing.
 */

import { NowRequest, NowResponse } from '@vercel/node'

/**
 * Return 405 status for unallowed method.
 * @param req 
 * @param res 
 */
export function unallowedMethod(req: NowRequest, res: NowResponse) {
  return res.status(405).send(`Not found - ${req.method} ${req.url}`)
}

/**
 * Defines a HTTP method and how it's handled.
 */
interface Handler {
  method: string
  fn: Function
}

/**
 * Returns the main Proto router function.
 */
export default function () {
  // The handlers/methods list.
  var handlers: Handler[] = []

  // Call the function that returns the endpoint.
  function callFunc(f: Function) {
    // Return the appropriate endpoint.
    return function (req: NowRequest, res: NowResponse) {
      // Match the method that's being queried with a defined .get/.post function.
      const fnc = handlers.find(handler => handler.method === req.method)
      if (fnc) {
        return fnc.fn.apply(router, [req, res])
      } else {
        // The method has not been defined/is not allowed.
        unallowedMethod(req, res)
      }
    }
  }

  // Add a method to the handlers/methods list.
  function add(method: string, fn: Function) {
    return handlers.push({ method, fn })
  }

  // Define HTTP methods.
  router.get = (f: Function) => add('GET', f)
  router.post = (f: Function) => add('POST', f)
  router.patch = (f: Function) => add('PATCH', f)
  router.put = (f: Function) => add('PUT', f)
  router.delete = (f: Function) => add('DELETE', f)
  router.unallowed = (f: Function) => add('UNALLOWED', f)

  // The router object.
  function router(req: NowRequest, res: NowResponse) {
    return callFunc(router.unallowed).apply(router, [req, res])
  }

  return router
}
