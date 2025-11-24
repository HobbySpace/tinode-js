# Tinode JavaScript SDK - Документация на русском языке

Это документация для JavaScript SDK Tinode - библиотеки для работы с сервером Tinode в браузерных приложениях.

## Что такое Tinode?

Tinode - это открытый сервер для обмена сообщениями в реальном времени. Этот SDK позволяет подключаться к серверу Tinode, отправлять и получать сообщения, управлять топиками (чатами) и пользователями.

## Быстрый старт

### Установка

Вы можете подключить SDK через CDN:

```html
<!-- Для продакшена -->
<script src="https://cdn.jsdelivr.net/npm/tinode-sdk/umd/tinode.prod.js"></script>

<!-- Для разработки -->
<script src="https://cdn.jsdelivr.net/npm/tinode-sdk/umd/tinode.dev.js"></script>
```

Или установить через npm:

```bash
npm install tinode-sdk
```

### Базовый пример использования

```javascript
// 1. Создаем экземпляр Tinode
const tinode = new Tinode({
  appName: 'МоеПриложение/1.0',
  host: 'wss://api.tinode.co',
  apiKey: 'YOUR_API_KEY',
  secure: true,
  persist: true  // Использовать локальное хранилище
}, () => {
  console.log('SDK инициализирован');
});

// 2. Включаем логирование (опционально)
tinode.enableLogging(true);

// 3. Обработка отключения
tinode.onDisconnect = (err) => {
  console.log('Соединение потеряно', err);
};

// 4. Подключаемся к серверу
tinode.connect('wss://api.tinode.co').then(() => {
  console.log('Подключено к серверу');
  
  // 5. Входим в систему
  return tinode.loginBasic('username', 'password');
}).then(ctrl => {
  console.log('Вход выполнен успешно');
  
  // 6. Получаем топик 'me' (личный топик пользователя)
  const me = tinode.getMeTopic();
  
  // 7. Подписываемся на топик 'me' и получаем список контактов
  me.subscribe({
    get: {
      desc: {},  // Получить описание
      sub: {}    // Получить подписки (контакты)
    }
  });
  
  // 8. Обработка обновлений контактов
  me.onSubsUpdated = (keys) => {
    console.log('Список контактов обновлен', keys);
  };
  
}).catch(err => {
  console.error('Ошибка:', err);
});
```

## Основные концепции

### Топики (Topics)

Топик - это канал общения. Существует несколько типов топиков:

- **'me'** - личный топик пользователя, содержит информацию о пользователе и список контактов
- **'fnd'** - топик для поиска пользователей и групп
- **'grp'** - групповой чат
- **'p2p'** - приватный чат между двумя пользователями
- **'chn'** - канал (broadcast)

### Подписки (Subscriptions)

Чтобы получать сообщения из топика, нужно на него подписаться. Подписка позволяет:
- Получать новые сообщения
- Получать обновления метаданных
- Отслеживать присутствие пользователей

### Сообщения (Messages)

Сообщения могут быть:
- Простым текстом
- Форматированным текстом (Drafty)
- Медиа-файлами
- Системными уведомлениями

## Основные операции

### Подключение и аутентификация

#### Подключение к серверу

```javascript
tinode.connect('wss://api.tinode.co')
  .then(() => {
    console.log('Подключено');
  })
  .catch(err => {
    console.error('Ошибка подключения:', err);
  });
```

#### Вход в систему

**Базовая аутентификация (логин/пароль):**

```javascript
tinode.loginBasic('username', 'password')
  .then(ctrl => {
    console.log('Вход выполнен', ctrl);
  });
```

**Аутентификация по токену:**

```javascript
// Получить токен после первого входа
const token = tinode.getAuthToken();

// Использовать токен для последующих входов
tinode.loginToken(token.token)
  .then(ctrl => {
    console.log('Вход по токену выполнен');
  });
```

#### Создание аккаунта

```javascript
tinode.createAccountBasic('username', 'password', {
  public: {
    fn: 'Имя Фамилия',
    photo: 'URL_ФОТО'
  },
  tags: ['email:user@example.com']
})
  .then(ctrl => {
    console.log('Аккаунт создан');
  });
```

### Работа с топиками

#### Получение топика

```javascript
// Получить существующий топик
const topic = tinode.getTopic('grpABC123');

// Получить личный топик
const me = tinode.getMeTopic();

// Получить топик для поиска
const fnd = tinode.getFndTopic();
```

#### Подписка на топик

```javascript
const topic = tinode.getTopic('grpABC123');

topic.subscribe({
  get: {
    desc: {},      // Получить описание топика
    sub: {},       // Получить список подписчиков
    data: {        // Получить последние сообщения
      limit: 20
    }
  }
}).then(ctrl => {
  console.log('Подписан на топик');
});
```

