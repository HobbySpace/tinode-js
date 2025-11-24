/**
 * TypeScript определения типов для Tinode JavaScript SDK
 * @module tinode-sdk
 */

// ============================================================================
// Базовые типы и интерфейсы
// ============================================================================

/**
 * Конфигурация для создания экземпляра Tinode
 */
export interface TinodeConfig {
    /** Имя приложения для отправки в User-Agent */
    appName?: string;
    /** Имя хоста и опциональный порт для подключения */
    host?: string;
    /** API ключ, сгенерированный keygen */
    apiKey?: string;
    /** Транспорт: 'ws' для WebSocket или 'lp' для long polling */
    transport?: 'ws' | 'lp';
    /** Использовать защищенное WebSocket соединение */
    secure?: boolean;
    /** Платформа: 'ios', 'web', 'android' */
    platform?: 'ios' | 'web' | 'android';
    /** Использовать IndexedDB для постоянного хранения */
    persist?: boolean;
}

/**
 * Параметры сервера, полученные при подключении
 */
export interface ServerParams {
    /** Версия сервера */
    ver?: string;
    /** Сборка сервера */
    build?: string;
    /** ID сессии (только для long polling) */
    sid?: string;
}

/**
 * Токен аутентификации
 */
export interface AuthToken {
    /** Значение токена */
    token: string;
    /** Время истечения токена */
    expires: Date;
}

/**
 * Параметры для создания/обновления аккаунта
 */
export interface AccountParams {
    /** Параметры доступа по умолчанию для топика 'me' */
    defacs?: DefAcs;
    /** Публичные данные приложения, доступные в топике 'me' */
    public?: Record<string, any>;
    /** Приватные данные приложения, доступные только владельцу в топике 'me' */
    private?: Record<string, any>;
    /** Доверенные данные пользователя, которые может установить только root */
    trusted?: Record<string, any>;
    /** Массив строковых тегов для поиска пользователей */
    tags?: string[];
    /** Временная схема аутентификации для сброса пароля */
    scheme?: string;
    /** Временный секрет аутентификации для сброса пароля */
    secret?: string;
    /** Массив ссылок на вложения вне диапазона, используемые в описании аккаунта */
    attachments?: string[];
    /** Учетные данные */
    cred?: Credential[];
}

/**
 * Параметры доступа по умолчанию
 */
export interface DefAcs {
    /** Режим доступа для 'me' для аутентифицированных пользователей */
    auth?: string;
    /** Режим доступа для 'me' для анонимных пользователей */
    anon?: string;
}

/**
 * Учетные данные (email, телефон и т.д.)
 */
export interface Credential {
    /** Метод валидации (например, 'email' или 'tel') */
    meth: string;
    /** Значение для валидации (например, 'alice@example.com') */
    val?: string;
    /** Ответ валидации */
    resp?: string;
    /** Параметры валидации */
    params?: Record<string, any>;
    /** Подтверждено ли учетное данное */
    done?: boolean;
}

/**
 * Параметры для запроса метаданных (get)
 */
export interface GetQuery {
    /** Если предоставлено (даже если пустое), получить описание топика */
    desc?: GetOptsType;
    /** Если предоставлено (даже если пустое), получить подписки топика */
    sub?: GetOptsType;
    /** Если предоставлено (даже если пустое), получить сообщения */
    data?: GetDataType;
    /** Если предоставлено, получить теги */
    tags?: boolean;
    /** Если предоставлено, получить учетные данные (только для 'me') */
    cred?: boolean;
    /** Если предоставлено, получить вспомогательные данные */
    aux?: boolean;
    /** Если предоставлено, получить информацию об удаленных сообщениях */
    del?: GetDelType;
}

/**
 * Опции для запроса метаданных
 */
export interface GetOptsType {
    /** "Если изменено с", получить данные только если они были изменены с указанной даты */
    ims?: Date;
    /** Максимальное количество результатов для возврата. Игнорируется при запросе описания топика */
    limit?: number;
    /** ID пользователя или имя топика для получения одной подписки */
    user?: string;
    /** ID пользователя или имя топика для получения одной подписки */
    topic?: string;
}

/**
 * Параметры для запроса данных (сообщений)
 */
export interface GetDataType {
    /** Загрузить сообщения с seq ID равным или больше этого значения */
    since?: number;
    /** Загрузить сообщения с seq ID меньше этого числа */
    before?: number;
    /** Максимальное количество результатов для возврата */
    limit?: number;
    /** Диапазоны seq ID для получения */
    ranges?: SeqRange[];
}

/**
 * Параметры для запроса информации об удаленных сообщениях
 */
export interface GetDelType {
    /** ID удаленных сообщений с этого 'del' id (включительно) */
    since?: number;
    /** Количество ID удаленных сообщений для получения */
    limit?: number;
}

/**
 * Диапазон ID сообщений
 */
export interface SeqRange {
    /** Нижний конец диапазона, включительно (закрытый) */
    low: number;
    /** Верхний конец диапазона, исключительно (открытый) */
    hi?: number;
}

/**
 * Параметры для установки метаданных (set)
 */
export interface SetParams {
    /** Параметры инициализации топика при создании нового топика или новой подписки */
    desc?: SetDesc;
    /** Параметры инициализации подписки */
    sub?: SetSub;
    /** Теги для поиска */
    tags?: string[];
    /** Вспомогательные данные топика */
    aux?: Record<string, any>;
    /** Учетные данные */
    cred?: Credential[];
    /** URL вложений вне диапазона, используемые в параметрах */
    attachments?: string[];
}

