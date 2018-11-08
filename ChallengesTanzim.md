# Documentation of Code Challenges

## Challenge 1: SmartWallet - Add a type interface for typeOrm config

Steps taken:

- Create a module with the [TypeOrmConfig interface](.\src\TypeOrmConfig.ts)
  - Import required d.ts modules: BaseConnectionOptions, DatabaseType, LoggerOptions
  - Extend base connections to maintain alignment of strings to required connection config types
- Ensure ```config``` for [```BackendMiddleware```](.\src\backendMiddleware.ts) is created properly in [store.ts](.\src\store.ts)
- ```BackendMiddleware``` class's ```storageLib``` constructor argument must adhere to type ```ConnectionOptions```. Instead of modifying a d.ts file where this type is defined, type overloading was used