#### Создание нового группового топика

```javascript
// Создать имя для нового топика
const topicName = tinode.newGroupTopicName();

// Получить топик
const topic = tinode.getTopic(topicName);

// Подписаться с параметрами создания
topic.subscribe({
  get: { desc: {}, sub: {} },
  set: {
    desc: {
      public: {
        fn: 'Название группы',
        photo: 'URL_ФОТО'
      }
    }
  }
}).then(ctrl => {
  console.log('Группа создана:', ctrl.topic);
});
```

#### Отписка от топика

```javascript
topic.leave(true)  // true = полностью отписаться
  .then(() => {
    console.log('Отписан от топика');
  });
```

### Отправка и получение сообщений

#### Отправка сообщения

```javascript
// Простое текстовое сообщение
topic.publish('Привет, мир!')
  .then(ctrl => {
    console.log('Сообщение отправлено');
  });

// Создать черновик перед отправкой
const draft = topic.createMessage('Привет!');
// ... можно редактировать draft ...
topic.publishMessage(draft);
```

#### Получение сообщений

```javascript
// Обработка новых сообщений
topic.onData = (data) => {
  console.log('Новое сообщение:', data);
  console.log('От:', data.from);
  console.log('Текст:', data.content);
  console.log('Время:', data.ts);
};

// Получить историю сообщений
topic.getMeta({
  data: {
    limit: 50  // Получить последние 50 сообщений
  }
}).then(meta => {
  console.log('Получены сообщения');
});
```

#### Получение более старых сообщений

```javascript
// Получить сообщения старше самого раннего в кэше
topic.getMessagesPage(20, [], 0, topic.minMsgSeq(), false)
  .then(() => {
    console.log('Загружены старые сообщения');
  });
```

### Управление метаданными топика

#### Получение метаданных

```javascript
// Использовать построитель запросов
const query = topic.startMetaQuery()
  .withDesc()           // Получить описание
  .withSub()            // Получить подписчиков
  .withLaterData(20)    // Получить новые сообщения
  .build();

topic.getMeta(query)
  .then(meta => {
    console.log('Описание:', meta.desc);
    console.log('Подписчики:', meta.sub);
  });
```

#### Обновление метаданных

```javascript
// Изменить название группы
topic.setMeta({
  desc: {
    public: {
      fn: 'Новое название группы'
    }
  }
}).then(() => {
  console.log('Название обновлено');
});
```

### Управление подписчиками

#### Приглашение пользователя в группу

```javascript
topic.invite('userID123', 'RW')  // RW = права чтения и записи
  .then(() => {
    console.log('Пользователь приглашен');
  });
```

#### Удаление подписчика

```javascript
topic.delSubscription('userID123')
  .then(() => {
    console.log('Пользователь удален');
  });
```

#### Получение списка подписчиков

```javascript
topic.subscribers((sub, uid) => {
  console.log('Подписчик:', uid, sub);
});
```

### Управление сообщениями

#### Удаление сообщений

```javascript
// Удалить одно сообщение
topic.delMessagesList([123], false)  // false = мягкое удаление
  .then(() => {
    console.log('Сообщение удалено');
  });

// Удалить диапазон сообщений
topic.delMessages([
  { low: 100, hi: 150 }
], false);

// Удалить все сообщения
topic.delMessagesAll(false);
```

#### Закрепление сообщений

```javascript
// Закрепить сообщение
topic.pinMessage(123, true)
  .then(() => {
    console.log('Сообщение закреплено');
  });

// Открепить сообщение
topic.pinMessage(123, false);
```

### Уведомления о прочтении

#### Отметить сообщение как полученное

```javascript
topic.noteRecv(123);  // Отметить сообщение с ID 123 как полученное
```

#### Отметить сообщение как прочитанное

```javascript
topic.noteRead(123);  // Отметить сообщение с ID 123 как прочитанное
// Или отметить все до последнего
topic.noteRead();     // Отметить все сообщения как прочитанные
```

#### Уведомление о наборе текста

```javascript
topic.noteKeyPress();  // Отправить уведомление "пользователь печатает"
```

### Работа с контактами (топик 'me')

#### Получение списка контактов

```javascript
const me = tinode.getMeTopic();

me.subscribe({
  get: { sub: {} }
});

// Обработка обновлений контактов
me.onSubsUpdated = (keys) => {
  console.log('Обновлены контакты:', keys);
};

// Перебрать все контакты
me.contacts((contact, idx) => {
  console.log('Контакт:', contact.name, contact.public);
});
```

#### Получение конкретного контакта

```javascript
const contact = me.getContact('userID123');
if (contact) {
  console.log('Контакт найден:', contact.public);
}
```

