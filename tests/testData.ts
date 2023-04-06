  

export const addUserBody = [

    {
        case: 'when passed empty body',
        body: {
        }
    },
    {
        case: 'when passed empty user',
        body: {
            user: {

            },
            password:'12345miha'
        }
    },
   

    {
        case: 'when email incorrect',
        body: {
            user: {
                _id: '2c7b0b09ba7c5b4d4db9a87b',
                email:'dsfksdf.sdasda./asdas',
                name: 'miha',
                lastName: 'go',
                avatar_url: '/api/storage/default.png',
                avatar_min_url: '/api/storage/default.png'
            },
            password:'12345miha'
        }
    },
    {
        case: 'when email missing',
        body: {
            user: {
                _id: '2c7b0b09ba7c5b4d4db9a87b',
                name: 'miha',
                lastName: 'go',
                avatar_url: '/api/storage/default.png',
                avatar_min_url: '/api/storage/default.png'
            },
            password:'12345miha'
        }
    },
    {
        case: 'when name incorrect',
        body: {
            user: {
                _id: '2c7b0b09ba7c5b4d4db9a87b',
                email:`${crypto.randomUUID().slice(0, 8)}@example.com`,
                name: 'm',
                lastName: 'go',
                avatar_url: '/api/storage/default.png',
                avatar_min_url: '/api/storage/default.png'
            },
            password:'12345miha'
        }
    },
    {
        case: 'when name missing',
        body: {
            user: {
                _id: '2c7b0b09ba7c5b4d4db9a87b',
                email:`${crypto.randomUUID().slice(0, 8)}@example.com`,
                lastName: 'go',
                avatar_url: '/api/storage/default.png',
                avatar_min_url: '/api/storage/default.png'
            },
            password:'12345miha'
        }
    },
    {
        case: 'when lastname incorrect',
        body: {
            user: {
                _id: '2c7b0b09ba7c5b4d4db9a87b',
                email:`${crypto.randomUUID().slice(0, 8)}@example.com`,
                name: 'miha',
                lastName: 123,
                avatar_url: '/api/storage/default.png',
                avatar_min_url: '/api/storage/default.png'
            },
            password:'12345miha'
        }
    },
    {
        case: 'when lastname missing',
        body: {
            user: {
                _id: '2c7b0b09ba7c5b4d4db9a87b',
                email:`${crypto.randomUUID().slice(0, 8)}@example.com`,
                name: 'miha',
                avatar_url: '/api/storage/default.png',
                avatar_min_url: '/api/storage/default.png'
            },
            password:'12345miha'
        }
    },
    {
        case: 'when avatar url incorrect',
        body: {
            user: {
                _id: '2c7b0b09ba7c5b4d4db9a87b',
                email:`${crypto.randomUUID().slice(0, 8)}@example.com`,
                name: 'miha',
                lastName: 'g',
                avatar_url: 1234,
                avatar_min_url: '/api/storage/default.png'
            },
            password:'12345miha'
        }
    },
    {
        case: 'when avatar url missing',
        body: {
            user: {
                _id: '2c7b0b09ba7c5b4d4db9a87b',
                email:`${crypto.randomUUID().slice(0, 8)}@example.com`,
                name: 'miha',
                lastName: 'g',
                avatar_min_url: '/api/storage/default.png'
            },
            password:'12345miha'
        }
    },
    {
        case: 'when avatar min url incorrect',
        body: {
            user: {
                _id: '2c7b0b09ba7c5b4d4db9a87b',
                email:`${crypto.randomUUID().slice(0, 8)}@example.com`,
                name: 'miha',
                lastName: 'g',
                avatar_url: '/api/storage/default.png',
                avatar_min_url: 1234
            },
            password:'12345miha'
        }
    },
    {
        case: 'when avatar min url is missing',
        body: {
            user: {
                _id: '2c7b0b09ba7c5b4d4db9a87b',
                email:`${crypto.randomUUID().slice(0, 8)}@example.com`,
                name: 'miha',
                lastName: 'g',
                avatar_url: '/api/storage/default.png',
            },
            password:'12345miha'
        }
    },
    
    {
        case: 'when password  missing',
        body: {
            user: {
                _id: '2c7b0b09ba7c5b4d4db9a87b',
                email:`${crypto.randomUUID().slice(0, 8)}@example.com`,
                name: 'miha',
                lastName: 'g',
                avatar_url: '/api/storage/default.png',
                avatar_min_url: '/api/storage/default.png'

            }
        }
    },
    {
        case: 'when password is incorrect',
        body: {
            user: {
                _id: '2c7b0b09ba7c5b4d4db9a87b',
                email:`${crypto.randomUUID().slice(0, 8)}@example.com`,
                name: 'miha',
                lastName: 'g',
                avatar_url: '/api/storage/default.png',
                avatar_min_url: '/api/storage/default.png'
            },
            password:'123'
        }
    },



]
