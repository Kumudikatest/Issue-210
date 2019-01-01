module.exports = function() {
    this.dbConnections = [];

    this.dbConnections["Test"] = {
        host: process.env.EndPoint_rdsTest,
        port: process.env.Port_rdsTest,
        user: process.env.User_rdsTest,
        password: process.env.Password_rdsTest,
        database: "Test"
    };
};