/**
 * Параметры описания для установки
 */
export interface SetDesc {
    /** Режим доступа по умолчанию */
    defacs?: DefAcs;
    /** Свободное описание топика, публично доступное */
    public?: Record<string, any>;
    /** Свободное описание топика, доступное только владельцу */
    private?: Record<string, any>;
    /** Доверенные данные пользователя, которые может установить только root */
    trusted?: Record<string, any>;
}

/**
 * Параметры подписки для установки
 */
export interface SetSub {
    /** UID пользователя, на которого влияет запрос. По умолчанию (пустое) - текущий пользователь */
    user?: string;
    /** Режим доступа пользователя, либо запрошенный, либо назначенный в зависимости от контекста */
    mode?: string;
}

/**
 * Контрольное сообщение от сервера
 */
export interface CtrlMessage {
    /** ID сообщения */
    id?: string;
    /** Код результата (HTTP статус код) */
    code: number;
    /** Текст объяснения результата */
    text: string;
    /** Параметры ответа */
    params?: Record<string, any>;
    /** Имя топика */
    topic?: string;
    /** Временная метка */
    ts?: Date;
}

/**
 * Сообщение с данными
 */
export interface DataMessage {
    /** ID сообщения */
    id?: string;
    /** Имя топика */
    topic: string;
    /** ID последовательности сообщения */
    seq: number;
    /** ID отправителя */
    from?: string;
    /** Временная метка */
    ts: Date;
    /** Заголовки сообщения */
    head?: MessageHead;
    /** Содержимое сообщения */
    content: any;
    /** Не отправлять эхо обратно в исходную сессию */
    noecho?: boolean;
    /** Внутренние флаги состояния */
    _sending?: boolean;
    /** Внутренние флаги состояния */
    _failed?: boolean;
    /** Внутренние флаги состояния */
    _fatal?: boolean;
    /** Внутренние флаги состояния */
    _cancelled?: boolean;
    /** Внутренние флаги состояния */
    _noForwarding?: boolean;
    /** Внутренние флаги состояния */
    _deleted?: boolean;
    /** Внутренние флаги состояния */
    _status?: number;
}

/**
 * Заголовки сообщения
 */
export interface MessageHead {
    /** MIME тип содержимого */
    mime?: string;
    /** ID сообщения для замены (для редактирования) */
    replace?: string;
    /** WebRTC состояние */
    webrtc?: string;
    /** Продолжительность WebRTC */
    'webrtc-duration'?: number;
    /** Видео вызов */
    vc?: boolean;
}

/**
 * Сообщение присутствия
 */
export interface PresMessage {
    /** Имя топика */
    topic: string;
    /** Тип события */
    what: 'on' | 'off' | 'upd' | 'acs' | 'ua' | 'gone' | 'term' | 'msg' | 'read' | 'recv' | 'del' | 'tags';
    /** Источник события (UID пользователя) */
    src?: string;
    /** Целевой пользователь */
    tgt?: string;
    /** Режим доступа */
    dacs?: any;
    /** ID последовательности */
    seq?: number;
    /** Действие */
    act?: string;
    /** User-Agent */
    ua?: string;
    /** ID удаления */
    clear?: number;
    /** Диапазоны удаленных сообщений */
    delseq?: SeqRange[];
}

/**
 * Информационное сообщение (read/received уведомления и нажатия клавиш)
 */
export interface InfoMessage {
    /** Имя топика */
    topic: string;
    /** Тип события */
    what: 'recv' | 'read' | 'kp' | 'kpa' | 'kpv' | 'call';
    /** ID отправителя */
    from?: string;
    /** ID последовательности сообщения */
    seq?: number;
    /** ID события */
    id?: string;
    /** Событие вызова */
    event?: string;
    /** Полезная нагрузка события */
    payload?: string;
}

/**
 * Метаданные топика
 */
export interface MetaMessage {
    /** ID сообщения */
    id?: string;
    /** Имя топика */
    topic: string;
    /** Описание топика */
    desc?: TopicDesc;
    /** Подписки */
    sub?: Subscription[];
    /** Теги */
    tags?: string[];
    /** Учетные данные */
    cred?: Credential[];
    /** Вспомогательные данные */
    aux?: Record<string, any>;
    /** Информация об удалениях */
    del?: {
        clear: number;
        delseq: SeqRange[];
    };
}

/**
 * Описание топика
 */
export interface TopicDesc {
    /** Временная метка создания */
    created?: Date;
    /** Временная метка последнего обновления */
    updated?: Date;
    /** Временная метка последнего сообщения */
    touched?: Date;
    /** Режим доступа */
    acs?: AccessMode | any;
    /** Режим доступа по умолчанию */
    defacs?: DefAcs;
    /** Публичные данные */
    public?: Record<string, any>;
    /** Приватные данные */
    private?: Record<string, any>;
    /** Доверенные данные */
    trusted?: Record<string, any>;
    /** Последовательность последнего сообщения */
    seq?: number;
    /** Последовательность последнего прочитанного сообщения */
    read?: number;
    /** Последовательность последнего полученного сообщения */
    recv?: number;
    /** Количество непрочитанных сообщений */
    unread?: number;
    /** Онлайн статус */
    online?: boolean;
    /** Информация о последнем визите */
    seen?: {
        when?: Date;
        ua?: string;
    };
}

/**
 * Подписка на топик
 */
