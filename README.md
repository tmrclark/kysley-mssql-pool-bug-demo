
## Purpose

This is a repo to demonstrate how Kysley makes 3 round trips to a MSSQL server for every query it executes. This is shown by adding OpenTelemetry tracing to the underlying [tedious](https://github.com/tediousjs/tedious) database driver. Every trip to the database is captured in a trace.

### Setup

1. Clone repo
2. Run `npm i`
3. Create a MSSQL database
4. Create a `.env` file with the following

```
DB_HOSTNAME=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
```

5. Run `npm run start`
6. Wait a few seconds and see the OpenTelemetry trace output in the console

### Example Traces

```js
{
  resource: {
    attributes: {
      'service.name': 'kysely-ot',
      'telemetry.sdk.language': 'nodejs',
      'telemetry.sdk.name': 'opentelemetry',
      'telemetry.sdk.version': '1.25.1',
      'process.pid': 12722,
      'process.executable.name': '...',
      'process.executable.path': '...',
      'process.command_args': [
        '...',
        '--import',
        './ot.js',
        '...'
      ],
      'process.runtime.version': '20.14.0',
      'process.runtime.name': 'nodejs',
      'process.runtime.description': 'Node.js',
      'process.command': '...',
      'process.owner': '...',
      'host.name': '...',
      'host.arch': '...'
    }
  },
  traceId: '31104a5e822165f74ca3e9ff5d3fd927',
  parentId: undefined,
  traceState: undefined,
  name: 'execSql master',
  id: '56d2a12d48931547',
  kind: 2,
  timestamp: 1719339909508000,
  duration: 35242.125,
  attributes: {
    'db.system': 'mssql',
    'db.name': 'master',
    'net.peer.port': 30106,
    'net.peer.name': '172.17.18.119',
    'db.user': 'SA',
    'db.statement': 'select 1',
    'tedious.procedure_count': 1,
    'tedious.statement_count': 1
  },
  status: { code: 0 },
  events: [],
  links: []
}
{
  resource: {
    attributes: {
      'service.name': 'kysely-ot',
      'telemetry.sdk.language': 'nodejs',
      'telemetry.sdk.name': 'opentelemetry',
      'telemetry.sdk.version': '1.25.1',
      'process.pid': 12722,
      'process.executable.name': '...',
      'process.executable.path': '...',
      'process.command_args': [
        '...',
        '--import',
        './ot.js',
        '...'
      ],
      'process.runtime.version': '20.14.0',
      'process.runtime.name': 'nodejs',
      'process.runtime.description': 'Node.js',
      'process.command': '...',
      'process.owner': '...',
      'host.name': '...',
      'host.arch': 'arm64'
    }
  },
  traceId: '710d8a776e28387df4fa81d73b63b143',
  parentId: undefined,
  traceState: undefined,
  name: 'execSql master',
  id: '6b23aef521d48c2f',
  kind: 2,
  timestamp: 1719339909544000,
  duration: 44486.75,
  attributes: {
    'db.system': 'mssql',
    'db.name': 'master',
    'net.peer.port': 30106,
    'net.peer.name': '172.17.18.119',
    'db.user': 'SA',
    'db.statement': 'select top(1) * from "sys"."tables"',
    'tedious.procedure_count': 1,
    'tedious.statement_count': 1
  },
  status: { code: 0 },
  events: [],
  links: []
}
{
  resource: {
    attributes: {
      'service.name': 'kysely-ot',
      'telemetry.sdk.language': 'nodejs',
      'telemetry.sdk.name': 'opentelemetry',
      'telemetry.sdk.version': '1.25.1',
      'process.pid': 12722,
      'process.executable.name': '...',
      'process.executable.path': '...',
      'process.command_args': [
        '...',
        '--import',
        './ot.js',
        '...'
      ],
      'process.runtime.version': '20.14.0',
      'process.runtime.name': 'nodejs',
      'process.runtime.description': 'Node.js',
      'process.command': '...',
      'process.owner': '...',
      'host.name': '...',
      'host.arch': 'arm64'
    }
  },
  traceId: 'b10ccf7f37eb01b360ff3dcc3dd022d5',
  parentId: undefined,
  traceState: undefined,
  name: 'execSqlBatch master',
  id: '51cdcd3c5f1ee06b',
  kind: 2,
  timestamp: 1719339909588000,
  duration: 33890.125,
  attributes: {
    'db.system': 'mssql',
    'db.name': 'master',
    'net.peer.port': 30106,
    'net.peer.name': '172.17.18.119',
    'db.user': 'SA',
    'db.statement': 'set ansi_nulls on\n' +
      'set ansi_null_dflt_on on\n' +
      'set ansi_padding on\n' +
      'set ansi_warnings on\n' +
      'set arithabort on\n' +
      'set concat_null_yields_null on\n' +
      'set datefirst 7\n' +
      'set dateformat mdy\n' +
      'set implicit_transactions off\n' +
      'set language us_english\n' +
      'set numeric_roundabort off\n' +
      'set quoted_identifier on\n' +
      'set textsize 2147483647\n' +
      'set transaction isolation level read committed\n' +
      'set xact_abort off',
    'tedious.procedure_count': 0,
    'tedious.statement_count': 14
  },
  status: { code: 0 },
  events: [],
  links: []
}
```
