// Post Schema
{
    posts : {
        1 : {
            user : 'F64FRygnyrYOlOHtCLemXee90k92',
            url: 'test@example.com',
            caption: ' This is a picture',
            tags: [
                'nature',
                'mountains'
            ],
            likeCount: 1,
            likers: [
                "IlQqZAhLqdZMmN61eEletJsA46g1"
            ]
        }
    }
}

// User Schema
{
    users: {
        uid_1 : {
            displayName: "John Doe"
        }
    }
}

// Tag Schema
{
    mountains: [
        post_id : 1 // like / startCount
    ]
}
