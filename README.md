# Proto for Vercel Node APIs

[![npm](https://badgen.net/npm/v/@peterjskaltsis/proto)](https://www.npmjs.com/package/@peterjskaltsis/proto)

This is a super-simple (not production ready) method/middleware routing layer designed for running [Node.js](https://nodejs.org/api/http.html) APIs with [Vercel](https://vercel.com/).

Example repositories:

- [Inv-noice API](https://www.github.com/peterjskaltsis/inv-noice/)
- [Vercel Node.js API](https://www.github.com/peterjskaltsis/experiment-node-vercel/)

This can probably also be used with [Next.js](https://nextjs.org/) too.

## Installation

```bash
npm install @peterjskaltsis/proto
// or
yarn add @peterjskaltsis/proto
```

## Usage

`proto` allows you to define functions to be called for different HTTP methods on a single endpoint, in a clean and simple way.

```javascript
// api/index.js
import proto from '@peterjskaltsis/proto'

const router = proto()

router.get((req, res) => {
  res.send('Hello there!')
})
  
router.post((req, res) => {
  res.json({ hello: 'there!' })
})

router.put(async (req, res) => {
  res.end('async/await enabled')
})

router.patch(async (req, res) => {
  throw new Error('Errors can be caught and handled.')
})

export default router
```

## Contributing

Please see my [contributing.md](CONTRIBUTING.md).

## License

[MIT](LICENSE)
