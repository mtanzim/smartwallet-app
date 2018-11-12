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

## Challenge 5: Jolocom-lib - Remove some of the circular dependencies

Steps Taken

- Install Madge, and use it to find ciruclar dependencies
- The following command, and output was produced by Madge

```
>madge --extensions ts,tsx --circular ts/

Processed 43 files (1.2s) (18 warnings)

× Found 6 circular dependencies!

1) credentials/signedCredential/signedCredential.ts > registries/types.ts > identityWallet/identityWallet.ts
2) registries/types.ts > identityWallet/identityWallet.ts > identity/didDocument/didDocument.ts
3) credentials/signedCredential/signedCredential.ts > registries/types.ts > identityWallet/identityWallet.ts > identity/identity.ts
4) credentials/signedCredential/signedCredential.ts > registries/types.ts > identityWallet/identityWallet.ts > identity/identity.ts > identity/types.ts
5) credentials/signedCredential/signedCredential.ts > registries/types.ts > identityWallet/identityWallet.ts > interactionTokens/JSONWebToken.ts > interactionTokens/credentialResponse.ts
6) credentials/signedCredential/signedCredential.ts > registries/types.ts > identityWallet/identityWallet.ts > interactionTokens/JSONWebToken.ts > interactionTokens/credentialsReceive.ts
```

- The above circular dependencies were resolved by:
  - Pulling out interface `ISigner` into its own file
  - Updating the module import statements in
    - `jolocom-lib\ts\identity\didDocument\didDocument.ts`
    - `jolocom-lib\ts\credentials\signedCredential\signedCredential.ts`
- After the above modifications were applied, Madge produces the following output

```
>madge --extensions ts,tsx --circular ts/

Processed 43 files (1.3s) (18 warnings)

√ No circular dependency found!
```

- Please refer to the diff for additional details

## Challenge 3: SmartWallet - Make a whole element clickable, not just the icon

Steps Taken

- Due to development environment issues still preventing me from running the app, I made a guess as to how to solve this challenge
- Reading through the componenent tree, and the React Native documentation, I suspect the update is as follows:

`smartwallet-app\src\ui\home\components\credentialOverview.tsx`

```jsx
<Container style={{ padding: 0 }}>
  <TouchableOpacity style={qrCodeIconContainer} onPress={this.props.onScannerStart}>
    <ScrollView style={scrollComponent} contentContainerStyle={loading ? scrollComponentLoading : {}}>
      {claimCategories.map(this.renderCredentialCategory)}
    </ScrollView>
    <Block style={StyleSheet.flatten(qrCodeButtonSection)}>
        <Icon size={30} name="qrcode-scan" color="white" />
    </Block>
  </TouchableOpacity>
</Container>
```

- The `TouchableOpacity` React Native component was made to capture the `ScrollView` and the `Icon` components as opposed to simply the `Icon` element
  - The `ScrollView` componentns host the `CredentialCard` component through the component tree