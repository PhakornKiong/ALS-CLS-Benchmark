# Simple Benchmark for als-context, cls-hooked & AsyncLocalStorage

## *Steps*

1) npm install

2) node `server.js` for baseline
   
   node `server-cls.js` for cls-hooked  
  
   node `server-als.js` for native AsyncLocalStorage
  
   node `server-alscontext.js` for cls part of alscontext [here](https://github.com/Darkripper214/ALS-Context)

3) node index.js

Note: Micro benchmarking is not representative of real world situation

Performance: `AsyncLocalStorage` > `cls-context` > `cls-hooked`

## Using `request` to pass context

Running 10s test
10 connections

| Stat    | 2.5% | 50%  | 97.5% | 99%  | Avg    | Stdev  | Max  |
| ------- | ---- | ---- | ----- | ---- | ------ | ------ | ---- |
| Latency | 1ms  | 1ms  | 3ms   | 3ms  | 1.13ms | 0.54ms | 21ms |

| Stat      | 1%   | 2.5% | 50%    | 97.5%   | Avg     | Stdev  | Min  |
| --------- | ---- | ---- | ------ | ------- | ------- | ------ | ---- |
| Req/Sec   | 3817 | 3817 | 6855   | 7047    | 6514.64 | 898.63 | 3817 |
| Bytes/Sec | 1 MB | 1 MB | 1.8 MB | 1.85 MB | 1.71MB  | 235kB  | 1 MB |


Req/Bytes counts sampled once per second.

72k requests in 11.03s, 18.8 MB read

## Using `AsyncLocalStorage` to pass context

Running 10s test @ http://localhost:3000
10 connections

| Stat    | 2.5% | 50%  | 97.5% | 99%  | Avg   | Stdev  | Max  |
| ------- | ---- | ---- | ----- | ---- | ----- | ------ | ---- |
| Latency | 1ms  | 1ms  | 3ms   | 3ms  | 1.1ms | 0.48ms | 22ms |

| Stat      | 1%      | 2.5%    | 50%     | 97.5%   | Avg     | Stdev  | Min     |
| --------- | ------- | ------- | ------- | ------- | ------- | ------ | ------- |
| Req/Sec   | 3837    | 3837    | 7211    | 7371    | 6815.73 | 991.78 | 3836    |
| Bytes/Sec | 1.01 MB | 1.01 MB | 1.89 MB | 1.93 MB | 1.79 MB | 260 kB | 1.01 MB |

Req/Bytes counts sampled once per second.

75k requests in 11.02s, 19.6 MB read

## Using `alscontext` (CLS part) to pass context

Running 10s test @ http://localhost:3000
10 connections

| Stat    | 2.5% | 50%  | 97.5% | 99%  | Avg   | Stdev  | Max  |
| ------- | ---- | ---- | ----- | ---- | ----- | ------ | ---- |
| Latency | 1ms  | 1ms  | 3ms   | 4ms  | 1.2ms | 0.69ms | 26ms |

| Stat      | 1%      | 2.5%    | 50%     | 97.5%   | Avg     | Stdev  | Min     |
| --------- | ------- | ------- | ------- | ------- | ------- | ------ | ------- |
| Req/Sec   | 3077    | 3077    | 6455    | 6719    | 5991.10 | 1096.3 | 3077    |
| Bytes/Sec | 806 kB  | 806 kB  | 1.69 MB | 1.76 MB | 1.57 MB | 287 kB | 806 kB  |

Req/Bytes counts sampled once per second.

60k requests in 10.02s, 15.7 MB read

## Using `cls-hooked` to pass context

Running 10s test @ http://localhost:3000
10 connections



| Stat    | 2.5% | 50%  | 97.5% | 99%  | Avg    | Stdev  | Max  |
| ------- | ---- | ---- | ----- | ---- | ------ | ------ | ---- |
| Latency | 1ms  | 2ms  | 5ms   | 6ms  | 2.22ms | 0.97ms | 36ms |

| Stat      | 1%     | 2.5%   | 50%     | 97.5%   | Avg    | Stdev  | Min    |
| --------- | ------ | ------ | ------- | ------- | ------ | ------ | ------ |
| Req/Sec   | 2173   | 2173   | 4171    | 4227    | 3893.82 | 597.54 | 2431   |
| Bytes/Sec | 569 kB | 569 kB | 1.09 MB | 1.11 MB | 1.02 MB | 157 kB | 569 kB |

Req/Bytes counts sampled once per second.

43k requests in 11.03s, 11.2 MB read