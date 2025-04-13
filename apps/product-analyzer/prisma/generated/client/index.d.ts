
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Additive
 * 
 */
export type Additive = $Result.DefaultSelection<Prisma.$AdditivePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Additives
 * const additives = await prisma.additive.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Additives
   * const additives = await prisma.additive.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.additive`: Exposes CRUD operations for the **Additive** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Additives
    * const additives = await prisma.additive.findMany()
    * ```
    */
  get additive(): Prisma.AdditiveDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.5.0
   * Query Engine version: 173f8d54f8d52e692c7e27e72a88314ec7aeff60
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Additive: 'Additive'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "additive"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Additive: {
        payload: Prisma.$AdditivePayload<ExtArgs>
        fields: Prisma.AdditiveFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdditiveFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdditivePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdditiveFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdditivePayload>
          }
          findFirst: {
            args: Prisma.AdditiveFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdditivePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdditiveFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdditivePayload>
          }
          findMany: {
            args: Prisma.AdditiveFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdditivePayload>[]
          }
          create: {
            args: Prisma.AdditiveCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdditivePayload>
          }
          createMany: {
            args: Prisma.AdditiveCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AdditiveCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdditivePayload>[]
          }
          delete: {
            args: Prisma.AdditiveDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdditivePayload>
          }
          update: {
            args: Prisma.AdditiveUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdditivePayload>
          }
          deleteMany: {
            args: Prisma.AdditiveDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdditiveUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AdditiveUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdditivePayload>[]
          }
          upsert: {
            args: Prisma.AdditiveUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdditivePayload>
          }
          aggregate: {
            args: Prisma.AdditiveAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdditive>
          }
          groupBy: {
            args: Prisma.AdditiveGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdditiveGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdditiveCountArgs<ExtArgs>
            result: $Utils.Optional<AdditiveCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    additive?: AdditiveOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model Additive
   */

  export type AggregateAdditive = {
    _count: AdditiveCountAggregateOutputType | null
    _avg: AdditiveAvgAggregateOutputType | null
    _sum: AdditiveSumAggregateOutputType | null
    _min: AdditiveMinAggregateOutputType | null
    _max: AdditiveMaxAggregateOutputType | null
  }

  export type AdditiveAvgAggregateOutputType = {
    id: number | null
    danger: number | null
  }

  export type AdditiveSumAggregateOutputType = {
    id: number | null
    danger: number | null
  }

  export type AdditiveMinAggregateOutputType = {
    id: number | null
    code: string | null
    name: string | null
    danger: number | null
    description: string | null
    healthHarm: string | null
    healthBenefit: string | null
    usage: string | null
    legislation: string | null
    referenceUrl: string | null
  }

  export type AdditiveMaxAggregateOutputType = {
    id: number | null
    code: string | null
    name: string | null
    danger: number | null
    description: string | null
    healthHarm: string | null
    healthBenefit: string | null
    usage: string | null
    legislation: string | null
    referenceUrl: string | null
  }

  export type AdditiveCountAggregateOutputType = {
    id: number
    code: number
    name: number
    synonyms: number
    danger: number
    origins: number
    categories: number
    description: number
    healthHarm: number
    healthBenefit: number
    usage: number
    legislation: number
    referenceUrl: number
    _all: number
  }


  export type AdditiveAvgAggregateInputType = {
    id?: true
    danger?: true
  }

  export type AdditiveSumAggregateInputType = {
    id?: true
    danger?: true
  }

  export type AdditiveMinAggregateInputType = {
    id?: true
    code?: true
    name?: true
    danger?: true
    description?: true
    healthHarm?: true
    healthBenefit?: true
    usage?: true
    legislation?: true
    referenceUrl?: true
  }

  export type AdditiveMaxAggregateInputType = {
    id?: true
    code?: true
    name?: true
    danger?: true
    description?: true
    healthHarm?: true
    healthBenefit?: true
    usage?: true
    legislation?: true
    referenceUrl?: true
  }

  export type AdditiveCountAggregateInputType = {
    id?: true
    code?: true
    name?: true
    synonyms?: true
    danger?: true
    origins?: true
    categories?: true
    description?: true
    healthHarm?: true
    healthBenefit?: true
    usage?: true
    legislation?: true
    referenceUrl?: true
    _all?: true
  }

  export type AdditiveAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Additive to aggregate.
     */
    where?: AdditiveWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Additives to fetch.
     */
    orderBy?: AdditiveOrderByWithRelationInput | AdditiveOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdditiveWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Additives from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Additives.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Additives
    **/
    _count?: true | AdditiveCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AdditiveAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AdditiveSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdditiveMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdditiveMaxAggregateInputType
  }

  export type GetAdditiveAggregateType<T extends AdditiveAggregateArgs> = {
        [P in keyof T & keyof AggregateAdditive]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdditive[P]>
      : GetScalarType<T[P], AggregateAdditive[P]>
  }




  export type AdditiveGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdditiveWhereInput
    orderBy?: AdditiveOrderByWithAggregationInput | AdditiveOrderByWithAggregationInput[]
    by: AdditiveScalarFieldEnum[] | AdditiveScalarFieldEnum
    having?: AdditiveScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdditiveCountAggregateInputType | true
    _avg?: AdditiveAvgAggregateInputType
    _sum?: AdditiveSumAggregateInputType
    _min?: AdditiveMinAggregateInputType
    _max?: AdditiveMaxAggregateInputType
  }

  export type AdditiveGroupByOutputType = {
    id: number
    code: string
    name: string
    synonyms: string[]
    danger: number
    origins: string[]
    categories: string[]
    description: string
    healthHarm: string
    healthBenefit: string
    usage: string
    legislation: string | null
    referenceUrl: string
    _count: AdditiveCountAggregateOutputType | null
    _avg: AdditiveAvgAggregateOutputType | null
    _sum: AdditiveSumAggregateOutputType | null
    _min: AdditiveMinAggregateOutputType | null
    _max: AdditiveMaxAggregateOutputType | null
  }

  type GetAdditiveGroupByPayload<T extends AdditiveGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdditiveGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdditiveGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdditiveGroupByOutputType[P]>
            : GetScalarType<T[P], AdditiveGroupByOutputType[P]>
        }
      >
    >


  export type AdditiveSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    synonyms?: boolean
    danger?: boolean
    origins?: boolean
    categories?: boolean
    description?: boolean
    healthHarm?: boolean
    healthBenefit?: boolean
    usage?: boolean
    legislation?: boolean
    referenceUrl?: boolean
  }, ExtArgs["result"]["additive"]>

  export type AdditiveSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    synonyms?: boolean
    danger?: boolean
    origins?: boolean
    categories?: boolean
    description?: boolean
    healthHarm?: boolean
    healthBenefit?: boolean
    usage?: boolean
    legislation?: boolean
    referenceUrl?: boolean
  }, ExtArgs["result"]["additive"]>

  export type AdditiveSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    synonyms?: boolean
    danger?: boolean
    origins?: boolean
    categories?: boolean
    description?: boolean
    healthHarm?: boolean
    healthBenefit?: boolean
    usage?: boolean
    legislation?: boolean
    referenceUrl?: boolean
  }, ExtArgs["result"]["additive"]>

  export type AdditiveSelectScalar = {
    id?: boolean
    code?: boolean
    name?: boolean
    synonyms?: boolean
    danger?: boolean
    origins?: boolean
    categories?: boolean
    description?: boolean
    healthHarm?: boolean
    healthBenefit?: boolean
    usage?: boolean
    legislation?: boolean
    referenceUrl?: boolean
  }

  export type AdditiveOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "name" | "synonyms" | "danger" | "origins" | "categories" | "description" | "healthHarm" | "healthBenefit" | "usage" | "legislation" | "referenceUrl", ExtArgs["result"]["additive"]>

  export type $AdditivePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Additive"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      code: string
      name: string
      synonyms: string[]
      danger: number
      origins: string[]
      categories: string[]
      description: string
      healthHarm: string
      healthBenefit: string
      usage: string
      legislation: string | null
      referenceUrl: string
    }, ExtArgs["result"]["additive"]>
    composites: {}
  }

  type AdditiveGetPayload<S extends boolean | null | undefined | AdditiveDefaultArgs> = $Result.GetResult<Prisma.$AdditivePayload, S>

  type AdditiveCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AdditiveFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AdditiveCountAggregateInputType | true
    }

  export interface AdditiveDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Additive'], meta: { name: 'Additive' } }
    /**
     * Find zero or one Additive that matches the filter.
     * @param {AdditiveFindUniqueArgs} args - Arguments to find a Additive
     * @example
     * // Get one Additive
     * const additive = await prisma.additive.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdditiveFindUniqueArgs>(args: SelectSubset<T, AdditiveFindUniqueArgs<ExtArgs>>): Prisma__AdditiveClient<$Result.GetResult<Prisma.$AdditivePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Additive that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AdditiveFindUniqueOrThrowArgs} args - Arguments to find a Additive
     * @example
     * // Get one Additive
     * const additive = await prisma.additive.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdditiveFindUniqueOrThrowArgs>(args: SelectSubset<T, AdditiveFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdditiveClient<$Result.GetResult<Prisma.$AdditivePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Additive that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdditiveFindFirstArgs} args - Arguments to find a Additive
     * @example
     * // Get one Additive
     * const additive = await prisma.additive.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdditiveFindFirstArgs>(args?: SelectSubset<T, AdditiveFindFirstArgs<ExtArgs>>): Prisma__AdditiveClient<$Result.GetResult<Prisma.$AdditivePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Additive that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdditiveFindFirstOrThrowArgs} args - Arguments to find a Additive
     * @example
     * // Get one Additive
     * const additive = await prisma.additive.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdditiveFindFirstOrThrowArgs>(args?: SelectSubset<T, AdditiveFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdditiveClient<$Result.GetResult<Prisma.$AdditivePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Additives that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdditiveFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Additives
     * const additives = await prisma.additive.findMany()
     * 
     * // Get first 10 Additives
     * const additives = await prisma.additive.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const additiveWithIdOnly = await prisma.additive.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AdditiveFindManyArgs>(args?: SelectSubset<T, AdditiveFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdditivePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Additive.
     * @param {AdditiveCreateArgs} args - Arguments to create a Additive.
     * @example
     * // Create one Additive
     * const Additive = await prisma.additive.create({
     *   data: {
     *     // ... data to create a Additive
     *   }
     * })
     * 
     */
    create<T extends AdditiveCreateArgs>(args: SelectSubset<T, AdditiveCreateArgs<ExtArgs>>): Prisma__AdditiveClient<$Result.GetResult<Prisma.$AdditivePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Additives.
     * @param {AdditiveCreateManyArgs} args - Arguments to create many Additives.
     * @example
     * // Create many Additives
     * const additive = await prisma.additive.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdditiveCreateManyArgs>(args?: SelectSubset<T, AdditiveCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Additives and returns the data saved in the database.
     * @param {AdditiveCreateManyAndReturnArgs} args - Arguments to create many Additives.
     * @example
     * // Create many Additives
     * const additive = await prisma.additive.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Additives and only return the `id`
     * const additiveWithIdOnly = await prisma.additive.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AdditiveCreateManyAndReturnArgs>(args?: SelectSubset<T, AdditiveCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdditivePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Additive.
     * @param {AdditiveDeleteArgs} args - Arguments to delete one Additive.
     * @example
     * // Delete one Additive
     * const Additive = await prisma.additive.delete({
     *   where: {
     *     // ... filter to delete one Additive
     *   }
     * })
     * 
     */
    delete<T extends AdditiveDeleteArgs>(args: SelectSubset<T, AdditiveDeleteArgs<ExtArgs>>): Prisma__AdditiveClient<$Result.GetResult<Prisma.$AdditivePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Additive.
     * @param {AdditiveUpdateArgs} args - Arguments to update one Additive.
     * @example
     * // Update one Additive
     * const additive = await prisma.additive.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdditiveUpdateArgs>(args: SelectSubset<T, AdditiveUpdateArgs<ExtArgs>>): Prisma__AdditiveClient<$Result.GetResult<Prisma.$AdditivePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Additives.
     * @param {AdditiveDeleteManyArgs} args - Arguments to filter Additives to delete.
     * @example
     * // Delete a few Additives
     * const { count } = await prisma.additive.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdditiveDeleteManyArgs>(args?: SelectSubset<T, AdditiveDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Additives.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdditiveUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Additives
     * const additive = await prisma.additive.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdditiveUpdateManyArgs>(args: SelectSubset<T, AdditiveUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Additives and returns the data updated in the database.
     * @param {AdditiveUpdateManyAndReturnArgs} args - Arguments to update many Additives.
     * @example
     * // Update many Additives
     * const additive = await prisma.additive.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Additives and only return the `id`
     * const additiveWithIdOnly = await prisma.additive.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AdditiveUpdateManyAndReturnArgs>(args: SelectSubset<T, AdditiveUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdditivePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Additive.
     * @param {AdditiveUpsertArgs} args - Arguments to update or create a Additive.
     * @example
     * // Update or create a Additive
     * const additive = await prisma.additive.upsert({
     *   create: {
     *     // ... data to create a Additive
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Additive we want to update
     *   }
     * })
     */
    upsert<T extends AdditiveUpsertArgs>(args: SelectSubset<T, AdditiveUpsertArgs<ExtArgs>>): Prisma__AdditiveClient<$Result.GetResult<Prisma.$AdditivePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Additives.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdditiveCountArgs} args - Arguments to filter Additives to count.
     * @example
     * // Count the number of Additives
     * const count = await prisma.additive.count({
     *   where: {
     *     // ... the filter for the Additives we want to count
     *   }
     * })
    **/
    count<T extends AdditiveCountArgs>(
      args?: Subset<T, AdditiveCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdditiveCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Additive.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdditiveAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AdditiveAggregateArgs>(args: Subset<T, AdditiveAggregateArgs>): Prisma.PrismaPromise<GetAdditiveAggregateType<T>>

    /**
     * Group by Additive.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdditiveGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AdditiveGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdditiveGroupByArgs['orderBy'] }
        : { orderBy?: AdditiveGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AdditiveGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdditiveGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Additive model
   */
  readonly fields: AdditiveFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Additive.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdditiveClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Additive model
   */ 
  interface AdditiveFieldRefs {
    readonly id: FieldRef<"Additive", 'Int'>
    readonly code: FieldRef<"Additive", 'String'>
    readonly name: FieldRef<"Additive", 'String'>
    readonly synonyms: FieldRef<"Additive", 'String[]'>
    readonly danger: FieldRef<"Additive", 'Int'>
    readonly origins: FieldRef<"Additive", 'String[]'>
    readonly categories: FieldRef<"Additive", 'String[]'>
    readonly description: FieldRef<"Additive", 'String'>
    readonly healthHarm: FieldRef<"Additive", 'String'>
    readonly healthBenefit: FieldRef<"Additive", 'String'>
    readonly usage: FieldRef<"Additive", 'String'>
    readonly legislation: FieldRef<"Additive", 'String'>
    readonly referenceUrl: FieldRef<"Additive", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Additive findUnique
   */
  export type AdditiveFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Additive
     */
    select?: AdditiveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Additive
     */
    omit?: AdditiveOmit<ExtArgs> | null
    /**
     * Filter, which Additive to fetch.
     */
    where: AdditiveWhereUniqueInput
  }

  /**
   * Additive findUniqueOrThrow
   */
  export type AdditiveFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Additive
     */
    select?: AdditiveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Additive
     */
    omit?: AdditiveOmit<ExtArgs> | null
    /**
     * Filter, which Additive to fetch.
     */
    where: AdditiveWhereUniqueInput
  }

  /**
   * Additive findFirst
   */
  export type AdditiveFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Additive
     */
    select?: AdditiveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Additive
     */
    omit?: AdditiveOmit<ExtArgs> | null
    /**
     * Filter, which Additive to fetch.
     */
    where?: AdditiveWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Additives to fetch.
     */
    orderBy?: AdditiveOrderByWithRelationInput | AdditiveOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Additives.
     */
    cursor?: AdditiveWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Additives from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Additives.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Additives.
     */
    distinct?: AdditiveScalarFieldEnum | AdditiveScalarFieldEnum[]
  }

  /**
   * Additive findFirstOrThrow
   */
  export type AdditiveFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Additive
     */
    select?: AdditiveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Additive
     */
    omit?: AdditiveOmit<ExtArgs> | null
    /**
     * Filter, which Additive to fetch.
     */
    where?: AdditiveWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Additives to fetch.
     */
    orderBy?: AdditiveOrderByWithRelationInput | AdditiveOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Additives.
     */
    cursor?: AdditiveWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Additives from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Additives.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Additives.
     */
    distinct?: AdditiveScalarFieldEnum | AdditiveScalarFieldEnum[]
  }

  /**
   * Additive findMany
   */
  export type AdditiveFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Additive
     */
    select?: AdditiveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Additive
     */
    omit?: AdditiveOmit<ExtArgs> | null
    /**
     * Filter, which Additives to fetch.
     */
    where?: AdditiveWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Additives to fetch.
     */
    orderBy?: AdditiveOrderByWithRelationInput | AdditiveOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Additives.
     */
    cursor?: AdditiveWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Additives from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Additives.
     */
    skip?: number
    distinct?: AdditiveScalarFieldEnum | AdditiveScalarFieldEnum[]
  }

  /**
   * Additive create
   */
  export type AdditiveCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Additive
     */
    select?: AdditiveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Additive
     */
    omit?: AdditiveOmit<ExtArgs> | null
    /**
     * The data needed to create a Additive.
     */
    data: XOR<AdditiveCreateInput, AdditiveUncheckedCreateInput>
  }

  /**
   * Additive createMany
   */
  export type AdditiveCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Additives.
     */
    data: AdditiveCreateManyInput | AdditiveCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Additive createManyAndReturn
   */
  export type AdditiveCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Additive
     */
    select?: AdditiveSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Additive
     */
    omit?: AdditiveOmit<ExtArgs> | null
    /**
     * The data used to create many Additives.
     */
    data: AdditiveCreateManyInput | AdditiveCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Additive update
   */
  export type AdditiveUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Additive
     */
    select?: AdditiveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Additive
     */
    omit?: AdditiveOmit<ExtArgs> | null
    /**
     * The data needed to update a Additive.
     */
    data: XOR<AdditiveUpdateInput, AdditiveUncheckedUpdateInput>
    /**
     * Choose, which Additive to update.
     */
    where: AdditiveWhereUniqueInput
  }

  /**
   * Additive updateMany
   */
  export type AdditiveUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Additives.
     */
    data: XOR<AdditiveUpdateManyMutationInput, AdditiveUncheckedUpdateManyInput>
    /**
     * Filter which Additives to update
     */
    where?: AdditiveWhereInput
    /**
     * Limit how many Additives to update.
     */
    limit?: number
  }

  /**
   * Additive updateManyAndReturn
   */
  export type AdditiveUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Additive
     */
    select?: AdditiveSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Additive
     */
    omit?: AdditiveOmit<ExtArgs> | null
    /**
     * The data used to update Additives.
     */
    data: XOR<AdditiveUpdateManyMutationInput, AdditiveUncheckedUpdateManyInput>
    /**
     * Filter which Additives to update
     */
    where?: AdditiveWhereInput
    /**
     * Limit how many Additives to update.
     */
    limit?: number
  }

  /**
   * Additive upsert
   */
  export type AdditiveUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Additive
     */
    select?: AdditiveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Additive
     */
    omit?: AdditiveOmit<ExtArgs> | null
    /**
     * The filter to search for the Additive to update in case it exists.
     */
    where: AdditiveWhereUniqueInput
    /**
     * In case the Additive found by the `where` argument doesn't exist, create a new Additive with this data.
     */
    create: XOR<AdditiveCreateInput, AdditiveUncheckedCreateInput>
    /**
     * In case the Additive was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdditiveUpdateInput, AdditiveUncheckedUpdateInput>
  }

  /**
   * Additive delete
   */
  export type AdditiveDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Additive
     */
    select?: AdditiveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Additive
     */
    omit?: AdditiveOmit<ExtArgs> | null
    /**
     * Filter which Additive to delete.
     */
    where: AdditiveWhereUniqueInput
  }

  /**
   * Additive deleteMany
   */
  export type AdditiveDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Additives to delete
     */
    where?: AdditiveWhereInput
    /**
     * Limit how many Additives to delete.
     */
    limit?: number
  }

  /**
   * Additive without action
   */
  export type AdditiveDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Additive
     */
    select?: AdditiveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Additive
     */
    omit?: AdditiveOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AdditiveScalarFieldEnum: {
    id: 'id',
    code: 'code',
    name: 'name',
    synonyms: 'synonyms',
    danger: 'danger',
    origins: 'origins',
    categories: 'categories',
    description: 'description',
    healthHarm: 'healthHarm',
    healthBenefit: 'healthBenefit',
    usage: 'usage',
    legislation: 'legislation',
    referenceUrl: 'referenceUrl'
  };

  export type AdditiveScalarFieldEnum = (typeof AdditiveScalarFieldEnum)[keyof typeof AdditiveScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type AdditiveWhereInput = {
    AND?: AdditiveWhereInput | AdditiveWhereInput[]
    OR?: AdditiveWhereInput[]
    NOT?: AdditiveWhereInput | AdditiveWhereInput[]
    id?: IntFilter<"Additive"> | number
    code?: StringFilter<"Additive"> | string
    name?: StringFilter<"Additive"> | string
    synonyms?: StringNullableListFilter<"Additive">
    danger?: IntFilter<"Additive"> | number
    origins?: StringNullableListFilter<"Additive">
    categories?: StringNullableListFilter<"Additive">
    description?: StringFilter<"Additive"> | string
    healthHarm?: StringFilter<"Additive"> | string
    healthBenefit?: StringFilter<"Additive"> | string
    usage?: StringFilter<"Additive"> | string
    legislation?: StringNullableFilter<"Additive"> | string | null
    referenceUrl?: StringFilter<"Additive"> | string
  }

  export type AdditiveOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    synonyms?: SortOrder
    danger?: SortOrder
    origins?: SortOrder
    categories?: SortOrder
    description?: SortOrder
    healthHarm?: SortOrder
    healthBenefit?: SortOrder
    usage?: SortOrder
    legislation?: SortOrderInput | SortOrder
    referenceUrl?: SortOrder
  }

  export type AdditiveWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    code?: string
    AND?: AdditiveWhereInput | AdditiveWhereInput[]
    OR?: AdditiveWhereInput[]
    NOT?: AdditiveWhereInput | AdditiveWhereInput[]
    name?: StringFilter<"Additive"> | string
    synonyms?: StringNullableListFilter<"Additive">
    danger?: IntFilter<"Additive"> | number
    origins?: StringNullableListFilter<"Additive">
    categories?: StringNullableListFilter<"Additive">
    description?: StringFilter<"Additive"> | string
    healthHarm?: StringFilter<"Additive"> | string
    healthBenefit?: StringFilter<"Additive"> | string
    usage?: StringFilter<"Additive"> | string
    legislation?: StringNullableFilter<"Additive"> | string | null
    referenceUrl?: StringFilter<"Additive"> | string
  }, "id" | "code">

  export type AdditiveOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    synonyms?: SortOrder
    danger?: SortOrder
    origins?: SortOrder
    categories?: SortOrder
    description?: SortOrder
    healthHarm?: SortOrder
    healthBenefit?: SortOrder
    usage?: SortOrder
    legislation?: SortOrderInput | SortOrder
    referenceUrl?: SortOrder
    _count?: AdditiveCountOrderByAggregateInput
    _avg?: AdditiveAvgOrderByAggregateInput
    _max?: AdditiveMaxOrderByAggregateInput
    _min?: AdditiveMinOrderByAggregateInput
    _sum?: AdditiveSumOrderByAggregateInput
  }

  export type AdditiveScalarWhereWithAggregatesInput = {
    AND?: AdditiveScalarWhereWithAggregatesInput | AdditiveScalarWhereWithAggregatesInput[]
    OR?: AdditiveScalarWhereWithAggregatesInput[]
    NOT?: AdditiveScalarWhereWithAggregatesInput | AdditiveScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Additive"> | number
    code?: StringWithAggregatesFilter<"Additive"> | string
    name?: StringWithAggregatesFilter<"Additive"> | string
    synonyms?: StringNullableListFilter<"Additive">
    danger?: IntWithAggregatesFilter<"Additive"> | number
    origins?: StringNullableListFilter<"Additive">
    categories?: StringNullableListFilter<"Additive">
    description?: StringWithAggregatesFilter<"Additive"> | string
    healthHarm?: StringWithAggregatesFilter<"Additive"> | string
    healthBenefit?: StringWithAggregatesFilter<"Additive"> | string
    usage?: StringWithAggregatesFilter<"Additive"> | string
    legislation?: StringNullableWithAggregatesFilter<"Additive"> | string | null
    referenceUrl?: StringWithAggregatesFilter<"Additive"> | string
  }

  export type AdditiveCreateInput = {
    code: string
    name: string
    synonyms?: AdditiveCreatesynonymsInput | string[]
    danger: number
    origins?: AdditiveCreateoriginsInput | string[]
    categories?: AdditiveCreatecategoriesInput | string[]
    description: string
    healthHarm: string
    healthBenefit: string
    usage: string
    legislation?: string | null
    referenceUrl: string
  }

  export type AdditiveUncheckedCreateInput = {
    id?: number
    code: string
    name: string
    synonyms?: AdditiveCreatesynonymsInput | string[]
    danger: number
    origins?: AdditiveCreateoriginsInput | string[]
    categories?: AdditiveCreatecategoriesInput | string[]
    description: string
    healthHarm: string
    healthBenefit: string
    usage: string
    legislation?: string | null
    referenceUrl: string
  }

  export type AdditiveUpdateInput = {
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    synonyms?: AdditiveUpdatesynonymsInput | string[]
    danger?: IntFieldUpdateOperationsInput | number
    origins?: AdditiveUpdateoriginsInput | string[]
    categories?: AdditiveUpdatecategoriesInput | string[]
    description?: StringFieldUpdateOperationsInput | string
    healthHarm?: StringFieldUpdateOperationsInput | string
    healthBenefit?: StringFieldUpdateOperationsInput | string
    usage?: StringFieldUpdateOperationsInput | string
    legislation?: NullableStringFieldUpdateOperationsInput | string | null
    referenceUrl?: StringFieldUpdateOperationsInput | string
  }

  export type AdditiveUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    synonyms?: AdditiveUpdatesynonymsInput | string[]
    danger?: IntFieldUpdateOperationsInput | number
    origins?: AdditiveUpdateoriginsInput | string[]
    categories?: AdditiveUpdatecategoriesInput | string[]
    description?: StringFieldUpdateOperationsInput | string
    healthHarm?: StringFieldUpdateOperationsInput | string
    healthBenefit?: StringFieldUpdateOperationsInput | string
    usage?: StringFieldUpdateOperationsInput | string
    legislation?: NullableStringFieldUpdateOperationsInput | string | null
    referenceUrl?: StringFieldUpdateOperationsInput | string
  }

  export type AdditiveCreateManyInput = {
    id?: number
    code: string
    name: string
    synonyms?: AdditiveCreatesynonymsInput | string[]
    danger: number
    origins?: AdditiveCreateoriginsInput | string[]
    categories?: AdditiveCreatecategoriesInput | string[]
    description: string
    healthHarm: string
    healthBenefit: string
    usage: string
    legislation?: string | null
    referenceUrl: string
  }

  export type AdditiveUpdateManyMutationInput = {
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    synonyms?: AdditiveUpdatesynonymsInput | string[]
    danger?: IntFieldUpdateOperationsInput | number
    origins?: AdditiveUpdateoriginsInput | string[]
    categories?: AdditiveUpdatecategoriesInput | string[]
    description?: StringFieldUpdateOperationsInput | string
    healthHarm?: StringFieldUpdateOperationsInput | string
    healthBenefit?: StringFieldUpdateOperationsInput | string
    usage?: StringFieldUpdateOperationsInput | string
    legislation?: NullableStringFieldUpdateOperationsInput | string | null
    referenceUrl?: StringFieldUpdateOperationsInput | string
  }

  export type AdditiveUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    synonyms?: AdditiveUpdatesynonymsInput | string[]
    danger?: IntFieldUpdateOperationsInput | number
    origins?: AdditiveUpdateoriginsInput | string[]
    categories?: AdditiveUpdatecategoriesInput | string[]
    description?: StringFieldUpdateOperationsInput | string
    healthHarm?: StringFieldUpdateOperationsInput | string
    healthBenefit?: StringFieldUpdateOperationsInput | string
    usage?: StringFieldUpdateOperationsInput | string
    legislation?: NullableStringFieldUpdateOperationsInput | string | null
    referenceUrl?: StringFieldUpdateOperationsInput | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AdditiveCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    synonyms?: SortOrder
    danger?: SortOrder
    origins?: SortOrder
    categories?: SortOrder
    description?: SortOrder
    healthHarm?: SortOrder
    healthBenefit?: SortOrder
    usage?: SortOrder
    legislation?: SortOrder
    referenceUrl?: SortOrder
  }

  export type AdditiveAvgOrderByAggregateInput = {
    id?: SortOrder
    danger?: SortOrder
  }

  export type AdditiveMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    danger?: SortOrder
    description?: SortOrder
    healthHarm?: SortOrder
    healthBenefit?: SortOrder
    usage?: SortOrder
    legislation?: SortOrder
    referenceUrl?: SortOrder
  }

  export type AdditiveMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    danger?: SortOrder
    description?: SortOrder
    healthHarm?: SortOrder
    healthBenefit?: SortOrder
    usage?: SortOrder
    legislation?: SortOrder
    referenceUrl?: SortOrder
  }

  export type AdditiveSumOrderByAggregateInput = {
    id?: SortOrder
    danger?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type AdditiveCreatesynonymsInput = {
    set: string[]
  }

  export type AdditiveCreateoriginsInput = {
    set: string[]
  }

  export type AdditiveCreatecategoriesInput = {
    set: string[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type AdditiveUpdatesynonymsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AdditiveUpdateoriginsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type AdditiveUpdatecategoriesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}