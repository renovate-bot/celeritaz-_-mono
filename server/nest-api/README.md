
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ pnpm install
```

## Importing Files in the Project
### Adding .js Extension to the Filename for Imports
```typescript
// Normally, we import files like this:
import file from 'file';

// However, in this project, we import files as follows since the project uses the ESM module.
// Therefore, we need to add the .js extension to the filename, even if the file is a .ts file.
// We don't need to do this in the tests.
import file from 'file.js';
```
### Importing Files Using an Alias
```typescript
// Normally, we import files like this if the file is in another directory:
import file from '../../file.js';

// However, in this project, we import files as follows using an alias:
import file from '~/directory/file.js';
```


## Running the app

```bash
# development
$ pnpm dev

# debug
$ pnpm debug

# build the app
$ pnpm build

# start the prod mode
$ pnpm start:prod
```

## Test

```bash
# All tests
$ pnpm test

# test watch
$ pnpm test:watch

# test ui
$ pnpm test:ui

# Unit tests
$ pnpm test:unit

# e2e tests
$ pnpm test:e2e

# test coverage
$ pnpm test:cov
```
