# Пожалуйста, прочтите!
 **Я попытаюсь ответить тут на все вопросы:**


>Что это?

Тестовое задание для AvitoTech на Front End
>Где сервер, Лебовски?

Как я вчитывался в задание, я не заметил его необходимости. Для понимания моих скиллов в бек енде можно посмотреть мои другие проекты.

>Что использовалось?

Я использовал HTML5, CSS3, JavaScript (ES6 (и даже async/await))
>Почему без фреймворков?

Слышал что в Avito любят Angular, а я общаюсь с реактом (пока без редукса), чтобы показать, что я знаю 
азы, что я могу и без фреймворков, я писал без них.
Этим я надеялся показать, что на мою обучаемость можно расчитывать. 
>Что с дизайном

Боюсь все очень плохо. Я честно не дизайнер, и принимать многие решения мне было просто тяжело. Надеюсь что хоть какие-то решения удачны
>Почему это решение хорошее?

* Dark Mode, 
* отзывчивый UI, 
* попытки удовлетворить браузеры, 
* устройства и т.п.
* В какой-то момент меню меняется на бургер,
* флексбоксовские айтемы сжимаются, но не сжимают фотки
* при скролинге подкачиваются посты
* метро меняются при выборе города
>Как работает? 

+ Поисковик :
нужно ввести данные и нажать кнопочку

+ Данные : небольшая мат модель на Local Storage

+ Посты : собираю айтемы для флексбокса в JS коде

+ Данные : fetch из дампа Avito который был предложен в задание

+ Лайки: в постах есть поле isLiked, если оно истино, то загорается сердечко красным, а данные записываются в механизм локал сторейджа

> Почему не AJAX, или xmlHttpRequest?

* AJAX : это jQuery,я стараюсь не тянуть его в свой код. Чаще всего jQuery занимает на 70% больше места, чем те функции, которые я из него буду использовать.
А еще очень много криков о том, что это не безопасно и легаси.
Я не хочу это доказывать, но этих людей я долго знаю, и доверяю им.

* xmlHttp : я долго думал об этом, т.к. асинхронность, все дела. Но там в теле, насколько я знаю
`JSON.parse()`, а чем меньше его в коде, тем быстрее он работает.

>Тут есть недостатки?

Конечно! 
1. Десигн
2. Код (некоторые вещи в ходе разработки изменялись, даже в последние часы приходилось выпиливать руками фичи, есть подозрения на наличие бесполезного кода, который можно сказать стал "легаси", но имея другие проблемы, я решил пока что не трогать)
3. Аксесабилити (вообще не занялся вопросом доступности для людей с отклонениями.  Не сильно то и знаю как это делать.)
4. Не вывожу людям "ничего не найдено", а вместо этого кидаю пустую страницу.
5. ~~На ширине где-то 250 пикселей едет флексбокс. Я не уверен, что такие телефоны еще юзаются. Не так сложно в целом это обработать~~(кажется это такие шукти у Хрома, сегодня он говорит что там все ок, но я все равно внес изменения для этих ребят, чтобы им было по-комофортнее, если они существуют.)
6. Поиск по имени. Забил т.к. Времени мало, а дамп однообразен
7. ~~Не все типы постов изучил и обработал. Надеюсь простите, там вряд ли много чего меняется~~. 

Я скорее всего это все исправлю, пока показываю что сделал за неделю, и хочу немножко отдохнуть от пет проджекта.
>Буду исправлять? 

Стоит! Все же на резюме очень хорошая работа.

> Почему есть несерьезные и посредственные шутки в работе? 

Мне нужно было чем-то себя мотивировать, когда что-то казалось тяжелым, или невозможным. Без денег на кону вообще не очень легко себя мотивировать на разработку по ТЗ.
Вообще люблю юморить, ведь это снимает стресс, а стресс это самый настоящий яд, который убивает и организм и психику.
> Остались вопросы !

задайте их на `yukimurachris@gmail.com`
