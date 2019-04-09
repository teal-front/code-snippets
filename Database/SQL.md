## SQLite3

### intro

> SQLite3: https://www.sqlite.org，python自带， a self-contained, serverless, zero-configuration, transactional SQL database engine

### Command Line Shell For SQLite

> https://www.sqlite.org/cli.html

#### create sqlite3

`sqlite3 main.db`， 然后写点东西退出就可以了

```sql
-- dot-commands
.tables                          -- show tables
.databases                       -- show databases
.output foo.txt                  -- console to special out
.save foo.db                     -- save as foo.db(file will overwrite exist file)

.schema table_name               -- shows the complete schema for the table

-- normal sql
CREATE TABLE foo(bar varchar(30), baz int);
SELECT * FROM foo;
SELECT foo, bar FROM foo WHERE name='teal';
ALTER TABLE foo RENAME TO bar;   -- rename table
DROP TABLE foo;                  -- drop table
INSERT INTO foo VALUES (v1, v2);       -- insert values to table
-- 自增类型的直接传NULL即可
DELETE FROM foo                        -- empty the table foo

-- run in shell script
sqlite3 mysqlite.db 'select * from foo'
sqlite3 mysqlite.db .schema
```
