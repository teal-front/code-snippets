## SQLite3
### intro
> SQLite3: https://www.sqlite.org，python自带， a self-contained, serverless, zero-configuration, transactional SQL database engine

### Command Line Shell For SQLite
> https://www.sqlite.org/cli.html
```sql
-- dot-commands
.tables                          -- show tables
.databases                       -- show databases
.output foo.txt                  -- console to special out
.save foo.db                     -- save as foo.db(file will overwrite exist file)

.schema table_name               -- shows the complete schema for the table

-- normal sql
SELECT * FROM foo;
ALTER TABLE foo RENAME TO bar;   -- rename table
DROP TABLE foo;                  -- drop table
INSERT INTO foo VALUES (v1, v2);       -- insert values to table
-- 自增类型的直接传NULL即可
DELETE FROM foo                        -- empty the table foo

-- run in shell script
sqlite3 mysqlite.db 'select * from foo'
sqlite3 mysqlite.db .schema
```