export interface Subscription {
    /** ID пользователя */
    user: string;
    /** Имя топика */
    topic?: string;
    /** Режим доступа */
    acs?: AccessMode | any;
    /** Временная метка обновления */
    updated?: Date;
    /** Временная метка последнего сообщения */
    touched?: Date;
    /** Последовательность последнего сообщения */
    seq?: number;
    /** Последовательность последнего прочитанного сообщения */
    read?: number;
    /** Последовательность последнего полученного сообщения */
    recv?: number;
    /** Количество непрочитанных сообщений */
    unread?: number;
    /** Онлайн статус */
    online?: boolean;
    /** Публичные данные пользователя */
    public?: Record<string, any>;
    /** Приватные данные пользователя */
    private?: Record<string, any>;
    /** Удалена ли подписка */
    deleted?: boolean;
    /** Информация о последнем визите */
    seen?: {
        when?: Date;
        ua?: string;
    };
}

/**
 * Класс для работы с режимом доступа
 */
export declare class AccessMode {
    /** Режим доступа */
    mode: number;
    /** Выданные права */
    given: number;
    /** Запрошенные права */
    want: number;

    constructor(acs?: AccessMode | { mode?: string | number; given?: string | number; want?: string | number });

    /** Декодировать строку в числовое значение режима доступа */
    static decode(str: string | number | null): number | null;
    /** Закодировать числовое значение в строку */
    static encode(val: number | null): string | null;
    /** Обновить режим доступа */
    static update(val: number, upd: string): number;
    /** Разница между двумя режимами доступа */
    static diff(a1: number | string, a2: number | string): number;

    /** Установить режим */
    setMode(m: string | number): AccessMode;
    /** Обновить режим */
    updateMode(u: string): AccessMode;
    /** Получить режим как строку */
    getMode(): string | null;
    /** Установить выданные права */
    setGiven(g: string | number): AccessMode;
    /** Обновить выданные права */
    updateGiven(u: string): AccessMode;
    /** Получить выданные права как строку */
    getGiven(): string | null;
    /** Установить запрошенные права */
    setWant(w: string | number): AccessMode;
    /** Обновить запрошенные права */
    updateWant(u: string): AccessMode;
    /** Получить запрошенные права как строку */
    getWant(): string | null;
    /** Получить отсутствующие права */
    getMissing(): string | null;
    /** Получить избыточные права */
    getExcessive(): string | null;
    /** Обновить все значения */
    updateAll(val: AccessMode | any): AccessMode;
    /** Проверить, является ли владельцем */
    isOwner(side?: 'given' | 'want' | 'mode'): boolean;
    /** Проверить, имеет ли право на присутствие */
    isPresencer(side?: 'given' | 'want' | 'mode'): boolean;
    /** Проверить, заглушен ли */
    isMuted(side?: 'given' | 'want' | 'mode'): boolean;
    /** Проверить, может ли присоединяться */
    isJoiner(side?: 'given' | 'want' | 'mode'): boolean;
    /** Проверить, может ли читать */
    isReader(side?: 'given' | 'want' | 'mode'): boolean;
    /** Проверить, может ли писать */
    isWriter(side?: 'given' | 'want' | 'mode'): boolean;
    /** Проверить, может ли одобрять */
    isApprover(side?: 'given' | 'want' | 'mode'): boolean;
    /** Проверить, является ли администратором */
    isAdmin(side?: 'given' | 'want' | 'mode'): boolean;
    /** Проверить, может ли делиться */
    isSharer(side?: 'given' | 'want' | 'mode'): boolean;
    /** Проверить, может ли удалять */
    isDeleter(side?: 'given' | 'want' | 'mode'): boolean;
    /** Преобразовать в JSON */
    jsonHelper(): { mode: string | null; given: string | null; want: string | null };
    /** Преобразовать в строку */
    toString(): string;
}

/**
 * Класс для построения запросов метаданных
 */
export declare class MetaGetBuilder {
    constructor(parent: Topic);

    /** Добавить параметры для получения сообщений в явных пределах */
    withData(since?: number, before?: number, limit?: number): MetaGetBuilder;
    /** Добавить параметры для получения сообщений новее последнего сохраненного */
    withLaterData(limit?: number): MetaGetBuilder;
    /** Добавить параметры для получения сообщений в диапазонах ID */
    withDataRanges(ranges: SeqRange[], limit?: number): MetaGetBuilder;
    /** Добавить параметры для получения сообщений по массиву ID */
    withDataList(list: number[]): MetaGetBuilder;
    /** Добавить параметры для получения сообщений старше самого раннего сохраненного */
    withEarlierData(limit?: number): MetaGetBuilder;
    /** Добавить параметры для получения описания топика */
    withDesc(ims?: Date): MetaGetBuilder;
    /** Добавить параметры для получения описания топика, если оно новее последнего обновления */
    withLaterDesc(): MetaGetBuilder;
    /** Добавить параметры для получения подписок */
    withSub(ims?: Date, limit?: number, userOrTopic?: string): MetaGetBuilder;
    /** Добавить параметры для получения одной подписки */
    withOneSub(ims?: Date, userOrTopic?: string): MetaGetBuilder;
    /** Добавить параметры для получения одной подписки, если она обновлена с последнего обновления */
    withLaterOneSub(userOrTopic?: string): MetaGetBuilder;
    /** Добавить параметры для получения подписок, обновленных с последнего обновления */
    withLaterSub(limit?: number): MetaGetBuilder;
    /** Добавить параметры для получения тегов топика */
    withTags(): MetaGetBuilder;
    /** Добавить параметры для получения учетных данных пользователя (только для 'me') */
    withCred(): MetaGetBuilder;
    /** Добавить параметры для получения вспомогательных данных */
    withAux(): MetaGetBuilder;
    /** Добавить параметры для получения удаленных сообщений */
    withDel(since?: number, limit?: number): MetaGetBuilder;
    /** Добавить параметры для получения сообщений, удаленных после сохраненного 'del' id */
    withLaterDel(limit?: number): MetaGetBuilder;
    /** Извлечь подзапрос */
    extract(what: string): any;
    /** Построить параметры запроса */
    build(): GetQuery | undefined;
}

