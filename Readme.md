# PUSH-SERVICE

**PUSH-SERVICE** является микросервисом рассылки push-уведомлений на мобильные устройства и браузеры пользователей CyberWay.
Также хранит настройки пользователя, указывающие на необходимость рассылки конкретных типов уведомлений и их язык.

API JSON-RPC:

```
transfer:
    message <object>       // Объект сообщения из сервиса нотификаций

getOptions:
    user <string>          // Имя пользователя
    profile <string>       // Профиль пользователя
    app <string>('cyber')  // Тип приложения
        [
          cyber            // CyberWay
        | gls              // Golos
        ]

setOptions:
    user <string>                        // Имя пользователя
    profile <string>                     // Профиль пользователя
    app <string>('cyber')                // Тип приложения
        [
          cyber                          // CyberWay
        | gls                            // Golos
        ]
    data:                                // Устанавливаемые настройки
        lang <'ru'|'en'> ('en')          // Язык нотификаций
        show:                            // Показывать ли указанные типы нотификаций
            upvote <boolean>             // лайк (голос)
            downvote <boolean>           // флаг (дизлайк, жалоба)
            transfer <boolean>           // перевод средств
            reply <boolean>              // ответ на пост или комментарий
            subscribe <boolean>          // подписка на блог
            unsubscribe <boolean>        // отписка от блога
            mention <boolean>            // упоминание в посте, заголовке поста или в комменте (через @)
            repost <boolean>             // репост
            reward <boolean>             // награда пользователю
            curatorReward <boolean>      // награда куратору
            witnessVote <boolean>        // голос за делегата
            witnessCancelVote <boolean>  // отмена голоса за делегата

notifyOn:
    user <string>          // Имя пользователя
    profile <string>       // Профиль пользователя
    app <string>('cyber')  // Тип приложения
        [
          cyber            // CyberWay
        | gls              // Golos
        ]
    key <string>           // Секретный Google-push ключ для доставки сообщений устройству

notifyOff:
    user <string>          // Имя пользователя
    profile <string>       // Профиль пользователя
    app <string>('cyber')  // Тип приложения
        [
          cyber            // CyberWay
        | gls              // Golos
        ]

history:
    user <string>          // Имя пользователя
    profile <string>       // Профиль пользователя
    app <string>('cyber')  // Тип приложения
        [
          cyber            // CyberWay
        | gls              // Golos
        ]
    afterId
    limit
    markAsViewed
    freshOnly
    types <string[]|['all']>(['all'])  // Массив необходимых типов нотификаций из которого будут вычтены те типы,
                                       // которые пользователь отключил в своих настройках.
        [
          all                          // все типы
          upvote                       // лайк (голос)
        | downvote                     // флаг (дизлайк, жалоба)
        | transfer                     // перевод средств
        | reply                        // ответ на пост или комментарий
        | subscribe                    // подписка на блог
        | unsubscribe                  // отписка от блога
        | mention                      // упоминание в посте, заголовке поста или в комменте (через @)
        | repost                       // репост
        | reward                       // награда пользователю
        | curatorReward                // награда куратору
        | witnessVote                  // голос за делегата
        | witnessCancelVote            // отмена голоса за делегата
        ]

historyFresh:
    user <string>          // Имя пользователя
    profile <string>       // Профиль пользователя
    app <string>('cyber')  // Тип приложения
        [
          cyber            // CyberWay
        | gls              // Golos
        ]

```

Возможные переменные окружения `ENV`:

-   `GLS_NOTIFY_CONNECT` _(обязательно)_ - адрес подключения к микросервису нотификаций.

-   `GLS_CONNECTOR_HOST` _(обязательно)_ - адрес, который будет использован для входящих подключений связи микросервисов.
    Дефолтное значение при запуске без докера - `127.0.0.1`

-   `GLS_CONNECTOR_PORT` _(обязательно)_ - адрес порта, который будет использован для входящих подключений связи микросервисов.
    Дефолтное значение при запуске без докера - `8080`

-   `GLS_METRICS_HOST` _(обязательно)_ - адрес хоста для метрик StatsD.
    Дефолтное значение при запуске без докера - `127.0.0.1`

-   `GLS_METRICS_PORT` _(обязательно)_ - адрес порта для метрик StatsD.
    Дефолтное значение при запуске без докера - `8125`

-   `GLS_MONGO_CONNECT` - строка подключения к базе MongoDB.
    Дефолтное значение - `mongodb://mongo/admin`

-   `GLS_DAY_START` - время начала нового дня в часах относительно UTC.
    Дефолтное значение - `3` (день начинается в 00:00 по Москве).
