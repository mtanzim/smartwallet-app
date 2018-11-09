# Documentation of Code Challenges

## Challenge 1: SmartWallet - Add a type interface for typeOrm config

Steps taken:

- Create a module with the TypeOrmConfig interface
  - Import required d.ts modules: BaseConnectionOptions, DatabaseType, LoggerOptions
  - Extend base connections to maintain alignment of strings to required connection config types
- Ensure ```config``` for ```BackendMiddleware``` is created properly in store.ts
- ```BackendMiddleware``` class's ```storageLib``` constructor argument must adhere to type ```ConnectionOptions```. Instead of modifying a d.ts file where this type is defined, type overloading was used

## Challenge 2: SmartWallet - Add a test for SSO actions

Steps taken:

- Create new test folder for SSO actions
- Within the new file, import required type interfaces, actions
- Define intiial state for the reducer, and create a mock store, passing in redux-thunk for potential async testing
- Define a test which attempts to set credentials request
- Above is a synchronous action, therefore basic readback testing is employed on the action type, and action value
- Async action testing can be performed by passing in redux-thunk's dispatch, state, and middleware(s) to the action creator
- The action creator will return a Promise, who's resolved value can be checked with jest async testing
- An example of async testing can be found in: `smartwallet-app\tests\actions\registration\index.test.ts`
- `createIdentity` describe block is a great example of jest async testing on redux actions

Test Output

```
>jest actions/sso/index.test.ts
 PASS  tests\actions\sso\index.test.ts (6.477s)
  SSO action creators
    √ attempts to set credentials request (4ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        9.484s
Ran all test suites matching /actions\\sso\\index.test.ts/i.
```