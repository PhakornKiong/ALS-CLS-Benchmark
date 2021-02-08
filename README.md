# Simple Benchmark for cls-hooked & AsyncLocalStorage

## *Steps*

1) npm install

2) node `server.js` or `server-cls.js` or `server-als.js`

3) node index.js

Note: Micro benchmarking is not representative of real world situation

## Using `request` to pass context

Running 10s test
10 connections

| Stat    | 2.5% | 50%  | 97.5% | 99%  | Avg    | Stdev  | Max  |
| ------- | ---- | ---- | ----- | ---- | ------ | ------ | ---- |
| Latency | 1ms  | 1ms  | 3ms   | 3ms  | 1.13ms | 0.54ms | 21ms |

| Stat      | 1%   | 2.5% | 50%    | 97.5%   | Avg     | Stdev  | Max  |
| --------- | ---- | ---- | ------ | ------- | ------- | ------ | ---- |
| Req/Sec   | 3817 | 3817 | 6855   | 7047    | 6514.64 | 898.63 | 3817 |
| Bytes/Sec | 1 MB | 1 MB | 1.8 MB | 1.85 MB | 1.71MB  | 235kB  | 1 MB |


Req/Bytes counts sampled once per second.

72k requests in 11.03s, 18.8 MB read

## Using `cls-hooked` to pass context

Running 10s test 
10 connections



| Stat    | 2.5% | 50%  | 97.5% | 99%  | Avg    | Stdev  | Max  |
| ------- | ---- | ---- | ----- | ---- | ------ | ------ | ---- |
| Latency | 1ms  | 2ms  | 5ms   | 6ms  | 2.26ms | 0.87ms | 25ms |

| Stat      | 1%     | 2.5%   | 50%     | 97.5%   | Avg    | Stdev  | Max    |
| --------- | ------ | ------ | ------- | ------- | ------ | ------ | ------ |
| Req/Sec   | 2431   | 2431   | 4019    | 4167    | 3803.3 | 513.47 | 2431   |
| Bytes/Sec | 637 kB | 637 kB | 1.05 MB | 1.09 MB | 996 kB | 135 kB | 637 kB |

Req/Bytes counts sampled once per second.

38k requests in 10.03s, 9.96 MB read

## Using `AsyncLocalStorage` to pass context

Running 10s test @ http://localhost:3000
10 connections

| Stat    | 2.5% | 50%  | 97.5% | 99%  | Avg   | Stdev  | Max  |
| ------- | ---- | ---- | ----- | ---- | ----- | ------ | ---- |
| Latency | 1ms  | 1ms  | 3ms   | 3ms  | 1.1ms | 0.48ms | 22ms |

| Stat      | 1%      | 2.5%    | 50%     | 97.5%   | Avg     | Stdev  | Max     |
| --------- | ------- | ------- | ------- | ------- | ------- | ------ | ------- |
| Req/Sec   | 3837    | 3837    | 7211    | 7371    | 6815.73 | 991.78 | 3836    |
| Bytes/Sec | 1.01 MB | 1.01 MB | 1.89 MB | 1.93 MB | 1.79 MB | 260 kB | 1.01 MB |

Req/Bytes counts sampled once per second.

75k requests in 11.02s, 19.6 MB read