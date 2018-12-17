# PUSH-SERVICE

**PUSH-SERVICE** является микросервисом рассылки push-уведомлений на мобильные устройства и браузеры пользователей [golos.io](https://golos.io).
Также хранит настройки пользователя, указывающие на необходимость рассылки конкретных типов уведомлений и их язык.

API JSON-RPC:

 ```
 transfer:                                      // Передача сообщения, отправляется с сервиса нотификаций
     user:       <string>                       // Имя пользователя
     data:       <{notifyType->[notifyEvent]}>  // Нотификации в виде объекта тип->массив_событий

 getOptions:                                    // Получение настроек
     key:        <string>                       // Уникальный ключ устройства

 setOptions:                                    // Установка настроек
     key:        <string>                       // Уникальный ключ устройства
     lang:       <'ru'|'en'|'by'>               // Язык сообщений
     show:       <{notifyType->boolean}>        // Настройки отображения в виде тип->нужно_отображать
    
 notifyOn:              // Подписаться на рассылку нотификаций
     user <string>      // Имя пользователя
     profile <profile>  // Профиль пользователя
    
 notifyOff:             // Отписаться от рассылки нотификаций
     user <string>      // Имя пользователя
     profile <profile>  // Профиль пользователя
    
 history:
     user <string>                      // Имя пользователя
     profile <profile>                  // Профиль пользователя
     afterId <string|null>(null)        // ID после которого нужно начать показывать историю, опционально
     limit <number>(10)                 // Необходимое количество строк истории
     markAsViewed <boolean>(true)       // Пометить ли все выгруженные записи как прочитанные
     freshOnly <boolean>(false)         // Возвратить только непрочитанные данные
     types <string[]|'all'|null>(null)  // Массив необходимых типов нотификаций из которого будут вычтены те типы,
                                        // которые пользователь отключил в своих настройках.
                                        // Отсутствие параметра эквивалентно запросу 'all', который возвращает
                                        // все доступные типы согласно настройкам пользователя.
         [
           vote                         // лайк (голос)
         | flag                         // флаг (дизлайк, жалоба)
         | transfer                     // перевод средств
         | reply                        // ответ на пост или комментарий
         | subscribe                    // подписка на блог
         | unsubscribe                  // отписка от блога
         | mention                      // упоминание в посте, заголовке поста или в комменте (через @)
         | repost                       // репост
         | reward                       // награда пользователю 
         | curatorReward                // награда куратору     
         | message                      // личное сообщение (не реализованно в данной версии)
         | witnessVote                  // голос за делегата
         | witnessCancelVote            // отмена голоса за делегата
         ]                                                    
 
 historyFresh:
     user <string>      // Имя пользователя
     profile <profile>  // Профиль пользователя   
    
 ```

Возможные переменные окружения `ENV`:

 - `GLS_NOTIFY_CONNECT` *(обязательно)* - адрес подключения к микросервису нотификаций.

 - `GLS_CONNECTOR_HOST` *(обязательно)* - адрес, который будет использован для входящих подключений связи микросервисов.
  Дефолтное значение при запуске без докера - `127.0.0.1`

 - `GLS_CONNECTOR_PORT` *(обязательно)* - адрес порта, который будет использован для входящих подключений связи микросервисов.
  Дефолтное значение при запуске без докера - `8080`

 - `GLS_METRICS_HOST` *(обязательно)* - адрес хоста для метрик StatsD.
  Дефолтное значение при запуске без докера - `127.0.0.1`

 - `GLS_METRICS_PORT` *(обязательно)* - адрес порта для метрик StatsD.
  Дефолтное значение при запуске без докера - `8125`

 - `GLS_MONGO_CONNECT` - строка подключения к базе MongoDB.
  Дефолтное значение - `mongodb://mongo/admin`

 - `GLS_DAY_START` - время начала нового дня в часах относительно UTC.
  Дефолтное значение - `3` (день начинается в 00:00 по Москве).