

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

            }
        }
    },
    {
        case: 'when _id incorrect',
        body: {
            user: {
                _id: 'dsfsdfsdfsdfsd',
                email: 'gomihagle@gmail.com',
                name: 'miha',
                lastName: 'go',
                avatar_url: 'https://omgapp.pp.ua/api/storage/default.png'
            }
        }
    },
    {
        case: 'when _id missing',
        body: {
            user: {
                email: 'gomihagle@gmail.com',
                name: 'miha',
                lastName: 'go',
                avatar_url: 'https://omgapp.pp.ua/api/storage/default.png'
            }
        }
    },
    {
        case: 'when email incorrect',
        body: {
            user: {
                _id: '2c7b0b09ba7c5b4d4db9a87b',
                email: 'gomihaglemail.com',
                name: 'miha',
                lastName: 'go',
                avatar_url: 'https://omgapp.pp.ua/api/storage/default.png'
            }
        }
    },
    {
        case: 'when email missing',
        body: {
            user: {
                _id: '2c7b0b09ba7c5b4d4db9a87b',
                name: 'miha',
                lastName: 'go',
                avatar_url: 'https://omgapp.pp.ua/api/storage/default.png'
            }
        }
    },
    {
        case: 'when name incorrect',
        body: {
            user: {
                _id: '2c7b0b09ba7c5b4d4db9a87b',
                email: 'gomihaglemail.com',
                name: 'm',
                lastName: 'go',
                avatar_url: 'https://omgapp.pp.ua/api/storage/default.png'
            }
        }
    },
    {
        case: 'when name missing',
        body: {
            user: {
                _id: '2c7b0b09ba7c5b4d4db9a87b',
                email: 'gomihaglemail.com',
                lastName: 'go',
                avatar_url: 'https://omgapp.pp.ua/api/storage/default.png'
            }
        }
    },
    {
        case: 'when lastname incorrect',
        body: {
            user: {
                _id: '2c7b0b09ba7c5b4d4db9a87b',
                email: 'gomihaglemail.com',
                name: 'miha',
                lastName: 'g',
                avatar_url: 'https://omgapp.pp.ua/api/storage/default.png'
            }
        }
    },
    {
        case: 'when lastname missing',
        body: {
            user: {
                _id: '2c7b0b09ba7c5b4d4db9a87b',
                email: 'gomihaglemail.com',
                name: 'miha',
                lastName: 'g',
                avatar_url: 'https://omgapp.pp.ua/api/storage/default.png'
            }
        }
    },
    {
        case: 'when avatar url incorrect',
        body: {
            user: {
                _id: '2c7b0b09ba7c5b4d4db9a87b',
                email: 'gomihaglemail.com',
                name: 'miha',
                lastName: 'g',
                avatar_url: 'omgapp.pp.ua-api.\\\name'
            }
        }
    },
    {
        case: 'when avatar url missing',
        body: {
            user: {
                _id: '2c7b0b09ba7c5b4d4db9a87b',
                email: 'gomihaglemail.com',
                name: 'miha',
                lastName: 'g',
            }
        }
    },


]