#### Архивирование контакта

```javascript
topic.archive(true)   // Архивировать
  .then(() => {
    console.log('Контакт архивирован');
  });

topic.archive(false)  // Разархивировать
```

### Поиск пользователей (топик 'fnd')

```javascript
const fnd = tinode.getFndTopic();

// Подписаться на топик поиска
fnd.subscribe({
  get: { sub: {} }
});

// Выполнить поиск
fnd.setMeta({
  desc: {
    public: 'поисковый запрос'
  }
}).then(() => {
  // Перебрать найденные результаты
  fnd.contacts((contact, idx) => {
    console.log('Найден:', contact);
  });
});
```

### Управление аккаунтом

#### Обновление профиля

```javascript
tinode.account(tinode.getCurrentUserID(), 'basic', null, false, {
  desc: {
    public: {
      fn: 'Новое имя',
      photo: 'URL_НОВОЙ_ФОТО'
    }
  }
}).then(() => {
  console.log('Профиль обновлен');
});
```

#### Управление учетными данными

```javascript
const me = tinode.getMeTopic();

// Получить учетные данные
const creds = me.getCredentials();
console.log('Email и телефон:', creds);

// Удалить учетное данное
me.delCredential('email', 'user@example.com')
  .then(() => {
    console.log('Email удален');
  });
```

## Callbacks (обратные вызовы)

SDK использует систему callbacks для уведомления о событиях:

### Callbacks на уровне Tinode

```javascript
// При подключении
tinode.onConnect = () => {
  console.log('Подключено к серверу');
};

// При отключении
tinode.onDisconnect = (err) => {
  console.log('Отключено от сервера', err);
};

// При входе
tinode.onLogin = (code, text) => {
  console.log('Вход выполнен:', code, text);
};

// При получении контрольного сообщения
tinode.onCtrlMessage = (ctrl) => {
  console.log('Контрольное сообщение:', ctrl);
};

// При получении сообщения с данными
tinode.onDataMessage = (data) => {
  console.log('Сообщение:', data);
};
```

### Callbacks на уровне топика

```javascript
const topic = tinode.getTopic('grpABC123');

// Новое сообщение
topic.onData = (data) => {
  console.log('Новое сообщение в топике:', data);
};

// Обновление описания топика
topic.onMetaDesc = (desc) => {
  console.log('Описание топика обновлено:', desc);
};

// Обновление подписчика
topic.onMetaSub = (sub) => {
  console.log('Подписчик обновлен:', sub);
};

// Обновление всех подписчиков
topic.onSubsUpdated = (keys, count) => {
  console.log('Подписчики обновлены:', keys, count);
};

// Изменение присутствия (онлайн/оффлайн)
topic.onPres = (pres) => {
  if (pres.what === 'on') {
    console.log('Пользователь онлайн:', pres.src);
  } else if (pres.what === 'off') {
    console.log('Пользователь оффлайн:', pres.src);
  }
};

// Информационные уведомления (прочитано, получено)
topic.onInfo = (info) => {
  if (info.what === 'read') {
    console.log('Сообщение прочитано:', info.seq);
  }
};
```

## Режимы доступа (Access Modes)

Режимы доступа определяют, что пользователь может делать в топике:

- **J** (Join) - может присоединяться
- **R** (Read) - может читать сообщения
- **W** (Write) - может писать сообщения
- **P** (Presence) - получает уведомления о присутствии
- **A** (Approve) - может одобрять запросы
- **S** (Share) - может приглашать других
- **D** (Delete) - может удалять сообщения
- **O** (Owner) - владелец топика

### Работа с режимами доступа

```javascript
const topic = tinode.getTopic('grpABC123');

// Получить режим доступа
const acs = topic.getAccessMode();
console.log('Текущий режим:', acs.getMode());  // Например, "RW"

// Проверить права
if (acs.isWriter()) {
  console.log('Может писать');
}

if (acs.isReader()) {
  console.log('Может читать');
}

// Обновить режим доступа
topic.updateMode(null, '+W')  // Добавить право записи
  .then(() => {
    console.log('Права обновлены');
  });
```

## Обработка ошибок

```javascript
tinode.loginBasic('username', 'password')
  .then(ctrl => {
    console.log('Успешный вход');
  })
  .catch(err => {
    if (err.code === 401) {
      console.error('Неверный логин или пароль');
    } else if (err.code === 403) {
      console.error('Доступ запрещен');
    } else {
      console.error('Ошибка:', err.message, err.code);
    }
  });
```

## Локальное хранилище

SDK может использовать IndexedDB для локального кэширования:

```javascript
const tinode = new Tinode({
  // ...
  persist: true  // Включить локальное хранилище
}, () => {
  console.log('Хранилище инициализировано');
});

// Очистить хранилище
tinode.clearStorage()
  .then(() => {
    console.log('Хранилище очищено');
  });
```

## Переподключение

SDK автоматически пытается переподключиться при потере соединения:

```javascript
// Обработка попыток переподключения
tinode.onAutoreconnectIteration = (timeout, promise) => {
  console.log('Попытка переподключения через', timeout, 'мс');
  
  promise.then(() => {
    console.log('Переподключение успешно');
  }).catch(err => {
    console.log('Переподключение не удалось');
  });
};
```

## Логирование

```javascript
// Включить логирование
tinode.enableLogging(true);

// Включить логирование с обрезкой длинных строк
tinode.enableLogging(true, true);
```

## Полезные методы

### Проверка типа топика

```javascript
// Статические методы
Tinode.topicType('grpABC123');  // 'grp'
Tinode.isGroupTopicName('grpABC123');  // true
Tinode.isP2PTopicName('usrABC123');    // true
```

### Работа с тегами

```javascript
// Проверить валидность тега
Tinode.isValidTagValue('my-tag');  // true

// Разделить тег на префикс и значение
Tinode.tagSplit('email:user@example.com');
// { prefix: 'email', value: 'user@example.com' }

// Найти тег по префиксу
const tags = ['email:user@example.com', 'tel:+1234567890'];
Tinode.tagByPrefix(tags, 'email');  // 'email:user@example.com'
```

### Получение информации

```javascript
// Версия SDK
console.log(Tinode.getVersion());

// Информация о сервере
const serverInfo = tinode.getServerInfo();
console.log('Версия сервера:', serverInfo.ver);

// Параметры сервера
const maxMsgSize = tinode.getServerParam('maxMessageSize', 65536);
console.log('Максимальный размер сообщения:', maxMsgSize);
```

## Примеры использования

### Простой чат

```javascript
// Создать или получить топик
const topic = tinode.getTopic('grpABC123');

// Подписаться
topic.subscribe({
  get: {
    desc: {},
    data: { limit: 50 }
  }
});

// Обработка сообщений
topic.onData = (data) => {
  if (data) {
    console.log(`${data.from}: ${data.content}`);
  }
};

// Отправка сообщения
function sendMessage(text) {
  topic.publish(text)
    .then(() => {
      console.log('Отправлено');
    })
    .catch(err => {
      console.error('Ошибка отправки:', err);
    });
}
```

### Отслеживание онлайн статуса

```javascript
const topic = tinode.getTopic('grpABC123');

topic.onPres = (pres) => {
  if (pres.what === 'on') {
    console.log('Пользователь', pres.src, 'онлайн');
  } else if (pres.what === 'off') {
    console.log('Пользователь', pres.src, 'оффлайн');
  }
};

// Проверить, онлайн ли топик
if (tinode.isTopicOnline('grpABC123')) {
  console.log('Топик онлайн');
}
```

### Загрузка истории сообщений

```javascript
const topic = tinode.getTopic('grpABC123');

// Подписаться и загрузить последние сообщения
topic.subscribe({
  get: {
    data: { limit: 20 }
  }
}).then(() => {
  // Перебрать загруженные сообщения
  topic.messages((msg, prev, next) => {
    console.log('Сообщение:', msg.content);
  });
  
  // Загрузить более старые сообщения
  if (topic.minMsgSeq() > 1) {
    topic.getMessagesPage(20, [], 0, topic.minMsgSeq(), false)
      .then(() => {
        console.log('Загружена история');
      });
  }
});
```

## TypeScript поддержка

Если вы используете TypeScript, типы доступны в файле `tinode.d.ts`:

```typescript
import { Tinode, Topic, TopicMe, AccessMode } from 'tinode-sdk';

const tinode: Tinode = new Tinode({
  appName: 'MyApp/1.0',
  host: 'wss://api.tinode.co',
  apiKey: 'YOUR_API_KEY'
});

const me: TopicMe = tinode.getMeTopic();
```

## Дополнительные ресурсы

- [Официальная документация API](http://tinode.github.io/js-api/)
- [Документация сервера](https://github.com/tinode/chat/blob/master/docs/API.md)
- [Примеры использования](https://github.com/tinode/webapp)
- [Форум поддержки](https://groups.google.com/d/forum/tinode)

## Поддержка

Если у вас возникли вопросы или проблемы:

1. Проверьте документацию API
2. Задайте вопрос на [форуме](https://groups.google.com/d/forum/tinode)
3. Создайте [issue на GitHub](https://github.com/tinode/tinode-js/issues/new)

---

**Примечание:** Эта документация описывает основные возможности SDK. Для полной информации смотрите официальную документацию API.