/**
 * Базовый класс топика
 */
export declare class Topic {
    /** Имя топика */
    name: string;
    /** Временная метка создания */
    created: Date | null;
    /** Временная метка последнего обновления */
    updated: Date | null;
    /** Временная метка последнего сообщения */
    touched: Date;
    /** Режим доступа */
    acs: AccessMode;
    /** Приватные данные топика */
    private: Record<string, any> | null;
    /** Публичные данные топика */
    public: Record<string, any> | null;
    /** Доверенные данные топика */
    trusted: Record<string, any> | null;
    /** Режим доступа по умолчанию */
    defacs?: DefAcs;
    /** Последовательность последнего сообщения */
    seq?: number;
    /** Последовательность последнего прочитанного сообщения */
    read?: number;
    /** Последовательность последнего полученного сообщения */
    recv?: number;
    /** Количество непрочитанных сообщений */
    unread?: number;
    /** Онлайн статус */
    online?: boolean;
    /** Информация о последнем визите */
    seen?: {
        when?: Date;
        ua?: string;
    };

    constructor(name: string, callbacks?: TopicCallbacks);

    /** Определить тип топика по имени */
    static topicType(name: string): 'me' | 'fnd' | 'sys' | 'grp' | 'p2p' | undefined;
    /** Проверить, является ли имя именем топика 'me' */
    static isMeTopicName(name: string): boolean;
    /** Проверить, является ли имя именем топика 'slf' */
    static isSelfTopicName(name: string): boolean;
    /** Проверить, является ли имя именем группового топика */
    static isGroupTopicName(name: string): boolean;
    /** Проверить, является ли имя именем p2p топика */
    static isP2PTopicName(name: string): boolean;
    /** Проверить, является ли имя именем коммуникационного топика (P2P или группа) */
    static isCommTopicName(name: string): boolean;
    /** Проверить, является ли имя именем нового топика */
    static isNewGroupTopicName(name: string): boolean;
    /** Проверить, является ли имя именем канала */
    static isChannelTopicName(name: string): boolean;

