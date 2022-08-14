# Smak Dat Krak 🐙
Simple cli app to calculate portfolio metrics that are actually useful from
your Kraken exchange portfolio.

## Context

I wanted to create a very lightweight and simple to use app that allows users
to see useful metrics for their crypto portfolio on the Kraken Exchange. These 
metrics include:
- DCA value
- Total profit / loss per token - at present, last 24 hours, last week
- Total profit / loss in portfolio - at present, last 24 hours, last week

## Set up

1. Create an API key for the Kraken REST API that has at miniumum the following
   permissions:
   - Query funds
   - Query open orders & trades
   - Query closed orders & trades
   - Query ledger entries
2. Create an `.env` file (using the `.env.local` file as a reference for the
  required keys) and paste in your Kraken API key and secret (from Step 1.)
3. Fill in your desired configuration in the `config.json` file
4. Run `npm run start`
5. lfg... profit 🚀 gn

### Generating types from the Kraken OpenAPI spec

If the Kraken OpenAPI changes in the future, just download the `openapi.json`
from their [REST API docs](kraken-docs) and run the command 
below:

```bash
npx openapi-typescript openapi.json --output src/types/schema.ts`
```

## Example

Put in a picture of the output here.

## Built With

- [typescript](https://www.typescriptlang.org/)
- [openapi-typescript](https://www.npmjs.com/package/openapi-typescript) to
auto generate types from the Kraken Openapi spec
- [chalk](https://www.npmjs.com/package/chalk)
- [cli-table-3](https://www.npmjs.com/package/cli-table3)
- [ora](https://www.npmjs.com/package/ora)

## References

- [Kraken REST API docs](kraken-docs)

<!-- MARKDOWN LINKS & IMAGES -->

[kraken-docs]: https://docs.kraken.com/rest
