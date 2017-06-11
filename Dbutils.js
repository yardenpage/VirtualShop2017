/**
 * Created by Dell on 6/4/2017.
 */
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var connection;

var config = {
    userName: 'yardendana',
    password: 'yaPa1010',
    server: 'yardendana.database.windows.net',
    options: {encrypt: true, database: 'yardendana_db'}
}

function insert(query, callback) {
    connection = new Connection(config);
    connection.on('connect', function (err)
    {
        var req = new Request(query,function (err, rowCount) {
            if (err)
            {
                console.error('error connecting: '+ err.stack);
                callback('false');
            }
            else{
                callback('true');
            }
        });
        connection.execSql(req);
    });
}

function select(query,callback) {
    connection = new Connection(config);
    connection.on('connect', function (err)
    {
        var req = new Request(query,function (err, rowCount, rows)
        {
            if (err) {
                console.log(err);
            }
        });
        var res = [];
        var properties = [];
        req.on('columnMetadata', function(columns)
        {
            columns.forEach(function(column){
                if(column.colName != null){
                    properties.push(column.colName);
                }
            });
        });

        req.on('row', function (row) {
            var item = {};
            for(i=0; i<row.length; i++){
                item[properties[i]] = row[i].value;
            }
            res.push(item);
        });

        req.on('requestCompleted', function(){
            console.log('requestCompleted with ' + req.rowCount + ' row(s)');
            callback(res);
            console.log(res);
        });
        connection.execSql(req);
    });
}

module.exports.insert = insert;
module.exports.select = select