    /** Проверить, подписан ли топик */
    isSubscribed(): boolean;
    /** Подписаться на топик */
    subscribe(getParams?: GetQuery, setParams?: SetParams): Promise<CtrlMessage>;
    /** Создать черновик сообщения без отправки */
    createMessage(data: string | any, noEcho?: boolean): any;
    /** Опубликовать данные в топик */
    publish(data: string | any, noEcho?: boolean): Promise<CtrlMessage>;
    /** Опубликовать сообщение */
    publishMessage(pub: any): Promise<CtrlMessage>;
    /** Опубликовать черновик сообщения */
    publishDraft(pub: any, prom?: Promise<any>): Promise<CtrlMessage>;
    /** Покинуть топик */
    leave(unsub?: boolean): Promise<CtrlMessage>;
    /** Покинуть топик с задержкой */
    leaveDelayed(unsub: boolean, delay: number): void;
    /** Запросить метаданные топика */
    getMeta(params: GetQuery): Promise<MetaMessage>;
    /** Запросить страницу сообщений */
    getMessagesPage(limit: number, gaps: SeqRange[], min: number, max: number, newer: boolean): Promise<CtrlMessage>;
    /** Запросить закрепленные сообщения */
    getPinnedMessages(): Promise<CtrlMessage>;
    /** Обновить метаданные топика */
    setMeta(params: SetParams): Promise<CtrlMessage>;
    /** Обновить режим доступа */
    updateMode(uid: string | null, update: string): Promise<CtrlMessage>;
    /** Пригласить пользователя */
    invite(uid: string, mode?: string): Promise<CtrlMessage>;
    /** Архивировать или разархивировать топик */
    archive(arch: boolean): Promise<boolean>;
    /** Закрепить или открепить сообщение */
    pinMessage(seq: number, pin: boolean): Promise<CtrlMessage | void>;
    /** Удалить сообщения */
    delMessages(ranges: SeqRange[], hard?: boolean): Promise<CtrlMessage>;
    /** Удалить все сообщения */
    delMessagesAll(hardDel: boolean): Promise<CtrlMessage | void>;
    /** Удалить сообщения по списку ID */
    delMessagesList(list: number[], hardDel?: boolean): Promise<CtrlMessage>;
    /** Удалить оригинальное сообщение и отредактированные варианты */
    delMessagesEdits(seq: number, hardDel?: boolean): Promise<CtrlMessage>;
    /** Удалить топик */
    delTopic(hard: boolean): Promise<CtrlMessage | null>;
    /** Удалить подписку */
    delSubscription(user: string): Promise<CtrlMessage>;
    /** Отправить уведомление о прочтении/получении */
    note(what: 'recv' | 'read', seq: number): void;
    /** Отправить уведомление о получении */
    noteRecv(seq: number): void;
    /** Отправить уведомление о прочтении */
    noteRead(seq?: number): void;
    /** Отправить уведомление о нажатии клавиш */
    noteKeyPress(): void;
    /** Отправить уведомление о записи */
    noteRecording(audioOnly: boolean): void;
    /** Отправить уведомление о видеовызове */
    videoCall(evt: string, seq: number, payload: string): Promise<CtrlMessage | void>;
    /** Получить описание пользователя */
    userDesc(uid: string): any;
    /** Получить описание p2p пира */
    p2pPeerDesc(): any;
    /** Перебрать подписчиков */
    subscribers(callback?: (sub: Subscription, uid: string, users: Record<string, Subscription>) => void, context?: any): void;
    /** Получить копию кэшированных тегов */
    tags(): string[];
    /** Получить вспомогательную запись по ключу */
    aux(key: string): any;
    /** Получить значение алиаса */
    alias(): string | undefined;
    /** Получить кэшированную подписку для данного ID пользователя */
    subscriber(uid: string): Subscription | undefined;
    /** Перебрать версии сообщения */
    messageVersions(origSeq: number, callback: (msg: DataMessage) => void, context?: any): void;
    /** Перебрать кэшированные сообщения */
    messages(callback?: (msg: DataMessage, prev?: DataMessage, next?: DataMessage, idx?: number) => void, sinceId?: number, beforeId?: number, context?: any): void;
    /** Найти сообщение по seq */
    findMessage(seq: number): DataMessage | undefined;
    /** Получить самое последнее не удаленное сообщение из кэша */
    latestMessage(): DataMessage | undefined;
    /** Получить последнюю версию сообщения */
    latestMsgVersion(seq: number): DataMessage | null;
    /** Получить максимальный кэшированный seq ID */
    maxMsgSeq(): number;
    /** Получить минимальный кэшированный seq ID */
    minMsgSeq(): number;
    /** Получить максимальный ID удаления */
    maxClearId(): number;
    /** Получить количество сообщений в кэше */
    messageCount(): number;
    /** Перебрать кэшированные неотправленные сообщения */
    queuedMessages(callback: (msg: DataMessage) => void, context?: any): void;
    /** Получить количество подписчиков, которые отметили сообщение как прочитанное/полученное */
    msgReceiptCount(what: 'recv' | 'read', seq: number): number;
    /** Получить количество подписчиков, которые отметили сообщение как прочитанное */
    msgReadCount(seq: number): number;
    /** Получить количество подписчиков, которые отметили сообщение как полученное */
    msgRecvCount(seq: number): number;
    /** Проверить, есть ли еще сообщения на сервере */
    msgHasMoreMessages(min: number, max: number, newer: boolean): SeqRange[];
    /** Проверить, является ли данный seq ID ID самого последнего сообщения */
    isNewMessage(seqId: number): boolean;
    /** Удалить одно сообщение из локального кэша */
    flushMessage(seqId: number): DataMessage | undefined;
    /** Удалить диапазон сообщений из локального кэша */
    flushMessageRange(fromId: number, untilId: number): DataMessage[];
    /** Обновить seqId сообщения */
    swapMessageId(pub: any, newSeqId: number): void;
    /** Попытаться остановить отправку сообщения */
    cancelSend(seqId: number): boolean;
    /** Получить тип топика */
    getType(): 'me' | 'fnd' | 'sys' | 'grp' | 'p2p' | undefined;
    /** Получить режим доступа текущего пользователя или контакта */
    getAccessMode(name?: string): AccessMode | null;
    /** Установить режим доступа текущего пользователя */
    setAccessMode(acs: AccessMode | any): AccessMode;
    /** Получить режим доступа по умолчанию топика */
    getDefaultAccess(): DefAcs | undefined;
    /** Инициализировать новый построитель запросов метаданных */
    startMetaQuery(): MetaGetBuilder;
    /** Проверить, архивирован ли топик */
    isArchived(): boolean;
    /** Проверить, является ли топик 'me' */
    isMeType(): boolean;
    /** Проверить, является ли топик 'slf' */
    isSelfType(): boolean;
    /** Проверить, является ли топик каналом */
    isChannelType(): boolean;
    /** Проверить, является ли топик групповым */
    isGroupType(): boolean;
    /** Проверить, является ли топик p2p */
    isP2PType(): boolean;
    /** Проверить, является ли топик коммуникационным */
    isCommType(): boolean;
    /** Получить статус сообщения */
    msgStatus(msg: DataMessage, upd?: boolean): number;

    /** Callback для получения данных */
    onData?: (data?: DataMessage) => void;
    /** Callback для получения метаданных */
    onMeta?: (meta: MetaMessage) => void;
    /** Callback для получения присутствия */
    onPres?: (pres: PresMessage) => void;
    /** Callback для получения информации */
    onInfo?: (info: InfoMessage) => void;
    /** Callback для получения обновления описания */
    onMetaDesc?: (desc: Topic) => void;
    /** Callback для получения обновления подписки */
    onMetaSub?: (sub: Subscription) => void;
    /** Callback для получения обновления всех подписок */
    onSubsUpdated?: (keys: string[], count?: number) => void;
    /** Callback для получения обновления тегов */
    onTagsUpdated?: (tags: string[]) => void;
    /** Callback для получения обновления учетных данных */
    onCredsUpdated?: (creds: Credential[]) => void;
    /** Callback для получения обновления вспомогательных данных */
    onAuxUpdated?: (aux: Record<string, any>) => void;
    /** Callback для удаления топика */
    onDeleteTopic?: () => void;
    /** Callback для получения всех сообщений */
    onAllMessagesReceived?: (count: number) => void;
}

/**
 * Callbacks для топика
 */
