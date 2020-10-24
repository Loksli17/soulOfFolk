//Application settings
module.exports = {
    db: {
        host    : 'localhost',
        database: 'dvgupsSno',
        user    : 'root',
        password: '1234',
    },
    email: {
        user    : 'dvgups.sno@gmail.com',
        password: 'XfRg5mCW',
        action  : 'localhost:3000/auth/accessEmail',
    },
    admin: {
        pagination: {
            pageSize: 8,
            limit   : 20,
        },
    },
    secret: {
        password: '~1;3JklN,<az09T',
        session : 'mtq[}$TyE4fg9)1',
        jwt     : '*7asd#$d^FjM!',
    },
    app: {
        port: 3000,
        name: 'dvgupsSno',
        pagination: {
            pageSize: 8,
            limit   : 10,
        },
        timeLifeCookie: Date.now() + 1000 * 60 * 60 * 24,
    },
}