export interface TopicCallbacks {
    onData?: (data?: DataMessage) => void;
    onMeta?: (meta: MetaMessage) => void;
    onPres?: (pres: PresMessage) => void;
    onInfo?: (info: InfoMessage) => void;
    onMetaDesc?: (desc: Topic) => void;
    onMetaSub?: (sub: Subscription) => void;
    onSubsUpdated?: (keys: string[], count?: number) => void;
    onTagsUpdated?: (tags: string[]) => void;
    onCredsUpdated?: (creds: Credential[]) => void;
    onAuxUpdated?: (aux: Record<string, any>) => void;
    onDeleteTopic?: () => void;
    onAllMessagesReceived?: (count: number) => void;
}

/**
 * Специальный топик 'me' для управления данными текущего пользователя
 */
export declare class TopicMe extends Topic {
    constructor(callbacks?: TopicMeCallbacks);

    /** Удалить учетное данное */
    delCredential(method: string, value: string): Promise<CtrlMessage>;
    /** Перебрать кэшированные контакты */
    contacts(callback: (contact: Topic, idx: string) => void, filter?: (contact: Topic) => boolean, context?: any): void;
    /** Получить контакт из кэша */
    getContact(name: string): Topic | undefined;
    /** Получить режим доступа контакта (перегрузка метода из Topic) */
    getAccessMode(name?: string): AccessMode | null;
    /** Проверить, архивирован ли контакт (перегрузка метода из Topic) */
    isArchived(name?: string): boolean;
    /** Получить учетные данные пользователя */
    getCredentials(): Credential[];

    /** Callback для обновления контакта */
    onContactUpdate?: (what: string, cont: Topic) => void;
}

/**
 * Callbacks для топика 'me'
 */
export interface TopicMeCallbacks extends TopicCallbacks {
    onContactUpdate?: (what: string, cont: Topic) => void;
}

/**
 * Специальный топик 'fnd' для поиска контактов и групповых топиков
 */
export declare class TopicFnd extends Topic {
    constructor(callbacks?: TopicCallbacks);

    /** Проверить уникальность тега */
    checkTagUniqueness(tag: string, caller: string): Promise<boolean>;
    /** Перебрать найденные контакты */
    contacts(callback?: (contact: Subscription, idx: string, contacts: Record<string, Subscription>) => void, context?: any): void;
}

/**
 * Класс Drafty для работы с форматированным текстом
 */
export declare class Drafty {
    /** Парсить Drafty из строки */
    static parse(str: string): any;
    /** Проверить, является ли простым текстом */
    static isPlainText(dft: any): boolean;
    /** Получить MIME тип содержимого */
    static getContentType(): string;
    /** Проверить, есть ли сущности */
    static hasEntities(content: any): boolean;
    /** Перебрать сущности */
    static entities(content: any, callback: (data: any) => void): void;
    /** Прикрепить JSON */
    static attachJSON(content: any, json: Record<string, any>): any;
    /** Обновить видеовызов */
    static updateVideoCall(content: any, upd: any): any;
}

/**
 * Основной класс Tinode
 */
export declare class Tinode {
    /** Статус сообщения: не назначен */
    static readonly MESSAGE_STATUS_NONE: number;
    /** Статус сообщения: в очереди */
    static readonly MESSAGE_STATUS_QUEUED: number;
    /** Статус сообщения: отправляется */
    static readonly MESSAGE_STATUS_SENDING: number;
    /** Статус сообщения: не удалось */
    static readonly MESSAGE_STATUS_FAILED: number;
    /** Статус сообщения: фатальная ошибка */
    static readonly MESSAGE_STATUS_FATAL: number;
    /** Статус сообщения: отправлено */
    static readonly MESSAGE_STATUS_SENT: number;
    /** Статус сообщения: получено */
    static readonly MESSAGE_STATUS_RECEIVED: number;
    /** Статус сообщения: прочитано */
    static readonly MESSAGE_STATUS_READ: number;
    /** Статус сообщения: для меня */
    static readonly MESSAGE_STATUS_TO_ME: number;
    /** Символ удаления */
    static readonly DEL_CHAR: string;
    /** Максимальный размер сообщения */
    static readonly MAX_MESSAGE_SIZE: string;
    /** Максимальное количество подписчиков */
    static readonly MAX_SUBSCRIBER_COUNT: string;
    /** Минимальная длина тега */
    static readonly MIN_TAG_LENGTH: string;
    /** Максимальная длина тега */
    static readonly MAX_TAG_LENGTH: string;
    /** Максимальное количество тегов */
    static readonly MAX_TAG_COUNT: string;
    /** Максимальный размер загрузки файла */
    static readonly MAX_FILE_UPLOAD_SIZE: string;
    /** Требуемые валидаторы учетных данных */
    static readonly REQ_CRED_VALIDATORS: string;
    /** Возраст удаления сообщений */
    static readonly MSG_DELETE_AGE: string;
    /** Префикс URI для ID топика */
    static readonly URI_TOPIC_ID_PREFIX: string;
    /** Префикс тега для алиаса */
    static readonly TAG_ALIAS: string;
    /** Префикс тега для email */
    static readonly TAG_EMAIL: string;
    /** Префикс тега для телефона */
    static readonly TAG_PHONE: string;

    constructor(config: TinodeConfig, onComplete?: (err?: Error) => void);

    /** Создать учетное данное */
    static credential(meth: string | Credential, val?: string, params?: Record<string, any>, resp?: string): Credential[] | null;
    /** Определить тип топика по имени */
    static topicType(name: string): 'me' | 'fnd' | 'sys' | 'grp' | 'p2p' | undefined;
    /** Проверить, является ли имя именем топика 'me' */
    static isMeTopicName(name: string): boolean;
    /** Проверить, является ли имя именем топика 'slf' */
    static isSelfTopicName(name: string): boolean;
    /** Проверить, является ли имя именем группового топика */
    static isGroupTopicName(name: string): boolean;
    /** Проверить, является ли имя именем p2p топика */
    static isP2PTopicName(name: string): boolean;
    /** Проверить, является ли имя именем коммуникационного топика */
    static isCommTopicName(name: string): boolean;
    /** Проверить, является ли имя именем нового топика */
    static isNewGroupTopicName(name: string): boolean;
    /** Проверить, является ли имя именем канала */
    static isChannelTopicName(name: string): boolean;
    /** Получить информацию о версии библиотеки */
    static getVersion(): string;
    /** Установить сетевые провайдеры (для Node.js) */
    static setNetworkProviders(wsProvider: any, xhrProvider: any): void;
    /** Установить провайдер базы данных (для Node.js) */
    static setDatabaseProvider(idbProvider: any): void;
    /** Получить информацию о библиотеке */
    static getLibrary(): string;
    /** Проверить, представляет ли строка NULL значение */
    static isNullValue(str: string): boolean;
    /** Проверить, является ли seq ID назначенным сервером */
    static isServerAssignedSeq(seq: number): boolean;
    /** Проверить, является ли строка допустимым значением тега */
    static isValidTagValue(tag: string): boolean;
    /** Разделить полностью квалифицированный тег на префикс и значение */
    static tagSplit(tag: string): { prefix: string; value: string } | null;
    /** Установить уникальный тег пространства имен */
    static setUniqueTag(tags: string[], uniqueTag: string): string[];
    /** Удалить тег с данным префиксом */
    static clearTagPrefix(tags: string[], prefix: string): string[];
    /** Найти первый тег с данным префиксом */
    static tagByPrefix(tags: string[], prefix: string): string | undefined;

    /** Сгенерировать уникальный ID сообщения */
    getNextUniqueId(): string | undefined;
    /** Подключиться к серверу */
    connect(host_?: string): Promise<void>;
    /** Попытаться переподключиться к серверу немедленно */
    reconnect(force?: boolean): void;
    /** Отключиться от сервера */
    disconnect(): void;
    /** Очистить постоянный кэш */
    clearStorage(): Promise<void>;
    /** Инициализировать постоянный кэш */
    initStorage(): Promise<void>;
    /** Отправить сетевой зонд */
    networkProbe(): void;
    /** Проверить наличие живого соединения */
    isConnected(): boolean;
    /** Проверить, аутентифицировано ли соединение */
    isAuthenticated(): boolean;
    /** Добавить API ключ и токен аутентификации к относительному URL */
    authorizeURL(url: string): string;
    /** Создать или обновить аккаунт */
    account(uid: string, scheme: string, secret: string, login: boolean, params?: AccountParams): Promise<CtrlMessage>;
    /** Создать нового пользователя */
    createAccount(scheme: string, secret: string, login: boolean, params?: AccountParams): Promise<CtrlMessage>;
    /** Создать пользователя с базовой аутентификацией */
    createAccountBasic(username: string, password: string, params?: AccountParams): Promise<CtrlMessage>;
    /** Обновить учетные данные пользователя для базовой аутентификации */
    updateAccountBasic(uid: string, username: string, password: string, params?: AccountParams): Promise<CtrlMessage>;
    /** Отправить рукопожатие серверу */
    hello(): Promise<CtrlMessage>;
    /** Установить или обновить токен push-уведомлений */
    setDeviceToken(dt: string | false | null | undefined): boolean;
    /** Аутентифицировать текущую сессию */
    login(scheme: string, secret: string, cred?: Credential): Promise<CtrlMessage>;
    /** Обертка для login с базовой аутентификацией */
    loginBasic(uname: string, password: string, cred?: Credential): Promise<CtrlMessage>;
    /** Обертка для login с токеном */
    loginToken(token: string, cred?: Credential): Promise<CtrlMessage>;
    /** Отправить запрос на сброс секрета аутентификации */
    requestResetAuthSecret(scheme: string, method: string, value: string): Promise<CtrlMessage>;
    /** Получить сохраненный токен аутентификации */
    getAuthToken(): AuthToken | null;
    /** Установить токен аутентификации */
    setAuthToken(token: AuthToken): void;
    /** Отправить запрос на подписку на топик */
    subscribe(topicName: string, getParams?: GetQuery, setParams?: SetParams): Promise<CtrlMessage>;
    /** Отключиться и опционально отписаться от топика */
    leave(topic: string, unsub?: boolean): Promise<CtrlMessage>;
    /** Создать черновик сообщения без отправки */
    createMessage(topic: string, content: string | any, noEcho?: boolean): any;
    /** Опубликовать сообщение в топик */
    publish(topicName: string, content: string | any, noEcho?: boolean): Promise<CtrlMessage>;
    /** Опубликовать сообщение */
    publishMessage(pub: any, attachments?: string[]): Promise<CtrlMessage>;
    /** Уведомление вне диапазона */
    oobNotification(data: {
        what: 'msg' | 'read' | 'sub';
        topic: string;
        seq?: number;
        xfrom?: string;
        given?: string;
        want?: string;
        modeGiven?: string;
        modeWant?: string;
    }): void;
    /** Запросить метаданные топика */
    getMeta(topic: string, params: GetQuery): Promise<MetaMessage>;
    /** Обновить метаданные топика */
    setMeta(topic: string, params: SetParams): Promise<CtrlMessage>;
    /** Удалить сообщения */
    delMessages(topic: string, ranges: SeqRange[], hard?: boolean): Promise<CtrlMessage>;
    /** Удалить топик */
    delTopic(topicName: string, hard: boolean): Promise<CtrlMessage>;
    /** Удалить подписку */
    delSubscription(topicName: string, user: string): Promise<CtrlMessage>;
    /** Удалить учетное данное */
    delCredential(method: string, value: string): Promise<CtrlMessage>;
    /** Удалить аккаунт текущего пользователя */
    delCurrentUser(hard: boolean): Promise<CtrlMessage>;
    /** Уведомить сервер, что сообщение прочитано или получено */
    note(topicName: string, what: 'recv' | 'read', seq: number): void;
    /** Отправить уведомление о нажатии клавиш */
    noteKeyPress(topicName: string, type?: string): void;
    /** Отправить уведомление о видеовызове */
    videoCall(topicName: string, seq: number, evt: string, payload: string): Promise<CtrlMessage>;
    /** Получить именованный топик */
    getTopic(topicName: string): Topic | undefined;
    /** Получить именованный топик из кэша */
    cacheGetTopic(topicName: string): Topic | undefined;
    /** Удалить именованный топик из кэша */
    cacheRemTopic(topicName: string): void;
    /** Перебрать кэшированные топики */
    mapTopics(func: (topic: Topic, key: string) => void | boolean, context?: any): void;
    /** Проверить, присутствует ли именованный топик в кэше */
    isTopicCached(topicName: string): boolean;
    /** Сгенерировать уникальное имя для нового группового топика */
    newGroupTopicName(isChan?: boolean): string;
    /** Получить топик 'me' */
    getMeTopic(): TopicMe;
    /** Получить топик 'fnd' */
    getFndTopic(): TopicFnd;
    /** Создать экземпляр LargeFileHelper */
    getLargeFileHelper(): any;
    /** Получить UID текущего аутентифицированного пользователя */
    getCurrentUserID(): string | null;
    /** Проверить, равен ли данный ID пользователя UID текущего пользователя */
    isMe(uid: string): boolean;
    /** Получить логин, использованный для последней успешной аутентификации */
    getCurrentLogin(): string | null;
    /** Получить информацию о сервере */
    getServerInfo(): ServerParams | null;
    /** Сообщить о топике за злоупотребление */
    report(action: string, target: string): Promise<CtrlMessage>;
    /** Получить значение конфигурации, предоставленное сервером */
    getServerParam(name: string, defaultValue?: any): any;
    /** Включить/выключить логирование в консоль */
    enableLogging(enabled: boolean, trimLongStrings?: boolean): void;
    /** Установить язык UI для отправки на сервер */
    setHumanLanguage(hl: string): void;
    /** Проверить, онлайн ли данный топик */
    isTopicOnline(name: string): boolean;
    /** Получить режим доступа для данного контакта */
    getTopicAccessMode(name: string): AccessMode | null;
    /** Включить ID сообщений во все последующие сообщения */
    wantAkn(status: boolean): void;

    /** Callback при открытии WebSocket */
    onWebsocketOpen?: () => void;
    /** Callback при установке соединения */
    onConnect?: () => void;
    /** Callback при потере соединения */
    onDisconnect?: (err?: Error) => void;
    /** Callback при завершении входа */
    onLogin?: (code: number, text: string) => void;
    /** Callback для получения контрольных сообщений */
    onCtrlMessage?: (ctrl: CtrlMessage) => void;
    /** Callback для получения сообщений с данными */
    onDataMessage?: (data: DataMessage) => void;
    /** Callback для получения сообщений присутствия */
    onPresMessage?: (pres: PresMessage) => void;
    /** Callback для получения всех сообщений */
    onMessage?: (pkt: any) => void;
    /** Callback для получения всех сообщений как неразобранного текста */
    onRawMessage?: (data: string) => void;
    /** Callback для получения ответов на сетевые зонды */
    onNetworkProbe?: () => void;
    /** Callback для уведомления об итерации экспоненциального отката */
    onAutoreconnectIteration?: (timeout: number, promise?: Promise<any>) => void;
}

// ============================================================================
// Экспорты модуля
// ============================================================================

// Объявление модуля для правильного импорта
declare module 'tinode-sdk' {
    // Экспорт по умолчанию - класс Tinode
    export default Tinode;

    // Именованные экспорты
    export {
        AccessMode,
        MetaGetBuilder,
        Topic,
        TopicMe,
        TopicFnd,
        Drafty
    };

    // Экспорт всех типов и интерфейсов
    export type {
        TinodeConfig,
        ServerParams,
        AuthToken,
        AccountParams,
        DefAcs,
        Credential,
        GetQuery,
        GetOptsType,
        GetDataType,
        GetDelType,
        SeqRange,
        SetParams,
        SetDesc,
        SetSub,
        CtrlMessage,
        DataMessage,
        MessageHead,
        PresMessage,
        InfoMessage,
        MetaMessage,
        TopicDesc,
        Subscription,
        TopicCallbacks,
        TopicMeCallbacks
    };
}

// Глобальный namespace для использования без импорта (опционально)
declare global {
    namespace Tinode {
        export type {
            TinodeConfig,
            ServerParams,
            AuthToken,
            AccountParams,
            DefAcs,
            Credential,
            GetQuery,
            GetOptsType,
            GetDataType,
            GetDelType,
            SeqRange,
            SetParams,
            SetDesc,
            SetSub,
            CtrlMessage,
            DataMessage,
            MessageHead,
            PresMessage,
            InfoMessage,
            MetaMessage,
            TopicDesc,
            Subscription,
            TopicCallbacks,
            TopicMeCallbacks
        };
    }
}

